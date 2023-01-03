
let container_view_product = document.querySelector('.container_product_page1')
let icon_back_toHome = document.querySelector('.back')
let toast = document.querySelector('.toast')
let close_icon = document.querySelector('.close_icon')
let finded


let urlParams = new URLSearchParams(location.search); //search id in url
let idUrl = urlParams.get('id');

//create  details product page
function show_details(){
    // getDataWishlist()
    // let heartIcon = finded ? `<i class="fa fa-heart wishList_heart" onclick="postToWish(event)"></i>`:`<i class="fa fa-heart-o" onclick="postToWish(event)"></i>`

    fetch('http://localhost:4000/allProduct')
   .then(res => res.json())
   .then(data => {
       data.forEach(item =>{
          
           if(idUrl == item.id){
              
               container_view_product.insertAdjacentHTML('beforeend',`
               <section class="top_content">

                    <header>
                        <i class="fa fa-arrow-left back" onclick="backHome()"></i>
                        <i class="fa fa-heart wishList_heart" onclick="postToWish(event)"></i>
                        
                    </header>
               
                    <img src="${item.img}" alt="">
   
                    <section class="wraper_change_page">
                        <div class="page_change page_change1" style="background-color: rgb(41, 41, 41);"></div>
                        <div class="page_change page_change2"></div>
                        <div class="page_change page_change3"></div>
                     </section>
   
                </section>
   
                <section class="bottom_content">
                   <h1>${item.name}</h1>
                   <p class="intro-product">In ultricies fermentum aliquet. Pellentesque dui magna, condimentum non ullamcorp <a href="">view more...</a></p>
                   <span>Size</span>
                   <div class="wraper_size">
                       <div class="size size40 ${item.size == 40 ? 'active_size' : ""}">40</div>
                       <div class="size size41 ${item.size == 41 ? 'active_size' : ""}">41</div>
                       <div class="size size42 ${item.size == 42 ? 'active_size' : ""}">42</div>
                   </div>
                <div class="wraper_count_product">
                <span class="quantity">Quantity</span>
                <div class="count">
                    <span onclick="minusPlusCount('-')">-</span>
                    <input id="counter" value=1>
                    <span onclick="minusPlusCount('+')">+</span>
                </div>
            </div>

            <div class="wraper_addToCart_content">
                <div class="wraoer_total_price">
                    <span class="total_price_span">Total Price</span>
                    <span class="total_price_number">${item.price}</span>
                </div>
                <div class="wraper_addToCart-Btn">
                    <i class="fa fa-shopping-bag"></i>
                    <a onclick="postToMycard(${item.id})"><button class="addBtn_text">Add To Cart</button></a>
                </div>
            </div>
                </section>`)
           }
       })
   })   
       
}
window.addEventListener('load',show_details)


// click back icon to hompage1
function backHome(){
    location.href = 'http://127.0.0.1:5500/html/homePge1.html'
}


// post to wishlist favorit product
function postToWish(event){
    event.target.style.color = 'red'

    fetch('http://localhost:4000/allProduct')
    .then(res => res.json())
    .then(data => {
    
        data.forEach(item => {
           
            if(idUrl == item.id){
                
                let productData = {  // post data to wishlist
                id: item.id,
                name: item.name,
                price: item.price,
                rate: item.rate,
                sold: item.sold,
                img: item.img,
                }

                fetch('http://localhost:4000/wishlist',{
                        method: 'POST',
                        headers:{
                             "content-type":"application/json"
                        },
                        body: JSON.stringify(productData)
                        })
                        .then(res => {
                            toast.style.display = 'block' 
                            return res.json()
                        })              
            }

        })
    })

}

//toast close
close_icon.addEventListener('click',()=>{
    toast.style.display = 'none'
})


//plus & minus counter
// let total_price_number = document.querySelector('.total_price_number')

let counter;
function minusPlusCount(op){
    counter = document.getElementById('counter') 
    
    if(op === '-'&& counter.value == 0) return
    counter.value = eval(`${counter.value} ${op}1`)
    
    // total price
    let total_price_number = document.querySelector('.total_price_number')
    total_price_number.innerHTML = counter.value * 850   
}



function postToMycard(id){
    if(!counter){
        counter = document.getElementById('counter') 
    }
   
    fetch('http://localhost:4000/allProduct')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {

            if(item.id == id){

                let dataObject = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    color: item.color,
                    size: item.size,
                    count: counter.value,
                    img: item.img,
                }

                fetch('http://localhost:4000/myCard',{
                    method: "POST",
                    headers:{
                        "content-type":"application/json"
                   },
                   body: JSON.stringify(dataObject)
                })
                .then(res => res.json())
                .then(data => {
                    location.href = 'http://127.0.0.1:5500/html/myCart.html'
                })
            }
        })
    })
}




