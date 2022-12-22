const mod = require("../packages");
const router = mod.express.Router();
const {homePage} = require('../controllers/mainController');

router.get('/', homePage);

module.exports = router;