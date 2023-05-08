const menuButton=document.getElementById('menuButton');
const menuList=document.getElementById('menuList');
const closeButtonSvg=document.getElementById('closeButtonSvg');
const openButtonSvg=document.getElementById('openButtonSvg');
const loginButton=document.getElementById('loginButton');
const syllabusButton=document.getElementById('syllabusButton');
const noticesButton=document.getElementById("noticesButton")

menuButton.addEventListener('click',()=>{
    if (menuList.style.display=="block") {
        menuList.style.display="none";
        closeButtonSvg.style.transition="0.5" 
        closeButtonSvg.style.display="none";
        openButtonSvg.style.display="block";
    }else{
        menuList.style.display="block";
        closeButtonSvg.style.display="block";
        openButtonSvg.style.display="none";
    }
})

loginButton.addEventListener('click',()=>{
    window.location.href="../Login/index.html";
})

syllabusButton.addEventListener("click",()=>{
    window.location.href="../syllabus";
})

noticesButton.addEventListener("click",()=>{
    window.location.href="../notices"
})