const homePage = (req, res) => {
    res.render('home', {nav : 'nav.css', style : 'home.css', title : 'Pizza App'});
}

module.exports = {homePage};