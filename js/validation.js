const form = document.querySelector("#member"); 
const btnSubmit = form.querySelector("input[type=submit"); 

//btnSubmit버튼을 클릭했을 때 
btnSubmit.addEventListener("click", e=>{
    //isTxt함수의 반환값이 false라면 e.preventDefault로 전송중지 
    if(!isTxt("userid", 5)) e.preventDefault(); 
    //comments 인증처리 
    if(!isTxt("comments", 20)) e.preventDefault(); 
    //email 인증처리 
    if(!isEmail("email")) e.preventDefault(); 

    //gender 라디오박스 인증처리 
    if(!isCheck("gender")) e.preventDefault(); 
    //hobby 체크박스 인증처리     
    if(!isCheck("hobby")) e.preventDefault(); 
    //edu select 박스 인증처리 
    if(!isSelect("edu")) e.preventDefault(); 

    //password 인증처리 
    if(!isPwd("pwd1", "pwd2", 5)) e.preventDefault(); 
}); 

//type이 text인 form요소 인증 함수 
//첫번째 인수로 name값, 두번째 인수로 글자수를 전달받음 
function isTxt(name, len){

    //만약 입력받은 글자수가 없다면 5로 지정 
    if(len === undefined ) len = 5; 

    //해당 name값의 input요소를 찾음 
    let input = form.querySelector(`[name=${name}]`); 
    //해당 input요소의 value값 구함 
    let txt = input.value; 

    //입력받은 value값의 글자수가 len이상이라면 
    if(txt.length >= len){
        //일단 에러메시지 p요소가 있는지 판별 
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        //p요소가 있다면 제거하고 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove(); 

        //true값 반환하여 인증통과 
        return true; 

    //입력받은 value값의 글자수가 len개이상이 아닐경우
    }else{
        //일단 에러메시지 p요소가 있는지 판별 
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        //p요소가 있다면 제거하고 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove(); 

        //p태그로 에러메시지 새로 생성하여 해당 input요소의 부모 td의 뒤쪽에 삽입
        const errMsg = document.createElement("p"); 
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`); 
        input.closest("td").append(errMsg); 

        //false값 반환하여 인증 막음 
        return false; 
    }
}


//email 인증함수 
function isEmail(name){

    let input = form.querySelector(`[name=${name}]`); 
    let txt = input.value; 

    if(/@/.test(txt)){
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

        return true; 
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p"); 
        errMsg.append("@를 포함한 전체 이미일 주소를 입력하세요."); 
        input.closest("td").append(errMsg); 

        return false; 
    }
}



//check 인증함수 
function isCheck(name){
    //input갯수가 여러개이므로 유사배열로 받는다 
    let inputs = form.querySelectorAll(`[name=${name}]`); 
    //일단 isCheck 변수값을 false로 지정하고 
    let isCheck = false; 

    //input의 갯수만큼 반복을 돌면서 
    for(let el of inputs){
        //하나라도 체크되어있는 것이 있다면 isCheck 값을 true로 변경 
        if(el.checked) isCheck = true; 
    }

    //isCheck가 true라면 인증 통과 
    if(isCheck){
        //경고문구가 있는지 찾아서 있다면 삭제 처리 
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove(); 
        //리턴값으로 true 반환 
        return true; 

    //하나라도 체크가 되어 있지않아서 isCheck 가 false라면 
    }else{
        //경고문구 띄어주고 
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) inputs[0].closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("필수 입력 항목을 체크해주세요"); 
        inputs[0].closest("td").append(errMsg); 

        //리턴값으로 false 반환 
        return false; 
    }
}


//select 인증함수 
function isSelect(name){
    //select 요소를 받아서 option중 선택된 요소의 순번을 찾아 value값 저장 
    let sel = form.querySelector(`[name=${name}]`); 
    let sel_index = sel.options.selectedIndex; 
    let val = sel[sel_index].value; 

    //option을 선택했다면 
    if(val !==""){
        const errMsgs = sel.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = sel.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("항목을 선택해 주세요"); 
        sel.closest("td").append(errMsg); 

        return false; 
    }

}



//password 인증함수 
function isPwd(name1, name2, len){

    //두개의 비밀번호 값을 저장 
    let pwd1 = form.querySelector(`[name=${name1}]`); 
    let pwd2 = form.querySelector(`[name=${name2}]`); 
    let pwd1_val = pwd1.value; 
    let pwd2_val = pwd2.value; 

    //숫자,문자,특수문자 조건을 정규표현식으로 저장 
    const num = /[0-9]/; 
    const eng = /[a-zA-Z]/; 
    const spc = /[~!@#$%^&*()_+?><]/;

    //두개의 비밀번호 같고, 비밀번호의 글자수가 len개 이상이고 
    //비밀번호에 num, eng, spc 가 포함되어 있다면 
    if(pwd1_val === pwd2_val && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)){

        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`비밀번호는 ${len}글자 이상, 영문,숫자,특수문자를 포함하여 동일하게 입력하세요`); 
        pwd1.closest("td").append(errMsg); 

        return false; 
    }
}


/*
조건 
- 두 개의 비밀번호가 같다 
만약 같다면 
- 길이가 5글자 이상 
- 숫자 
-특수문자 
-영문자 


*/





/*
인증함수 

만약 조건을 만족한다면 return true 
만약 조건을 만족하지 않는다면 return false; 

//submit 버튼을 클릭했을 때 
//인증함수 결과값이 false라면 e.preventDefault() 
//인증함수 결과값 모두 true - result page로 이동 

if(조건문){
    //코드 
    return true; 
}else{
    //경고문구 
    return false; 
}
*/