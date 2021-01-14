const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const authAdmin = require('../middleware/authAdmin');
const authMe = require('../middleware/authMe');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.findAllPosts);
router.put('/:id', auth, multer, postCtrl.updatePost);
// router.delete('/:id', authMe, postCtrl.deletePost);

router.post('/:id/comments', auth, postCtrl.createComment);
router.post('/:id/likes', auth, postCtrl.createLike); //create and delete likes

module.exports = router;