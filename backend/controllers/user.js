const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

//réception d'une demande de création de compte (post)
exports.signup = (req, res, next) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    if (!firstname || !lastname || !email || !password || !username) {
        return res.status(400).json({
            error: 'Veuillez remplir tous les champs.'
        });
    }

    const buff = Buffer.from(email, 'utf-8');
    const base64 = buff.toString('base64'); //masquage email

    models.User.findOne({
            attributes: ['email'],
            where: {
                email: base64
            }
        })
        .then((exist) => {
            if (!exist) {
                //hash du password avec bcrypt
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {

                        models.User.create({
                                firstname: firstname,
                                lastname: lastname,
                                username: username,
                                email: base64,
                                password: hash
                            })
                            .then(() => res.status(201).json({
                                message: 'Utilisateur créé !'
                            }))
                            .catch(error => res.status(400).json({
                                error
                            }));
                    })
            } else {
                return res.status(409).json({
                    error: 'L\'utilisateur existe déjà !'
                })
            }
        })
        .catch(error => res.status(500).json({
            error: 'pb vérification si l utilisateur existe'
        }));
};


//reception d'une demande de login (post)
exports.login = (req, res, next) => {
    //encodage en base64 de l'email

    const email = req.body.email;
    const password = req.body.password;
    const buff = Buffer.from(email, 'utf-8');
    const base64 = buff.toString('base64'); //masquage email


    models.User.findOne({
            where: {
                email: base64
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Identifiants incorrects!' //email invalide
                })
            }
            // vérification si le mot de passe hashé entré correspond au mot de passe hashé dans la bdd
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Identifiants incorrects!' //password invalide
                        })
                    }
                    res.status(200).json({
                        //si oui création d'un token avec json web token et la clé secrete
                        userId: user.userId,
                        isAdmin: user.isAdmin,
                        username: user.username,
                        token: jwt.sign({
                                userId: user.userId,
                                isAdmin: user.isAdmin
                            },
                            'RANDOM_TOKEN_SECRET', {
                                expiresIn: '48h'
                            }
                        )
                    });
                })
                .catch(error => res.status(500).json({
                    error: 'pb d\'identification'
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.findOneUser = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const paramId = Number(req.params.userId)
    var isMe = userId === paramId ? true : false; // pour afficher des boutons d'édition sur le frontend pour mon profile

    models.User.findOne({
        attributes: ['firstname', 'lastname', 'username', 'email', 'imageUrl', 'bio'],
        where: {
            userId: req.params.userId
        }
    }).then((user) => {
        if (user) {
            const buff = Buffer.from(user.email, 'base64');
            const email = buff.toString('utf-8');

            res.status(200).json({
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: email,
                bio: user.bio,
                imageUrl: user.imageUrl,
                isMe: isMe
            });
        } else {
            res.status(404).json({
                error: 'Utilisateur introuvable'
            });
        }
    }).catch(() => res.status(500).json({
        error: 'erreur lors de la recherche de cet utilisateur'
    }));
}

exports.findAllUsers = (req, res, next) => {
    models.User.findAll()
        .then((users) => {
            res.status(200).json(
                users
            );
        })
        .catch(error => res.status(400).json({
            error
        }));
};


exports.updateUser = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    //si req.file existe on modifie l'url image
    const userObject = req.file ? {
        ...req.body.user,
        imageUrl: req.file.filename
    } : {
        //si pas de req.file
        ...req.body
    };

    if (req.params.userId == userId || isAdmin) {
    models.User.update({
            ...userObject,
            userId: req.params.userId
        }, {
            where: {
                userId: req.params.userId
            }
        })
        .then(() => res.status(200).json({
            message: 'Utilisateur modifié avec succès'
        }))
        .catch(error => res.status(400).json({
            error
        }));        
    }
    else {
        res.status(403).json({
            error: 'Privilèges insuffisants'
        });
    }
};