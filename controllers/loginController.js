const userModel = require('../model/registSchema');
const mod = require('../packages');
const rn = mod.rn;
const nodemailer = mod.nodemailer;
const { validationResult } = mod.express_validator;
const bcrypt = mod.bcrypt;

const loginPage = (req, res) => {
    res.render('login', { style: 'login.css', title: 'Login', nav: 'nav.css' });
}

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const alert = errors.array();
        res.render('login', { style: 'login.css', title: 'Login', nav: 'nav.css', alert })
    }
    let { email, pass } = req.body;
    await userModel.findOne({ email: email })
        .then(data => {
            if (bcrypt.compareSync(pass, data.pass)) {
                session = req.session;
                session.email = email;
                res.redirect('/menu/list');
            }
            else {
                res.render('login', { style: 'login.css', title: 'Login', nav: 'nav.css', flag: true })
            }
        }).catch(err => {
            res.render('login', { style: 'login.css', title: 'Login', nav: 'nav.css', flag: true })
        })
}

const forgetPass = async (req, res) => {
    res.render('forgetPass', { title: 'Forget Password', nav: 'nav.css', style: 'forgetpass.css' });
}

var otp;
const forgetPassAction = async (req, res) => {
    const email = req.body.email;
    await userModel.findOne({email : email})
        .then(data => {
            const random = rn({
                min: 1000,
                max: 9999,
                integer: true
            });
            otp = random;
            let mailOption = {
                from : process.env.EMAIL,
                to : email,
                subject : 'Reset your password',
                template : 'forget',
                context : {
                    name : data.name
                }
            }
        })
}

module.exports = { loginPage, login, forgetPass, forgetPassAction }