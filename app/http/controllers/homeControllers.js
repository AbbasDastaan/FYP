const Menu=require('../../models/menu')
function homeController() {
    return {
        async index(req, res) {
            const foodies = await Menu.find()
            // console.log(foodies)
            return res.render('home', { foodies: foodies })
        }
    }
}        
          
//         }
//     }
// }

module.exports=homeController



// function homeController(){
//     return{
//         index(req,res){
//             menu.find().then(function(df){
//                 console.log(df)
//                 return 
//                 res.render('home',{df:df})
//             })          
          
//         }
//     }
// }

// module.exports=homeController

