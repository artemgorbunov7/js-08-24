document.getElementById('change').addEventListener('click', changeQuotes);

function changeQuotes() {
    const textObject = document.getElementById('text');
    let textString = textObject.innerHTML;
    let regExp = /([^\s])(<br>)/g;
    textString = textString.replace(regExp, '$1 $2');
    regExp = /\s\'([a-zA-Z0-9\W]*?)\'\s/g;
    textObject.innerHTML = textString.replace(regExp, ' "$1" ');
}