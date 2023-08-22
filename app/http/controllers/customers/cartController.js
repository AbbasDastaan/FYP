function cartController(){
    return{
        index(req,res){
            res.render('customers/cart')          
          
        },
        update(req,res){
            // let cart={
            //     items:{
            //         foodiesId:{item:foodiesObject,qty:0},

            //     },
            //     totalQty:0,
            //     totalPrice:0
            // }
            

     // for the first time creating cart and adding basic object structure
     if (!req.session.cart) {
        req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0
        }
    }
    let cart = req.session.cart

    // Check if item does not exist in cart 
    if(!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
            item: req.body,
            qty: 1
        }
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
    } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice =  cart.totalPrice + req.body.price
    }
    return res.json({ totalQty: req.session.cart.totalQty })

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let value = 0;
    
    function incrementValue() {
        if (value < 10) {
            value++;
            console.log(`Value incremented: ${value}`);
        }
    }
    
    function decrementValue() {
        if (value > 1) {
            value--;
            console.log(`Value decremented: ${value}`);
        }
    }
    
    rl.on('line', (input) => {
        const command = input.trim().toLowerCase();
        if (command === 'increment') {
            incrementValue();
        } else if (command === 'decrement') {
            decrementValue();
        } else if (command === 'exit') {
            rl.close();
        } else {
            console.log('Invalid command. Use "increment", "decrement", or "exit".');
        }
    });
    

    
        }
    }
}

module.exports=cartController