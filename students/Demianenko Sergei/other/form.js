class Validation {
    constructor(form){
        this.form = form;
        this.errors = {
            name: "Имя должно содержать только буквы.",
            phone: "Телефон должен имеет вид +7(000)000-0000",
            email: "E-mail должен имееть вид mymail@mail.ru",
            message: "Сообщение не должно быть пустым",
        }
        this.patterns = {
            name: /^[a-zа-я]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}/i,
            email: /^[a-z1-9-.]+@[a-z]+\.(com|ru)$/i,
            message: /.+/im, 
        }
        this.valid = false;
        this.errorClass = 'error';
        this.validateForm();

    }
    validateForm(){
        let errors = [...document.querySelectorAll(`.${this.errorClass}`)];
        for (let item of errors){
            item.remove();
        }
        let formValid = [...document.getElementById(this.form).getElementsByTagName("input")];
        for (let field of formValid){
            this.validate(field);
        }
        if(![...document.querySelectorAll(`.${this.errorClass}`)].length){
            this.valid = true;
        }
    }
    validate(field){
        if (this.patterns[field.name]){
            if (!this.patterns[field.name].test(field.value)){
                field.classList.add("div-error");
                this.addErrorMsg(field);
                this.watchField(field);
            }
        }
    }
    addErrorMsg(field){
        let error = `<div class = "${this.errorClass}"> ${this.errors[field.name]} </div>`
        field.parentNode.insertAdjacentHTML("beforeend",error);
    }
watchField(field){
    field.addEventListener("input", ()=>{
        let error = field.parentNode.querySelector(`.${this.errorClass}`);
        if(this.patterns[field.name].test(field.value)){
            field.classList.remove("div-error");
            field.classList.add("div-ok");
            if (error){
                error.remove();
            }
         } else {
                field.classList.add("div-error");
                field.classList.remove("div-ok");
                if (!error){
                    this.addErrorMsg(field);
                }
            }
    })
}
}