let regTel = /\+7\(\d{3}\)\d{3}-\d{4}/;
let tel = document.querySelector("#tel");
let regName = /^[a-zA-Z]*$/;
let name = document.querySelector("#name");
let regEmail = /my(\.|-)[a-zA-Z]*@mail.ru/;
let email = document.querySelector("#email");


let btn = document.querySelector('button');
btn.addEventListener('click', buttonClickHandler);

function buttonClickHandler(event) {
   let testT = regTel.test(tel.value);
   let testN = regName.test(name.value);
   let testEm = regEmail.test(email.value);

   let telErr = document.querySelector('.telErr');
   let nameErr = document.querySelector('.nameErr');
   let emailErr = document.querySelector('.emailErr');

   if(!testT) {
       telErr.innerText = "Формат номера телефона +7(000)000-0000";
       telErr.classList.remove("hidden");
       tel.classList.add("red-border");
   } else {
       telErr.classList.add("hidden");
       tel.classList.remove("red-border");
   }

   if(!testN) {
       nameErr.innerText = "Имя должно содержать буквы A-Z";
       nameErr.classList.remove("hidden");
       name.classList.add("red-border");
    } else {
        nameErr.classList.add("hidden");
        name.classList.remove("red-border");
    }

    if(!testEm) {
        emailErr.innerText = "E-mail должен иметь формат mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.";
        emailErr.classList.remove("hidden");
        email.classList.add("red-border");
     } else {
        emailErr.classList.add("hidden");
        email.classList.remove("red-border");
     }
}
