const mod = require('../packages');
const router = mod.express.Router();
const {check} = mod.express_validator;
const {mainProfile, updateProfile, updateData, resetPass, changePass} = require('../controllers/profileController');

// Routes for profile
router.get('/', mainProfile);
router.get('/editProfile/:id', updateProfile);
router.post('/update-data', updateData);
router.get('/resetpasspage', resetPass);

// password validation
router.post('/resetpass-action',
check('pass', "Invalid Password can't reset")
        .exists()
        .isStrongPassword({
            minLength : 8,
            minUppercase : 1,
            minSymbols : 1,
            minNumbers : 1,
        }),
changePass);

module.exports = router;