// efek navbar berubah saat scroll

window.addEventListener("scroll",function(){

let navbar = document.querySelector(".navbar");

if(window.scrollY > 50){

navbar.classList.add("shadow");

}else{

navbar.classList.remove("shadow");

}

});
