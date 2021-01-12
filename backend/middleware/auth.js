const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // on extrait le token du header http et on vérifie qu'il 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        if (!userId) {
            throw 'Token non valide';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: error || 'Erreur d\'authentification'
        });
    }
};