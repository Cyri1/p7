const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const authAdmin = require('../middleware/authAdmin');
const authMe = require('../middleware/authMe');
const auth = require('../middleware/auth');

// router.post('/', auth, commentCtrl.createComment);
// router.put('/', authMe, commentCtrl.updateComment);
// router.delete('/', authMe, commentCtrl.deleteComment);

module.exports = router;