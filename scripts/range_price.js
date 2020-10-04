let thumbMinPrice = document.querySelector('.range-slider__thumb_min-price');
//удаляем текстовый узел между переключателями .thumb чтобы убрать между ними отступ
thumbMinPrice.nextSibling.remove();

let thumbMaxPrice = document.querySelector('.range-slider__thumb_max-price');
//получаем крайние координаты слайдера относительно окна

let minUserPrice = document.querySelector('#min_price');
let maxUserPrice = document.querySelector('#max_price');
let range = document.querySelector('.range-slider__range');
let maxRight = range.getBoundingClientRect().right;
let minRight = range.getBoundingClientRect().left;
let rangeWidth = range.offsetWidth;
let minPrice = 500;
let maxPrice = 15000;
let forkPrice = maxPrice - minPrice;
let rangeValue = document.querySelector('.range-slider__value');
let thumbWidth = thumbMinPrice.offsetWidth;
//округляем цены до сотен 
function roundToHundred(number) {
    return Math.round((number) / 100) * 100;
}

//установка цен при загрузке
function initPrice(shiftMinThumb, shiftMaxThumb) {
    minUserPrice.innerText = minPrice + roundToHundred((forkPrice) / (rangeWidth / shiftMinThumb));

    maxUserPrice.innerText = minPrice + roundToHundred((forkPrice) / (rangeWidth / shiftMaxThumb));
    // console.log(range.getBoundingClientRect());
}

    window.addEventListener("resize", resizeThrottler, false);
  
    let resizeTimeout;
    function resizeThrottler() {
      // обрабатываем событие ресайз с интервалом  в секунду
      if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
         }, 1000);
      }
    }
    
    function actualResizeHandler() {
      // перезаписываем зависимые от размера окна переменные при ресайзе
       maxRight = range.getBoundingClientRect().right;
       minRight = range.getBoundingClientRect().left;
       rangeWidth = range.offsetWidth;
       thumbWidth = thumbMinPrice.offsetWidth;
    }
  
function setStylesRange() {
    initPrice(thumbMinPrice.getBoundingClientRect().left - minRight, thumbMaxPrice.getBoundingClientRect().right - minRight);
    //выставляем левый край выделенной области слайдера через смещение слева направо
    rangeValue.style.left = `${thumbMinPrice.getBoundingClientRect().left - minRight}px`;
    //выставляем ширину выделенной области 
    rangeValue.style.width = `${thumbMaxPrice.getBoundingClientRect().right - thumbMinPrice.getBoundingClientRect().right}px`;
}

setStylesRange();

function setMinUserPrice(thumbMinShift) {
    minUserPrice.innerText = minPrice + roundToHundred((forkPrice) / (rangeWidth / parseInt(thumbMinShift)));
    sessionStorage.setItem('minPrice', minUserPrice.innerText);
}

function setMaxUserPrice(thumbMaxShift) {
    maxUserPrice.innerText = minPrice + roundToHundred((forkPrice) / (rangeWidth / (parseInt(thumbMaxShift) + thumbMaxPrice.offsetWidth * 2)));
    sessionStorage.setItem('maxPrice', maxUserPrice.innerText);
}

//вешаем событие нажатия кнопки на переключатели .thumb 
document.addEventListener('mousedown', (event) => {
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    if (event.target.classList.contains('range-slider__thumb')) {
        //получаем смещение курсора по переключателю
        let shiftX = event.clientX - event.target.getBoundingClientRect().left;

        moveAt(event.pageX);

        //функция смещения изменяет позиционирование
        function moveAt(pageX) {
            if (pageX >= minRight + shiftX && pageX <= thumbMaxPrice.getBoundingClientRect().left) {
                if (event.target.classList.contains('range-slider__thumb_min-price')) {
                    event.target.style.left = pageX - minRight - shiftX + 'px';
                    //изменяем смещение выделенного слайдера по левому краю
                    rangeValue.style.left = `${pageX - minRight}px`;
                    //изменяем ширину выделенного слайдера
                    rangeValue.style.width = `${thumbMaxPrice.getBoundingClientRect().left - thumbMinPrice.getBoundingClientRect().right + thumbWidth}px`;
                    setMinUserPrice(event.target.style.left);
                }
            } else if (pageX >= thumbMinPrice.getBoundingClientRect().right && pageX <= maxRight - event.target.offsetWidth + shiftX) {
                if (event.target.classList.contains('range-slider__thumb_max-price')) {
                    //для второго переключателя отнимаем смещение по горизонтали равоное ширине первого
                    event.target.style.left = pageX - minRight - shiftX - thumbMinPrice.offsetWidth + 'px';
                    //изменяем ширину выделенного слайдера
                    rangeValue.style.width = `${pageX - thumbMinPrice.getBoundingClientRect().right + thumbWidth}px`;
                    setMaxUserPrice(event.target.style.left);
                }
            }
        }

        function onMouseMove(event) {
            moveAt(event.pageX);
        }

        document.addEventListener('mousemove', onMouseMove);

        event.target.onmouseup = function (event) {
            document.removeEventListener('mousemove', onMouseMove);
            event.target.onmouseup = null;
        };
    }
})
//отменяем событие "захват элемента" по умолчанию
document.addEventListener('dragstart', (event) => {
    if (event.target.classList.contains('range-slider__thumb')) {
        event.preventDefault();
    }
})

