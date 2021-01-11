const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const authAdmin = require('../middleware/authAdmin');
const authMe = require('../middleware/authMe');
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.findOneUser);

// router.get('/', auth, userCtrl.findAllUsers);
// router.get('/:id/posts', auth, userCtrl.findAllPosts);
// router.put('/:id', authMe, multer, userCtrl.updateUser);
// router.delete('/:id', authAdmin, userCtrl.deleteUser);

module.exports = router;