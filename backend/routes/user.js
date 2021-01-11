const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// router.get('/', auth, userCtrl.findAllUsers);
// router.get('/:id', auth, userCtrl.findOneUser);
// router.get('/:id/posts', auth, userCtrl.findAllPosts);
// router.put('/:id', auth, multer, userCtrl.updateUser);
// router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;