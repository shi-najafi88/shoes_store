
let applay_btn = document.querySelector('.applay_btn')
let addNewAddres_btn = document.querySelector('.addNewAddres_btn')
let home_addres = document.querySelector('.home_addreses')
let office_addres = document.querySelector('.office_addres')
let apartment_addres = document.querySelector('.apartment_addres')
let parentHouse_addres = document.querySelector('.parentHouse_addres')
let title = document.querySelector('.home_addres')


//add addres
function postAddres(){
    
    addres = {
        Home: home_addres.value,
        Office: office_addres.value,
        Apartment: apartment_addres.value,
        parentsHouse: parentHouse_addres.value
    }

    fetch('http://localhost:4000/addres',{
        method: 'Post',
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(addres)    
    })
    .then(res => res.json())   
}
addNewAddres_btn&& addNewAddres_btn.addEventListener('click',postAddres)


applay_btn&& applay_btn.addEventListener('click',()=> {
    location.href = 'http://127.0.0.1:5500/html/chooseShipping.html'
})




let radio_btn = document.querySelectorAll('.radio')
let array = []

radio_btn.forEach(item => {
   item.addEventListener('click',()=> {

    let title = item.previousElementSibling
    let addreses = title.children

    let titleInner = addreses[0].innerHTML
    let addresInner = addreses[1].value

    console.log(addresInner);
    
    let newObj = {
        title: titleInner,
        addres: addresInner
    }
    array.push(newObj)
    setLocal(array)


   });
})

function setLocal(arr){
    localStorage.setItem('addres',JSON.stringify(arr))
}
