let wraper_history_search = document.querySelector('.wraper_history_search')
let wraper_searchBox = document.querySelector('.wraper_searchBox')
let input_search_page = document.querySelector('.input_search_page')
let clearAll_history = document.querySelector('.clearAll_history')


//get data on api
function get_data_history(){
    
    wraper_history_search.innerHTML = '' 
    
    fetch('http://localhost:4000/searchHistory')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            wraper_history_search.insertAdjacentHTML('beforeend',`
                <div class="history">
                    <span>${item.searchContent}</span>
                    <div class="wraper_remove_history" onclick="delet_history(${item.id})">
                        <i class="fa fa-close"></i>
                    </div>
                </div>`)
        })
    })
}
window.addEventListener('load',get_data_history)


//post to api
function post_history(event){

    if(event.keyCode == 13){
        
        let dataHistory = {
            searchContent: input_search_page.value 
        }
        fetch('http://localhost:4000/searchHistory',{
            method: 'POST',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(dataHistory)
        })
        .then(res => res.json())
        .then(data => {

            get_data_history()
            findData()
        })       
    }
}
wraper_searchBox.addEventListener('keydown',post_history)


//delet history search
function delet_history(id){
    fetch(`http://localhost:4000/searchHistory/${id}`,{
        method:'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        get_data_history()
    })
}


//clear all history search
function clearAll(){
    fetch('http://localhost:4000/searchHistory')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {

            fetch(`http://localhost:4000/searchHistory/${item.id}`,{
                method:'DELETE'
            }) 
            .then(res => res.json()) 
            .then(data =>{
                get_data_history()
            })  
        })
    })
}
clearAll_history&& clearAll_history.addEventListener('click',clearAll) 

 
//get data an api allproduct for find product
function findData(){
    fetch('http://localhost:4000/allProduct')
    .then(res => res.json())
    .then(data => {
        data.filter(item =>{
            
            if(item.name == input_search_page.value){
                input_search_page.value = ''
                location.href = `http://127.0.0.1:5500/html/product1HomePage1.html?id=${item.id}`
            }   
        })
    })
}