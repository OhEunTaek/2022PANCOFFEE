//window.onload = function(){}
//defer없으면 대신 이것이라도 있어야한다.

//변수설정 - const는 변수이름을 만드는것
const btnCall = document.querySelector(".btnCall");
//문서에서 btnCall을 찾아달라요청
const menuMo = document.querySelector(".menuMo");
//이벤트 바인딩
//btnCall을 클릭할때 
btnCall.onclick = function(e){
    e.preventDefault();
    //링크이동금지 
    //btnCall에 on이 있으면 제거, 없으면 추가
    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}