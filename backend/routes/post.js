const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.findAllPosts);
router.put('/:postId', auth, multer, postCtrl.updatePost);
router.delete('/:postId', auth, postCtrl.deletePost);
router.post('/:postId/comments', auth, postCtrl.createComment);
router.post('/:postId/likes', auth, postCtrl.createLike); //create and delete likes

module.exports = router;