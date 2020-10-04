//---------calendar--------------
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let day = today.getDay();
let dates = [];
let dateStart = '';
let dateEnd = '';
let indexDateStart;
let indexDateEnd;
let userDateStart;
let userMonth;
let userMonthStart;
let userMonthEnd;
let userDateEnd;

let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

//названия месяцев для вывода выбранных дат в инпут
let shortMonthName = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

//заголовок календаря 
let monthAndYear = document.querySelector("#monthAndYear");
showCalendar(currentMonth, currentYear);

//кнопки переключения месяцев
document.querySelector('#previous').addEventListener('click', (event) => {
  previous();
})
document.querySelector('#next').addEventListener('click', (event) => {
  next();
})

function next() {
  clearChoice();
  dates = [];
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  if (currentMonth > today.getMonth() || currentYear > today.getFullYear()) {
    clearChoice();
    dates = [];
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
  }
}


function showCalendar(month, year) {
  let firstDay = (new Date(year, month)).getDay();
  if (firstDay == 0) {//меняем номер дня недели т.к. в российском календаре понедельник идёт первым и он должен быть нулевым для заполнения календаря, а в выдаче даты - первое воскресенье
    firstDay = firstDay + 6;
  } else {
    firstDay = firstDay - 1;
  }

  //получаем количество дней в месяце
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let tbl = document.querySelector("#calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";
  // filing data about month and in the page via DOM
  monthAndYear.innerHTML = months[month] + " " + year;
  //catch end of month for no cteate excess 'tr'
  let monthIsEnd = false;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    //не создаём новую строку дат если месяц закончился
    if (monthIsEnd) {
      break;
    }

    // creates a table row
    let row = document.createElement("tr");
    //creating individual cells, filing them up with data
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      else if (date > daysInMonth) {
        //дозаполнение  календаря до конца недели, если последний день месяца не является воскресеньем
        let lastDay = new Date(currentYear, currentMonth, daysInMonth);
        monthIsEnd = true;
        if (lastDay.getDay() != 0) {
          //начинаем нумерацию дней в новом месяце
          date = 1;
          function fillWeek() {
            for (let m = 7 - lastDay.getDay(); m > 0; m--) {
              let cell = document.createElement("td");
              let cellText = document.createTextNode(date);
              cell.classList.add('calendar__date');
              cell.classList.add('calendar__next-month');
              cell.appendChild(cellText);
              row.appendChild(cell);
              date++;
            }
          }
          fillWeek();
        };
        break;
      }

      else {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(date);
        cell.classList.add('calendar__date');
        //выделяем сегодняшнюю дату
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.classList.add("calendar__date_secondary");
        } // color today's date
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.

  }

  dates = document.querySelectorAll('.calendar__date');//массив всех дат в календаре

  for (let k = 0; k < dates.length; k++) {

    if (+dates[k].innerHTML >= today.getDate() || currentMonth > today.getMonth() || dates[k].classList.contains('calendar__next-month') || currentYear > today.getFullYear()) {
      dates[k].addEventListener('click', () => {
        if (dateStart == '') {
          dateStart = +dates[k].innerHTML;
          indexDateStart = k;

          dates[k].classList.add('calendar__date_start');
          //вставляем дополнительный элем в выбранные крайние даты для стилей
          dates[indexDateStart].innerHTML = `<div class="calendar__date_checked">${dates[indexDateStart].innerHTML}</div>`;

          //формаируем дату и месяц для вывода в инпут
          if (dateStart < 10) {
            userDateStart = `0${dateStart}`;
          } else {
            userDateStart = dateStart;
          }
          if (dates[k].classList.contains('calendar__next-month')) {
            if (currentMonth + 1 < 9) {
              userMonth = `0${currentMonth + 2}`
            } else {
              userMonth = (currentMonth == 11) ? '01' : currentMonth + 2;
              currentYear = (userMonth == "01" && currentMonth !== 0) ? today.getFullYear() +1 : today.getFullYear();
            }
          } else {
            if (currentMonth < 9) {
              userMonth = `0${currentMonth + 1}`
            } else {
              userMonth = currentMonth + 1;
            }
          }
          userMonthStart = userMonth - 1;

          document.querySelector('#trip_start').value = `${userDateStart}.${userMonth}.${currentYear}`;
          sessionStorage.setItem('startFullTripDate', `${userDateStart}.${userMonth}.${currentYear}`);

        } else if ((dateStart != '' && dateEnd == '' && +dates[k].innerHTML > dateStart) || (dateStart != '' && dateEnd == '' && dates[k].classList.contains('calendar__next-month'))) {
          //всё то же самое для конечной даты
          dateEnd = +dates[k].innerHTML;
          indexDateEnd = k;
          dates[k].classList.add('calendar__date_end');

          dates[indexDateEnd].innerHTML = `<span class="calendar__date_checked">${dates[indexDateEnd].innerHTML}</span>`;

          if (dateEnd < 10) {
            userDateEnd = `0${dateEnd}`
          } else {
            userDateEnd = dateEnd;
          }

          if (dates[k].classList.contains('calendar__next-month')) {
            if (currentMonth + 1 < 9) {
              userMonth = `0${currentMonth + 2}`
            } else {
              userMonth = (currentMonth == 11) ? '01' : currentMonth + 2;
              currentYear = (userMonth == "01" && currentMonth !== 0) ? today.getFullYear() + 1 : today.getFullYear();
            }
          } else {
            if (currentMonth < 9) {
              userMonth = `0${currentMonth + 1}`
            } else {
              userMonth = currentMonth + 1;
            }
          }

          userMonthEnd = userMonth - 1;
          document.querySelector('#trip_end').value = `${userDateEnd}.${userMonth}.${currentYear}`;

          sessionStorage.setItem('endFullTripDate', `${userDateEnd}.${userMonth}.${currentYear}`);
          for (let n = indexDateStart + 1; n < indexDateEnd; n++) {
            dates[n].classList.add('calendar__date_trip');
          }
        }
        sessionStorage.setItem('fullTripDates', `${dateStart} ${shortMonthName[userMonthStart]} - ${dateEnd} ${shortMonthName[userMonthEnd]}`)
      });
    }
  }
}

function clearChoice() {
  if (indexDateStart) {
    dates[indexDateStart].innerHTML = dateStart;
  }

  if (indexDateEnd) {
    dates[indexDateEnd].innerHTML = dateEnd;
  }

  for (let k = 0; k < dates.length; k++) {
    dates[k].classList.remove('calendar__date_checked');
    dates[k].classList.remove('calendar__date_start');
    dates[k].classList.remove('calendar__date_end');
    dates[k].classList.remove('calendar__date_trip');
  }
  dateStart = '';
  dateEnd = '';
  indexDateStart = 0;
  indexDateEnd = 0;
  userDateStart = 0;
  userMonth = 0;
  userMonthStart = 0;
  userMonthEnd = 0;
  userDateEnd = 0;
  document.querySelector('#trip_start').value = `ДД.ММ.ГГГГ`;
  document.querySelector('#trip_end').value = `ДД.ММ.ГГГГ`;
}

document.querySelector('.calendar__clear').addEventListener('click', (event) => {
  clearChoice();
  dates = [];
  showCalendar(currentMonth, currentYear);
})
//при наведении на дату элемент выделяется ярким первичным градиентом
//при клике на дату бОльшую или равную сегодняшней в текущем месяце и на любые даты в последующих месяцах добавляются классы: полупрозрачный фоновый градиент
//работает выделение дат поездки  в любом месяце, в текущем только начиная с сегодняшней даты
//при клике по кнопке "очистить" работает отмена выделения дней поездки текущего/предыдущего/последующего месяцев
//работает функция очистки и перезаписи массива при переходе к другому месяцу при клике по кнопкам-иконкам "вперёд/назад"
//выделение ярким градиентом дат прибытия и отЪезда (при помощи добавления элемента в ДОМ с наложением поверх)
if (sessionStorage.fullTripDates && document.querySelector('.date-full__dates')) {
  document.querySelector('.date-full__dates').innerHTML = sessionStorage.fullTripDates;
}
