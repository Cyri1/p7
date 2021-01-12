const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const authAdmin = require('../middleware/authAdmin');
const authMe = require('../middleware/authMe');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//router.get('/', auth, postCtrl.findAllPosts);
//router.get('/:id/likes', auth, postCtrl.findAllLikes); // a intégrer dans le résultat de findAllPosts ?
//router.post('/', auth, multer, postCtrl.createPost);
// router.put('/:id', authMe, multer, postCtrl.updatePost);
// router.delete('/:id', authMe, postCtrl.deletePost);

module.exports = router;