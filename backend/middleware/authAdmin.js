const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // on extrait le token du header http et on vérifie qu'il 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const isAdmin = decodedToken.isAdmin;

        //authentification pour les routes admins (par exemple : supprimer un utilisateur)
        if (!isAdmin) {
            throw 'Privilège insuffisants !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: error
        });
    }
};