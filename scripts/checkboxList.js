//--------checkboxList-start--------
let checkboxList = document.querySelector('.checkboxList');
let checkboxAngle = document.querySelector('.checkboxList__icon');
let checkboxItems = document.querySelector('.checkboxList__items');
checkboxAngle.onclick = function () {
    checkboxItems.classList.toggle('hidden');
    checkboxAngle.classList.toggle('rotate');
}

let inputRadioArr = document.querySelectorAll('.checkboxButton__input');
for (let i = 0; i < inputRadioArr.length; i++) {
    inputRadioArr[i].onchange = function () {  //change color of title of gender class='checkboxButton__item'
        console.log(inputRadioArr[i].parentElement.lastElementChild);
        for (let k = 0; k < inputRadioArr.length; k++) {
            inputRadioArr[k].parentElement.lastElementChild.classList.toggle('checkboxButton__item_checked');
        }
    }
}
//--------checkboxList-end--------