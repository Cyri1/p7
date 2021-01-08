const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // on extrait le token du header http et on vérifie qu'il 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        //si l'userId de la requete correspond au userId du token décodé 
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: error | 'Requête non authentifiée !'
        });
    }
};