const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.put('/:commentId', auth, commentCtrl.updateComment);
router.delete('/:commentId', auth, commentCtrl.deleteComment);

module.exports = router;