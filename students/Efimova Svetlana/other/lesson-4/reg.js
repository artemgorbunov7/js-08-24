let text = document.querySelector("p").innerText;

const regexp = /\b'|'\b/g;           

console.log(text.replace(regexp, '"'));