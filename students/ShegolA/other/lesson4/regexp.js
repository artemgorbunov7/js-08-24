let text = "'I'm different, and I'm happy, ' Calvin said. 'But you pretend that you aren't different. 'I'm different, and I like being different.' Calvin's voice was unnaturally loud. 'He loved you'—she pounded the wall with a heavy fist—'but you never cared.'";

let re = /'/g; // найдём все одинарные кавычки
let newtext = text.replace(re, `"`);
let re2 = /(\w)"(\w)/g; // найдём двойные кавычки внутри слова
newtext = newtext.replace(re2, `$1'$2`);
console.log(newtext);
