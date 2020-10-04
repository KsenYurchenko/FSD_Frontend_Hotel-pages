document.documentElement.addEventListener('click', (event) => {
    //если бургер-меню открыто и клик отловлен не на бурге-меню
    if (document.querySelector('.burger-menu__input').checked && !(event.target.closest('.burger-menu') || event.target.classList.contains('burger-menu'))) {
      //то закрываем бургер
      document.querySelector('.burger-menu__input').checked = false;
      //предотвращаем погружение события и срабатывание браузерных (переход по ссылке, фокус на инпуте) и пользоватльских событий
      event.preventDefault();
    };
  }, { capture: true })

