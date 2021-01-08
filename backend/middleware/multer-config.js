const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  //enregistrement dans le dossier image
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //création d'un nom de fichier unique avec un timestamp et remplacement des espaces par _
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    const newName = name.replace('.' + extension, '_');
    callback(null, newName + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');