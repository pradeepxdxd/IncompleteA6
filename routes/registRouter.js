const mod = require('../packages');
const router = mod.express.Router();
const {check} = mod.express_validator;
const {registPage, insertData} = require('../controllers/registController');

// defining all the routes of register page with all the validations
router.get('/', registPage);
router.post('/regdata',
    check('name', 'Username must be more than 3 character')
        .exists()
        .isAlpha()
        .not()
        .isEmpty()
        .isLength({min : 3}),
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
        }),
    check('phone', 'Invalid Phone Number')
        .exists()
        .isMobilePhone(),
insertData);

module.exports = router;