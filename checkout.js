
let wraperCards = document.querySelector('.wraper_myCart_checkout')
let backToMycard = document.querySelector('.fa-arrow-left')
let title_addres = document.querySelector('.home_addres')
let addres_text = document.querySelector('.addres_text')

function ganarat(){
    fetch('http://localhost:4000/myCard')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            console.log(item);
            wraperCards.insertAdjacentHTML('beforeend',`
            <div class="wraper_card wraper_card_checkout"> 
                    <div class="wraper_left_card">
                        <div class="wraper_imgCard">
                            <img src="${item.img}" alt="" class="img_delet_modal">
                        </div>
                    </div>
        
                    <div class="wraper_right_card">
                        <div class="row_one">
                            <span class="name_delet_modal">${item.name}</span>
                        </div>
        
                        <div class="row-tow row-two_checkout">
                            <div class="show_color"></div>
                            <span class="color_name">${item.color}</span>
                            <span>|</span>
                            <span class="show_size">size= ${item.size}</span>
                        </div>
        
                        <div class="row-three_checkout">
                            <span>$ ${item.price}</span>
                            <div class="count">${item.count}</div>     
                        </div>         
                </div>`)
        })
    })
}
window.addEventListener('load',ganarat)

// back my card page
backToMycard.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/myCart.html'
})

//set data to addres box

function getLocal(){
    let getItem = JSON.parse(localStorage.getItem('addres'))

    if(getItem){
        array = getItem

        title_addres.innerHTML = array[0].title
        addres_text.innerHTML = array[0].addres
        
        console.log(array[0].addres);
    }
}

getLocal()