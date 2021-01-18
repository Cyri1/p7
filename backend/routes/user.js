const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:userId', auth, userCtrl.findOneUser);
router.get('/', auth, userCtrl.findAllUsers);
router.put('/:userId', auth, multer, userCtrl.updateUser);
router.get('/:userId/posts', auth, userCtrl.findAllPosts);
router.delete('/:userId', auth, userCtrl.deleteUser);

module.exports = router;