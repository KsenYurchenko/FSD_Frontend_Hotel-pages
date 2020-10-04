document.querySelector('.switch__input').onchange = function () {
  let switcher = document.querySelector('.switch');
  switcher.classList.toggle('switch_default');
  switcher.classList.toggle('switch_active');
}

