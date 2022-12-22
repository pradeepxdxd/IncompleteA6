const mod = require('../packages');
const {check} = require('express-validator');
const router = mod.express.Router();
const {loginPage, login, forgetPass, forgetPassAction} = require('../controllers/loginController');

// defining all the routes of login page with all the validations
router.get('/', loginPage);

router.post('/logdata', 
    check('email', 'Invalid Email')
        .exists()
        .isEmail(),
    check('pass', 'Invalid Password')
        .exists()
        .isStrongPassword({
            minLength : 8,
            minUppercase : 1,
            minSymbols : 1,
            minNumbers : 1,
            minLowercase : 4
        }),
login);

router.get('/forgetpass', forgetPass);
router.post('/forget-email', forgetPassAction);

module.exports = router;