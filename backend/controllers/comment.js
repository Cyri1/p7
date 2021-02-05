const jwt = require('jsonwebtoken');
const models = require('../models');


exports.deleteComment = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    models.Comment.findOne({
        where: {
            commentId: req.params.commentId
        }
    }).then((comment) => {
        if (comment.userId == userId || isAdmin) { // vérifie si le commentaire devant être supprimé appartient à la personne connecté ou si c'est un admin
            models.Comment.destroy({
                    where: {
                        commentId: comment.commentId
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Commentaire supprimé avec succès'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        } else {
            res.status(403).json({
                error: 'Privilèges insufisants pour supprimer ce commentaire'
            });
        }
    }).catch(() => res.status(500).json({
        error: 'erreur lors de la recherche de ce commentaire'
    }));
};

exports.updateComment = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    models.Comment.findOne({
        where: {
            commentId: req.params.commentId
        }
    }).then((comment) => {
        if (comment.userId == userId || isAdmin) { // vérifie si le commentaire devant être modifié appartient à la personne connecté ou si c'est un admin

            const commentObject = {
                ...req.body
            };

            if (req.body.commentContent !== '') {
             models.Comment.update({
                    ...commentObject,
                    commentId: req.params.commentId
                }, {
                    where: {
                        commentId: req.params.commentId
                    }
                })
                .then(() => res.status(200).json({
                    message: 'Commentaire modifié avec succès'
                }))
                .catch(error => res.status(400).json({
                    error
                }));               
            }
            else {
                res.status(400).json({
                    error: 'Veuillez vérifier les champs'
                });
            }

        } else {
            res.status(403).json({
                error: 'Privilèges insufisants pour modifier ce commentaire'
            });
        }
    }).catch(() => res.status(500).json({
        error: 'erreur lors de la recherche de ce commentaire'
    }));
};