const mod = require('../packages');
const bcrypt = mod.bcrypt;
const userModel = require('../model/registSchema');
const {validationResult} = mod.express_validator;
const saltRounds = 10;

const updateProfile = async (req, res) => {
    const id = req.params.id;
    const data = await userModel.findOne({ _id: id });
    res.render('updateProfile', { data: data, nav: 'menunav.css' });
}

const mainProfile = async (req, res) => {
    const email = req.session.email;
    const data = await userModel.findOne({ email: email });
    res.render('profile', { title: 'Profile', nav: 'menunav.css', style: 'profile.css', data: data });
}

const updateData = async (req, res) => {
    const id = req.body.id;
    const { name, email, phone, location, address } = req.body;
    await userModel.updateOne({ _id: id }, {
        $set: {
            name: name,
            email: email,
            phone: phone,
            location: location,
            address: address
        }
    });
    const data = await userModel.findOne({ _id: id });
    res.render('profile', { title: 'Profile', nav: 'menunav.css', style: 'profile.css', data: data });
}

const resetPass = (req, res) => {
    res.render('resetPassPage', { title: 'Profile', nav: 'menunav.css' });
}

const changePass = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const alert = errors.array();
        console.log(alert);
        res.render('resetPassPage', { title: 'Profile', nav: 'menunav.css', alert });
    }
    else {
        const pass = req.body.pass;
        const hash = bcrypt.hashSync(pass, saltRounds);
        const email = req.session.email;
        await userModel.updateOne({ email: email }, { $set: { pass: hash } })
            .then(data => {
                res.render('resetPassPage', { succ: true, title: 'Profile', nav: 'menunav.css' });
            }).catch(err => {
                console.log(err);
            })
    }
}

module.exports = { mainProfile, updateProfile, updateData, resetPass, changePass }