
let wraper_complited_order = document.querySelector('.wraper_myCart_order')
let home_icon = document.querySelector('.home_icon')
let card_icon = document.querySelector('.card_icon')
let search_icon = document.querySelector('.search_icon_myOrder')

function createComplit(){
    fetch('http://localhost:4000/checkout')
    .then(res => res.json())
    .then(data => {

        data.forEach(item => {

            if(item.state == true){
                wraper_complited_order.insertAdjacentHTML('beforeend',`
                <div class="wraper_card">
                
                <div class="wraper_left_card">
                    <div class="wraper_imgCard">
                        <img src="${item.img}" alt="">
                    </div>
                </div>
    
                <div class="wraper_right_card">
                    <div class="row_one">
                        <span>${item.name}</span>
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
                            <div class="trackOrder">Track Order</div>
                        </div>
                    </div>                
                </div>`) 
            }    
        })
    })
}
window.addEventListener('load',createComplit)

//search icon
search_icon.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/search.html'
})

//go to home
home_icon.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/homePge1.html'
})

//go to cart
card_icon.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/myCart.html'
})
