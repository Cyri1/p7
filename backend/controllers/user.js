const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models')
const User = models.users;

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

    User.findOne({
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
                        //encodage en base64 de l'email

                        const user = new User({ //modèle
                            firstName: firstname,
                            lastName: lastname,
                            username: username,
                            email: base64,
                            password: hash
                        });
                        console.log(user);
                        //sauvegarde dans la bdd des infos utilisateurs et du hash password
                        user.save()
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

    User.findOne({
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
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        username: user.username,
                        token: jwt.sign({
                                userId: user.id,
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

    User.findOne({
        attributes: ['firstName', 'lastName', 'username', 'email', 'imageUrl', 'bio'],
        where: {
            id: req.params.id
        }
    }).then((user) => {
        if (user) {
            const buff = Buffer.from(user.email, 'base64');
            const email = buff.toString('utf-8');
            res.status(200).json({firstName: user.firstName, lastName: user.lastName, username: user.username, email: email, bio: user.bio, imageUrl: user.imageUrl});
        } else {
            res.status(404).json({
                error: 'Utilisateur introuvable'
            });
        }
    }).catch(() => res.status(500).json({
        error: 'erreur lors de la recherche de cet utilisateur'
    }));
}