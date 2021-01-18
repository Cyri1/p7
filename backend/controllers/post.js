const jwt = require('jsonwebtoken');
const {
    Op
} = require('sequelize');
const models = require('../models');

exports.createPost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    const userId = decodedToken.userId;
    const title = req.body.postTitle;
    const content = req.body.postContent;
    const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null;

    models.Post.create({
            userId: userId,
            postTitle: title,
            postContent: content,
            postImageUrl: imageUrl
        })
        .then(() => res.status(201).json({
            message: 'Post créé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

exports.findAllPosts = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    const me = [{
        userId: userId,
        isAdmin: isAdmin
    }] // pour pouvoir afficher un bouton d'édition de post uniqement sur les posts appartenant au user connecté et aux admins

    models.Post.findAll({
            include: [{
                    model: models.User,
                    attributes: ['username', 'imageUrl'],
                },
                {
                    model: models.Like,
                    attributes: ['createdAt', 'updatedAt'],
                    include: [{
                        model: models.User,
                        attributes: ['username', 'imageUrl'],
                    }]
                },
                {
                    model: models.Comment,
                    attributes: ['commentContent', 'createdAt', 'updatedAt'],
                    include: [{
                        model: models.User,
                        attributes: ['username', 'imageUrl'],
                    }]
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: ['postId', 'postTitle', 'postContent', 'postImageUrl', 'createdAt', 'updatedAt']
        })
        .then((posts) => {
            res.status(200).json({
                posts,
                me
            });
        })
        .catch(error => res.status(400).json({
            error
        }));
};

exports.updatePost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    models.Post.findOne({
        attributes: ['userId'],
        where: {
            postId: req.params.postId
        }
    }).then((post) => {
        if (post.userId == userId || isAdmin) { // vérifie si le post devant être modifié appartient à la personne connecté ou si c'est un admin
            //si req.file existe on modifie l'url image
            const postObject = req.file ? {
                ...req.body.post,
                postImageUrl: req.file.filename
            } : {
                //si pas de req.file
                ...req.body
            };
            models.Post.update({
                    ...postObject,
                    postId: req.params.postId
                }, {
                    where: {
                        postId: req.params.postId
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Post modifié avec succès'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        } else {
            res.status(403).json({
                error: 'Privilèges insufisants pour modifier ce post'
            });
        }
    }).catch(() => res.status(500).json({
        error: 'erreur lors de la recherche de ce post'
    }));

};

exports.createComment = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    const userId = decodedToken.userId;
    const postId = req.params.postId;
    const commentContent = req.body.commentContent;

    models.Comment.create({
            userId: userId,
            postId: postId,
            commentContent: commentContent
        })
        .then(() => res.status(201).json({
            message: 'Commentaire créé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

exports.createLike = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    const userId = decodedToken.userId;
    const postId = req.params.postId;

    models.Like.findOne({
        where: {
            [Op.and]: [{
                    userId: userId
                },
                {
                    postId: postId
                }
            ]
        },
        attributes: ['likeId', 'userId', 'postId', 'createdAt', 'updatedAt']
    }).then((exist) => { //toggle like / suppression du like
        if (!exist) {
            models.Like.create({
                    userId: userId,
                    postId: postId
                })
                .then(() => res.status(201).json({
                    message: 'Post liké'
                }))
                .catch(error => res.status(400).json({
                    error
                }));

        } else {
            exist.destroy()
                .then(() => res.status(201).json({
                    message: 'like supprimé'
                }))
                .catch(error => res.status(400).json({
                    error
                }));

        }
    }).catch(() => res.status(500).json({
        error: 'erreur lors de la recherche du like'
    }));

};

exports.deletePost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    models.Post.findOne({
        where: {
            postId: req.params.postId
        }
    }).then((post) => {
        if (post.userId == userId || isAdmin) { // vérifie si le post devant être supprimé appartient à la personne connecté ou si c'est un admin
            models.Comment.destroy({
                    where: {
                        postId: post.postId
                    }
                }).then(() =>
                    models.Like.destroy({
                        where: {
                            postId: post.postId
                        }
                    })
                    .then(() =>
                        models.Post.destroy({
                            where: {
                                postId: post.postId
                            }
                        })
                        .then(() => res.status(200).json({
                            message: 'Post supprimé avec succès'
                        }))
                    )
                )
                .catch(error => res.status(400).json({
                    error
                }));
        } else {
            res.status(403).json({
                error: 'Privilèges insufisants pour supprimer ce post'
            });
        }
    }).catch(() => res.status(500).json({
        error: 'erreur lors de la recherche de ce post'
    }));

};