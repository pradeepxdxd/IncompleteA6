const mod = require('../packages');
const path = mod.path;
const router = mod.express.Router();
const multer = require('../packages').multer;
const {menuList, addCart, cart, deleteCart, logout, creditAction, checkout} = require('../controllers/menuController');

// defining all the routes of Menu
router.get('/list', menuList);
router.get('/cartinsession/:id', addCart);
router.get('/cart', cart);
router.get('/delete-cart/:id', deleteCart);
router.get('/checkout', checkout);
router.post('/credit-action', creditAction);
router.get('/logout', logout);

// exporting route
module.exports = router;