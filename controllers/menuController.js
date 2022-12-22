const foodModel = require('../model/foodSchema');
const userModel = require('../model/registSchema');
const transporter = require('../mail/mail');

const menuList = async (req, res) => {
    const foodItem = await foodModel.find();
    res.render('menulist', { item: foodItem, title: 'Menu List', nav: 'menunav.css', style: 'menulist.css' });
}

var cartFood = [];  // make it constant after all process done
// adding all the pizza in session 
const addCart = async (req, res) => {
    session = req.session;
    const id = req.params.id;
    cartFood.push(id);
    session.cartFood = cartFood;
    const foodItem = await foodModel.find();
    console.log(session);
    // cartFood = [];
    res.render('menulist', {item: foodItem, title: 'Menu List', nav: 'menunav.css', style: 'menulist.css', flag : true });
}

// pushing all pizza object in array which are present in cartFood[]
const cart = async (req, res) => {
    const pizzaObj = await foodModel.find();
    const data = dataOfPizza(pizzaObj, cartFood);
    res.render('cart', {data : data, nav : 'menunav.css', title : 'Shopping Cart'});
}

const dataOfPizza = (pizzaObj, cartFood) => {
    const data = [];
    pizzaObj.forEach(item => {
        cartFood.forEach(e => {
            if(item._id == e){
                data.push(item);
            }
        })
    })
    return data;
}

const deleteCart = async (req, res) => {
    const id = req.params.id;
    const pizzaObj = await foodModel.find();
    await cartFood.forEach(item => {
        if(item == id){
            cartFood.pop();
        }
    })

    const data = dataOfPizza(pizzaObj, cartFood);
    res.render('cart', {data : data, nav : 'menunav.css', title : 'Shopping Cart'});
}

const checkout = (req, res) => {
    res.render('checkoutPage', {title: 'Checkout', nav: 'menunav.css' });
}

const creditAction = async (req, res) => {
    const creditCard = req.body.creditNum;
    
    // Validtion for Credit-Card
    if(creditCard.length != 16){
        res.render('checkoutPage', {title: 'Checkout', nav: 'menunav.css', flag : true });
    }
    if(creditCard.length == 16){
        for(let i = 0; i < creditCard.length; i++){
            if(+creditCard[i] >= 0 && +creditCard[i] <= 9){}
            else {
                res.render('checkoutPage', {title: 'Checkout', nav: 'menunav.css', flag : true });
            }
        }
    }

    const id = req.session.foodID;
    const personData = await userModel.findOne({email : req.session.email});
    const foodProduct = await foodModel.findOne({_id : id});
    try{
        let mailOption = {
            from : process.env.EMAIL,
            to : req.session.email,
            subject : 'Your Pizza order from Just Pizza',
            template : 'main',
            context : {
                name : personData.name,
                location : personData.location,
                address : personData.address,
                phone : personData.phone,
                foodID : foodProduct._id,
                foodName : foodProduct.foodName,
                foodPrice : foodProduct.foodPrice,
            }
        }
        transporter.sendMail(mailOption, (err) => {
            if(err) throw err;
            else res.render('orderpage', {title : 'Order has been paid', nav : 'menunav.css'})
        })
    }
    catch(err){
        console.log(err);
    }
}

const logout = (req, res) => {
    // Destroy session data
    req.session.destroy();
    res.render('home', { nav: 'nav.css', style: 'home.css', title: 'Pizza App' });
}

module.exports = { menuList, addCart, cart, deleteCart, checkout, creditAction, logout }