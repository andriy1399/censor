
function censor(text: string, words: string[]): string {
    for (const word of words) {
        let reg = new RegExp(`\\b${word}\\b`, 'ig')
        text = text.replace(reg, makeСhr('*', word.length))
    }
    return text;
}

function makeСhr(char: string, length: number): string {
    let str: string = '';
    for (let i = 0; i < length; i++)  str += char;
    return str;
}

const getSel = (sel: string) => document.querySelector(sel);
let badWordsList: string[];
getSel('.censor__btn--add').addEventListener('click', function () {
    let reg: RegExp = /[\s]+/;
    let inp = getSel('.censor__input') as HTMLInputElement;
    let badWordsElem = getSel('.censor__bad-words-str') as HTMLFontElement;
    let val: string = inp.value;
    if (!reg.test(val) && val) {
        let badWordsStr: string = badWordsElem.textContent;
        let arrBadWord: string[] = badWordsStr.split(', ');
        arrBadWord.push(val);
        if (badWordsStr.length) badWordsStr = arrBadWord.join(', ');
        else badWordsStr = arrBadWord.join('');
        badWordsElem.textContent = badWordsStr;
        badWordsList = badWordsStr.split(', ') // !
        inp.placeholder = 'word here...';
        inp.classList.remove('censor__input--warning')
        console.log(badWordsList);
    } else {
        inp.placeholder = 'Please write a word!';
        inp.classList.add('censor__input--warning')
    }
    inp.value = '';
})

getSel('.censor__btn--reset').addEventListener('click', function () {
    let badWordsElem = getSel('.censor__bad-words-str') as HTMLFontElement;
    badWordsElem.textContent = '';
})

getSel('.censor__btn--censor').addEventListener('click', function () {
    let textAr = getSel('.censor__text') as HTMLInputElement;
    const text = textAr.value;
    console.log(text);
    if (text) {
        let correctText: string = censor(text, badWordsList);
        textAr.value = correctText;
        textAr.placeholder = 'text here...';
        textAr.classList.add('censor__text--good');
        textAr.classList.remove('censor__text--warning')

    }else{
        textAr.placeholder = 'Please write some text!';
        textAr.classList.remove('censor__text--good')
        textAr.classList.add('censor__text--warning')
    }
})
