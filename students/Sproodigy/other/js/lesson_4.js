function checkInputField(elem) {
  elem.parentElement.classList.remove('form__wrp_invalid')
  elem.classList.remove('form__input_invalid')

  if (!elem.checkValidity()) {
    elem.classList.add('form__input_invalid')
    elem.parentElement.classList.add('form__wrp_invalid')
  }
}

function checkInputFields() {
  const inputs = document.querySelectorAll('.form__input')

  inputs.forEach(input => checkInputField(input))
}

document.querySelector('.btn').addEventListener('click', () => {
  const oldTextSrc = document.querySelector('.string')
  const match = /^(\W'|'\W)/g
  const newText = oldTextSrc.innerHTML
    .replace(/\s+'/g, ' "')
    .replace(/'\s+/g, '" ')
    .replace(/',/g, '",')
  oldTextSrc.innerHTML = newText
})
