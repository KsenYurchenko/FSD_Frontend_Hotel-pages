
//---------hide/show calendar-------------
let calendar = document.querySelector('.calendar');
document.documentElement.addEventListener('click', (event)=> {
//календарь открывается и закрывается при клике на стрелки и кнопку "применить"(applyDates)
  if(event.target.id == 'trip_start_btn' || event.target.id == 'trip_end_btn' || event.target.id == 'applyDates') {
    if(event.defaultPrevented) {
      return false;
    }
    calendar.classList.toggle('none');
  } else if(!event.target.closest('form') && !calendar.classList.contains('none')) {
    //по клику вне формы календарь закрывается   
    if(event.defaultPrevented) {
      return false;
    }
    calendar.classList.add('none');
    }
})

//отменяем событие фокус на инпутах даты
document.querySelector('#trip_start').addEventListener('mousedown', (event) => {
      event.preventDefault();
  })

  document.querySelector('#trip_end').addEventListener('mousedown', (event) => {
        event.preventDefault();
    })
//---------add calendar to html----------
