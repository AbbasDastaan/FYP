const homeController = require('../app/http/controllers/homeControllers')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')

const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')
//middle wares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app){
    app.get('/', homeController().index)
    app.get('/login',guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart',cartController().index)
    app.post('/update-cart',cartController().update)

    // Customer routes
    app.post('/orders',auth,  orderController().store)
    app.get('/customer/orders',auth, orderController().index)
    app.get('/customer/orders/:id',auth, orderController().show)

    //admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)

    app.get('/', (req, res) => {
        res.render('cart');
      });
      
      app.post('/delete/:id', (req, res) => {
        const idToDelete = parseInt(req.params.id);
        food.item = food.item.filter(fooditem => food.item._id !== idToDelete);
        res.redirect('/');
      });
      



}

module.exports=initRoutes