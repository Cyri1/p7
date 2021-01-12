const jwt = require('jsonwebtoken');
const models = require('../models')
const Post = models.posts;

exports.createPost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    const userId = decodedToken.userId;
    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null;

    const post = new Post({ //modèle
        userId: userId,
        postTitle: title,
        postContent: content,
        postImageUrl: imageUrl
    });

    post.save()
        .then(() => res.status(201).json({
            message: 'Post créé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

exports.findAllPosts = (req, res, next) => {
    Post.findAll()
        .then((posts) => {
            res.status(200).json({
                posts
            });
        })
        .catch(error => res.status(400).json({
            error
        }));
};