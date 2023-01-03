let wraper_myCart = document.querySelector('.wraper_myCart')
let icon_home = document.querySelector('.icon_home')
let ordersIcon = document.querySelector('.ordersIcon')
let search_icon = document.querySelector('.search_icon')
let overlay = document.querySelector('.overlay')
let cancel_delet = document.querySelector('.cancel_delet')
let yes_delet = document.querySelector('.yes_delet')
let img_delet_modal = document.querySelector('.img_delet_modal')
let name_delet_modal = document.querySelector('.name_delet_modal')
let color_name = document.querySelector('.color_name')
let show_size = document.querySelector('.show_size')
let total_price_number = document.querySelector('.total_price_number')
let count_product_modal = document.getElementById('counter')
let post_to_checkout = document.querySelector('.addBtn_text')

let counter 
let itemId ;
let totalPrice = 0


//get data on my cart api
function creatMyCart(){
    wraper_myCart.innerHTML = ''

    fetch('http://localhost:4000/myCard')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            // itemId = item.id

           
            wraper_myCart.insertAdjacentHTML('beforeend',`
            <div class="wraper_card">
                
            <div class="wraper_left_card">
                <div class="wraper_imgCard">
                    <img src="${item.img}" alt="">
                </div>
            </div>

            <div class="wraper_right_card">

                <div class="row_one">
                    <span>${item.name}</span>
                    <i class="fa fa-trash" onclick="delet_card_item(${item.id})"></i>
                </div>

                <div class="row-tow">
                    <div class="show_color"></div>
                    <span class="color_name">${item.color}</span>
                    <span>|</span>
                    <span class="show_size">size=${item.size}</span>
                </div>

                <div class="row-three">
                    <span class="total_price_number">$ ${item.price}</span>

                    <div class="wraper_count_product">
                        <div class="count">
                            <span onclick="minusPlusCount('-')">-</span>
                            <input id="counter" value="${item.count}">
                            <span onclick="minusPlusCount('+')">+</span>
                        </div>
                </div>
            </div>                
        </div>`)
        
        })
    })
}
creatMyCart()

//delet item
function delet_card_item(id){    // click trash icon
    itemId = id
    
    overlay.classList.add('visible')
    fetch('http://localhost:4000/myCard')
    .then(res => res.json())
    .then(data => {
        data.forEach(item =>{
            
            if(item.id == itemId){
                img_delet_modal.src = item.img
                name_delet_modal.innerHTML = item.name
                color_name.innerHTML = item.color
                show_size.innerHTML = `size= ${item.size}` 
                count_product_modal.value = item.count
            }
        })
    })
}


cancel_delet.addEventListener('click',()=> {
    overlay.classList.remove('visible')
    
})

yes_delet.addEventListener('click',()=> {

    overlay.classList.remove('visible')

    fetch(`http://localhost:4000/myCard/${itemId}`,{
        method:'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        creatMyCart()

    })
})



//icon home
icon_home.addEventListener('click', ()=> {
    location.href = 'http://127.0.0.1:5500/html/homePge1.html'
})

//icon orders
ordersIcon.addEventListener('click',()=> {
   location.href = 'http://127.0.0.1:5500/html/myOrder.html'
})

//icon search
search_icon.addEventListener('click', ()=> {
    location.href = 'http://127.0.0.1:5500/html/search.html'
})


//plus & minus counter
function minusPlusCount(op){
    counter = document.getElementById('counter')
    if(op === '-'&& counter.value == 0) return
    counter.value = eval(`${counter.value} ${op}1`)

    total_price_number.innerHTML = `$ ${counter.value * 850}`
}

//post data to checkout
function postToChekout(){
   
    fetch('http://localhost:4000/myCard')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {

                let data = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    color: item.color,
                    size: item.size,
                    state: false,
                    img: item.img,
                }

                fetch('http://localhost:4000/checkout',{
                    method: "POST",
                    headers:{
                        "content-type":"application/json"
                   },
                   body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    location.href = 'http://127.0.0.1:5500/html/checkout.html'
                })           
        })
    })
}

post_to_checkout.addEventListener('click',postToChekout)

