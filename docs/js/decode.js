let path = $('#decode');
let container = path.get(0);
let textToWrite = path.text();
let i = 0;
let progress = 0;
let codingChars = '01'

function animate() {
    setTimeout(function () {
        i++;
        let currentText = textToWrite.substr(0, i);
        currentText += getRandomChars(textToWrite.length - i);

        container.innerHTML = currentText;
        progress = i / textToWrite.length;

        if (progress < 1) {
            animate()
           }
    }, (textToWrite.length - i) / 100 );
}

function getRandomChars(howMany) {
    let result = '';

    for (let i = 0; i < howMany; i++) {
        if (i % 5 == 0) {
            result += ' '
        } else {
            result += codingChars.charAt(Math.floor(Math.random() * codingChars.length));
        }
    }
    return result
}

if(container != undefined){
    animate();
}
