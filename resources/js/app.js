import axios from "axios"
import Noty from 'noty'
let addToCart=document.querySelectorAll('.add-to-cart')
let cartCounter= document.querySelector('#cartCounter')

function updateCart(foodies){
    axios.post('/update-cart',foodies).then(res =>{
        console.log(res)
        cartCounter.innerText= res.data.totalQty
        new Noty({
            type:'success',
            timeout:1000,
            text:'product added to cart',
            progressBar:false
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            text: 'Something went wrong',
            timeout: 1000,
            progressBar: false,
        }).show();
    })
}

addToCart.forEach((btn) =>{
    btn.addEventListener('click',(e)=>{
        let foodies=JSON.parse(btn.dataset.foodies)
        updateCart(foodies)
    })
})