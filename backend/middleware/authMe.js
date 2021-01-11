module.exports = (req, res, next) => {
    try {
        // on extrait le token du header http et on vérifie qu'il 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const isAdmin = decodedToken.isAdmin;
        const userId = decodedToken.userId;
        const paramId = Number(req.params.id)

        if (paramId !== userId && !isAdmin) { //si l'id dans les parametres ne correspond pas a mon userId et que je ne suis pas un admin
            throw 'Privilège insuffisants !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: error || 'Erreur d\'authentification'
        });
    }
};