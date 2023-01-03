// const { create } = require("json-server")

let input_email = document.querySelector('.input_email')
let input_pass = document.querySelector('.input_pass')
let input_check = document.querySelector('.input_check')
let btn_signin = document.querySelector('.btn_signin')
let wraper_email = document.querySelector('.wraper_email')
let wraper_pass = document.querySelector('.wraper_pass')
let container_login = document.querySelector('.container_login')
let btn_onbording1 = document.querySelector('.btn_onbording1')
let btn_onbording2 = document.querySelector('.btn_onbording2')
let btn_onbording3 = document.querySelector('.btn_onbording3')
let page_change1 = document.querySelector('.page_change1')
let page_change2 = document.querySelector('.page_change2')
let page_change3 = document.querySelector('.page_change3')
let all_drag_homePage1 = document.querySelector('.all_drag_homePage1')
let nike_drag_homePage1 = document.querySelector('.nike_drag_homePage1')
let back_homePage1_icon = document.querySelectorAll('.icon_back')
let wraper_shoes_info = document.querySelectorAll('.wraper_shoes_info')
let wraper_searchBox_homepage1 = document.querySelector('.wraper_searchBox_homepage1')
let order_icon = document.querySelector('.order_icon')
let avatar_info = document.querySelector('.avatar_info')
console.log(avatar_info);
let user_local_array =[]




// change loadin page to welcome page
if(location.href == 'http://127.0.0.1:5500/html/loading.html'){
    setTimeout(() => location.href = 'http://127.0.0.1:5500/html/wellcom.html' , 4000); 
}

//go to onbording1
if(location.href == 'http://127.0.0.1:5500/html/wellcom.html'){
    setTimeout(() => location.href = 'http://127.0.0.1:5500/html/onbording1.html', 4000);   
}


//change between onbording page
btn_onbording1&& btn_onbording1.addEventListener('click',()=>{
    
    location.href = 'http://127.0.0.1:5500/html/onbording2.html' 
})

btn_onbording2&& btn_onbording2.addEventListener('click',()=> {

    location.href = 'http://127.0.0.1:5500/html/onbording3.html'
})


//go to login page
btn_onbording3&& btn_onbording3.addEventListener('click',()=> {

     location.href = 'http://127.0.0.1:5500/html/login.html'
})


//login signin
btn_signin&& btn_signin.addEventListener('click',function() {

    if(input_check.checked){ //remember and set to local
        check_login_user()
    }
    getLocalStorage() 
    // window.addEventListener()     
})


//local storage user login
function check_login_user(){

    let newObj = {
        mail: input_email.value,
        pass: input_pass.value,
    }
    user_local_array.push(newObj)
    setLocalStorage(user_local_array)
}

function setLocalStorage(userArray){
    localStorage.setItem('user',JSON.stringify(userArray))
}


function getLocalStorage(){
    let getLocal = JSON.parse(localStorage.getItem('user'))

    if(getLocal){
        user_local_array = getLocal
        
        if(!input_email.value  && !input_pass.value){
            wraper_email.style.border = '1px solid red'
            wraper_pass.style.border = '1px solid red'
        }else if(input_email.value == user_local_array[0].mail && input_pass.value == user_local_array[0].pass) {

            location.href = 'http://127.0.0.1:5500/html/homePge1.html'
        }
    }else{
        user_local_array = []
        if(!input_email.value && !input_pass.value){
            wraper_email.style.border = '1px solid red'
            wraper_pass.style.border = '1px solid red'
        } 
        else{
            location.href = 'http://127.0.0.1:5500/html/homePge1.html' 
        }         
    }
}


//hompage1

let card_icon = document.querySelector('.card_icon')
let shopping_cart_icon = document.querySelector('.shopping-cart_icon')

//get localstorage avatar name
function avatar_name(){
    let getLocalStorage = JSON.parse(localStorage.getItem('user'))

    if(getLocalStorage){
        user_local_array = getLocalStorage

        avatar_info.innerHTML = user_local_array[0].mail   // inser name in avatar hompage1
    }
}

//go to search page
wraper_searchBox_homepage1&& wraper_searchBox_homepage1.addEventListener('click',function(){
    location.href = 'http://127.0.0.1:5500/html/search.html'
})
//go to hompage3
all_drag_homePage1&& all_drag_homePage1.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/homePage3.html'
})

//go to homepage2
nike_drag_homePage1&& nike_drag_homePage1.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/homePage2.html'
})

//back to hompage1 with arrow icon
back_homePage1_icon.forEach(item => {
    
   item&& item.addEventListener('click',()=> {
        console.log(item);
        location.href = 'http://127.0.0.1:5500/html/homePge1.html'
    })
})


// get product api and show on hompage1,2,3
    function ganarator(){

        fetch('http://localhost:4000/allProduct')
       .then(res => res.json())
       .then(data => {
           data.forEach(item => {
               wraper_shoes_info.forEach(prod =>{
                prod.insertAdjacentHTML('beforeend',`
                
                <section class="shoes_info product1">
                    <div class="wraper_shoes">
                        <img src=${item.img} alt="">
                    </div>
                    <a href="http://127.0.0.1:5500/html/product1HomePage1.html?id=${item.id}"><span class="shoe_name">${item.name}</span></a>
                    <span class="price">${item.price}</span>
                </section>`)
               }) 
           })
           avatar_name()
       })

    }
        
   window.addEventListener('load',ganarator)



   //footer
   card_icon&& card_icon.addEventListener('click', ()=> {
    location.href = 'http://127.0.0.1:5500/html/myCart.html'
   })

   //go to order
   order_icon&& order_icon.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/myOrder.html'
   })





 
   

 