const mod = require('../packages');
const nodemailer = mod.nodemailer;
const hbs = mod.hbs;

// Integration of nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

transporter.use('compile', hbs({
    viewEngine: 'nodemailer-express-handlebars',
    viewPath: 'views/emailTemplates/'
}))

module.exports = transporter;