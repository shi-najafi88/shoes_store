
let wraper_wishlist = document.querySelector('.wraper_shoes_info')
let back_icon = document.querySelector('.back_icon')
let all_drag_homePage1 = document.querySelector('.all_drag_homePage1')
let nike_drag_homePage1 = document.querySelector('.nike_drag_homePage1')


// let urlParams = new URLSearchParams(location.search); //search id in url
// let idUrl = urlParams.get('id');


// get wishlist on api and show dom
function update_dom(){
    wraper_wishlist.innerHTML=''
    
    fetch('http://localhost:4000/wishlist')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(item => {
            
                wraper_wishlist.insertAdjacentHTML('beforeend',`
             
                <section class="shoes_info product1">
                <div class="wraper_shoes">
                    <img src=${item.img} alt="">
                </div>
                <a href="http://127.0.0.1:5500/html/product1HomePage1.html"><span class="shoe_name">${item.name}</span></a>
                <div class="wraper_star">
                    <i class="fa fa-star"></i>
                    <span class="rate">${item.rate}</span>
                    <span>|</span>
                    <div class="sold">${item.sold} sold</div>
                </div>
                <div class="wraper_favorit">
                <span class="price">${item.price}</span>
                <i class="fa fa-heart ${'red_color'}" onclick="delet_wishlist(${item.id})"></i>
                </div>               
            </section>`)           
    })
}) 
}

window.addEventListener('load',()=>{
    update_dom()
})


//back to homepage1
back_icon.addEventListener('click',()=>{
    location.href = 'http://127.0.0.1:5500/html/homePge1.html'
})

//go to allpage
all_drag_homePage1.addEventListener('click',()=>{
    location.href = 'http://127.0.0.1:5500/html/homePage3.html'
})

//go to nikepage
nike_drag_homePage1.addEventListener('click',()=>{
    location.href = 'http://127.0.0.1:5500/html/homePage2.html'
})


// delet wishlist items
function delet_wishlist(id){
    
    fetch(`http://localhost:4000/wishlist/${id}`,{
        method:'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        update_dom()
    })
}














 