//---------dropdown-comfort-start-------
function showDropdown(dropdown) {
    dropdown.children[1].classList.toggle("hidden");
    dropdown.children[1].classList.toggle("expanded");
    dropdown.children[0].classList.toggle("expanded");
    dropdown.children[0].classList.toggle("default");
    dropdown.children[0].children[1].classList.toggle("rotate");
}

let comfortDropdown = document.querySelector('#dropdown_comforts');
let comfortInput = comfortDropdown.children[0];
let comfortOutput = document.querySelector('#dropdown_comforts__text').innerHTML;
let comfortMenu = document.querySelector('#dropdown_comforts__options');

function setComfortsDropdownValue() {
    showDropdown(comfortDropdown);
    dropdownCount(comfortMenu);
    if (comfortMenu.classList.contains("hidden")) {
        let bedroom = +document.querySelector("#bedroom_value").innerHTML;
        if (bedroom == 1) {
            bedroom += ' спальня';
        } else if (1 < bedroom && bedroom < 5) {
            bedroom += ' спальни';
        } else if (bedroom > 4 || bedroom == 0) {
            bedroom += ' спален';
        }

        let bed = +document.querySelector("#bed_value").innerHTML;
        if (bed == 1) {
            bed += ' кровать';
        } else if (1 < bed && bed < 5) {
            bed += ' кровати';
        } else if (bed > 4 || bed == 0) {
            bed += ' кроватей';
        }
        comfortOutput = `${bedroom}, ${bed}...`;
        let bath = +document.querySelector("#bath_value").innerHTML;


        document.querySelector("#dropdown_comforts__text").innerHTML = comfortOutput;
};
}

comfortInput.addEventListener('click', ()=> {
    setComfortsDropdownValue();
}) 
  //---------dropdown-comfort-animation-end-------
//при открытии бургер-меню закрываем выпадающее меню
document.querySelector('.burger-menu__btn').addEventListener('click', (event) => {
    if (comfortDropdown.children[0].classList.contains('expanded')) {
      setComfortsDropdownValue();
    }
  });
