const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/authAdmin');
const auth = require('../middleware/authAdmin');

router.post('/', auth, commentCtrl.createComment);
router.put('/', authMe, commentCtrl.updateComment);
router.delete('/', authMe, commentCtrl.deleteComment);

module.exports = router;