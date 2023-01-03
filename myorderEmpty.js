
let home_icon = document.querySelector('.home_icon')
let card_icon = document.querySelector('.card_icon')

//go to home
home_icon.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/homePge1.html'
})

//go to cart
card_icon.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/myCart.html'
})