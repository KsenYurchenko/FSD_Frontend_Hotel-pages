
//---------dropdown-guests-animation-start-------
let guestsDropdown = document.querySelector('#dropdown_guests');
let guestsInput = guestsDropdown.children[0];
let guestsOutput = document.querySelector('#dropdown_guests__text').value;
let guestsMenu = document.querySelector('#dropdown_guests__options');
let guestsClear = document.querySelector('.dropdown__clear');
let guestsApply = document.querySelector('.dropdown__apply');

function showGuestsMenu() {//ok
  if (guestsMenu.classList.contains('hidden')) {
    guestsMenu.classList.remove("hidden");
    guestsMenu.classList.add("expanded");
    guestsInput.classList.add("expanded");
    guestsInput.classList.remove("default");
    guestsInput.children[1].classList.add("rotate");
  }
}

function hideGuestsMenu() {//ok
  guestsMenu.classList.add("hidden");
  guestsMenu.classList.remove("expanded");
  guestsInput.classList.remove("expanded");
  guestsInput.classList.add("default");
  guestsInput.children[1].classList.remove("rotate");
}

guestsClear.addEventListener('click', (event) => {
  document.querySelector("#adult_value").innerHTML = 0;
  adult = 0;
  document.querySelector("#children_value").innerHTML = 0;
  children = 0;
  document.querySelector("#babies_value").innerHTML = 0;
  babies = 0;
  for (i = 0; i < 3; i++) {
    guestsMenu.children[i].children[1].children[0].classList.add('default');
    guestsMenu.children[i].children[1].children[0].classList.remove('active');
  }
  guestsClear.classList.add('hidden');
  console.log('hidden');//delete
})

guestsInput.addEventListener('click', (event) => {
  if (event.defaultPrevented) return;
  showGuestsMenu();
  dropdownCount(guestsMenu);
})

let adult;
let children;
let babies;

guestsApply.addEventListener('click', (event) => {
  adult = +document.querySelector("#adult_value").innerHTML;
  /*if (adult == 1) {
    adult += ' взрослый';
  } else {
    adult += ' взрослых';
  }*/
  children = +document.querySelector("#children_value").innerHTML;
  /* if (children == 1) {
     children += ' ребёнок';
   } else if (1 < children && children < 5) {
     children += ' ребёнка';
   } else if (children > 4 || children == 0) {
     children += ' детей';
   }*/
  babies = +document.querySelector("#babies_value").innerHTML;
  let babiesValue;
  if (babies == 0) {
    babiesValue = '';
  } else if (babies == 1) {
    babiesValue = `, ${babies} младенец`;
  } else if (1 < babies && babies < 5) {
    babiesValue = `, ${babies} младенца`;
  } else {
    babiesValue += `, ${babies} младенцев`;
  }
  let guests = adult + children;

  let guestsValue;
  if (guests == 1) {
    guestsValue = `${guests} гость`;
  } else if (1 < guests && guests < 5) {
    guestsValue = `${guests} гостя`;
  } else if (guests > 4 || guests == 0) {
    guestsValue = `${guests} гостей`;
  }

  if (document.querySelector("#dropdown_guests__text").tagName == "P") {
    document.querySelector("#dropdown_guests__text").innerText = `${guestsValue}${babiesValue}`;
  } else if (document.querySelector("#dropdown_guests__text").tagName == "INPUT") {
    document.querySelector("#dropdown_guests__text").value = `${guestsValue}${babiesValue}`;
  }

  sessionStorage.setItem('guests', `${guestsValue}${babiesValue}`);


  hideGuestsMenu();
})
//при открытии бургер-меню закрываем блок гостей
document.querySelector('.burger-menu__btn').addEventListener('click', (event) => {
  if (!guestsMenu.classList.contains('hidden')) {
    console.log(document.querySelectorAll('menu__btn'));
    hideGuestsMenu();
  }
})

//отменяем браузерное событие focus на инпуте в блоке выбора гостей
document.querySelector('#dropdown_guests__text').addEventListener('mousedown', (event) => {
  event.preventDefault();
})

//-------------------------
