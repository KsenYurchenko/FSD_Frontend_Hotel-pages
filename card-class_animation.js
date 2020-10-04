
let levels = {
    "economy": "эконом",
    "standard": "стандарт",
    "comfort": "комфорт",
    "luxury": "люкс"
}

let roomTemplate = document.querySelector('#room');//получаем шаблон карточки комнаты с пустыми полями
let roomCardContainer = document.querySelector('.cards__wrapper');//получаем контейнер для карточек
//---------------------------------------------
class Room {
    constructor(number, price, level, photos, rating, comments) {
        this.number = number;
        this.price = price;
        this.level = level;
        this.photos = photos;
        this.rating = rating;
        this.comments = comments;
    }

    createCard() {
        roomCardContainer.insertAdjacentHTML('beforeend', roomTemplate.outerHTML);//вставляем в конец контейнера новый шаблон карточки 
        roomCardContainer.lastChild.id = `room_${this.number}`;//меняем id новой карточки на уникальный, соответствующий номеру комнаты
    }

    setCurrentCard() {
        this.currentCard = roomCardContainer.lastElementChild;//получаем HTML-элемент новой карточки, через него будут заполняться пустые поля
    }

    setNumber() {
        this.currentCard.children[1].children[0].children[0].children[0].innerHTML = `№ ${this.number}`;//устанавливаем номер комнаты
    }

    setPrice() {
        if (this.price.toString().length >= 3) {
            //если ценник четырёхзначный, то добавляем пробел  после тысяч
            let size = this.price.toString().length;
            let thousands = this.price.toString().split('').slice(0, size - 3).join('');
            let units = this.price.toString().split('').slice(-3).join('');
            this.currentCard.children[1].children[0].children[1].children[0].innerHTML = `${thousands} ${units}₽&nbsp`;//устанавливаем цену
        } else {
            this.currentCard.children[1].children[0].children[1].children[0].innerHTML = `${this.price}₽&nbsp`;//устанавливаем цену
        }
    }

    setLevel() {
        this.currentCard.children[1].children[0].children[0].children[1].innerHTML = levels[this.level];//устанавливаем уровень
    }

    setSwitchers() {
        this.switchers = this.currentCard.children[0].children[0].children[2];//получаем все переключатели switchers
    }

    setPhoto() {
        this.currentCard.children[0].children[0].style.backgroundImage = `url('` + `img/room_${this.number}_1.png` + `')`;//устанавливаем первое фото
        this.switchers.children[0].style.backgroundColor = "white"; //помечаем первый switcher белым 
    }

    showNextPhoto() {
        if (this.currentPhoto == 4) {
            this.currentPhoto = 0;
        }//если фото последнее, то переходим к первому
        this.currentCard.children[0].children[0].style.backgroundImage = `url('` + `img/room_${this.number}_${++this.currentPhoto}.png` + `')`;//меняем фото на следующее

        let currentSwitcher = this.currentPhoto - 1;//получаем номер круглого переключателя
        this.switchers.children[currentSwitcher].style.backgroundColor = "white";//выбираем и отмечаем текущий switcher 
        if (currentSwitcher > 0) {
            this.switchers.children[`${currentSwitcher - 1}`].style.backgroundColor = "transparent";
        } else {
            this.switchers.children[3].style.backgroundColor = "transparent";
        }
        //делаем прозрачным предыдущий switcher
    }

    showPrewPhoto() {
        if (this.currentPhoto == 1) {
            this.currentPhoto = 5;
        }//если фото первое, то переходим к последнему
        this.currentCard.children[0].children[0].style.backgroundImage = `url('` + `img/room_${this.number}_${--this.currentPhoto}.png` + `')`;//меняем фото на предыдущее

        let currentSwitcher = this.currentPhoto - 1;//получаем круглый переключатель switcher  
        this.switchers.children[currentSwitcher].style.backgroundColor = "white";//выбираем и отмечаем текущий switcher
        if (currentSwitcher < 3) {
            this.switchers.children[`${currentSwitcher + 1}`].style.backgroundColor = "transparent";
        } else {
            this.switchers.children[0].style.backgroundColor = "transparent";
        }
        //делаем прозрачным следующий switchers
    }

    setRating() {
        //устанавливаем рейтинг - красим звёздочки по баллах в рейтинге
        let stars = this.currentCard.children[1].children[2].children[0].children[0].children;
        for (let i = 0; i < this.rating; i++) {
            stars[i].children[0].classList.remove('icon-star-empty');
            stars[i].children[0].classList.add('icon-star');
        }
    }

    setComment() {
        //устанавливаем количество комментариев
        this.currentCard.children[1].children[2].children[1].children[0].innerHTML = `${this.comments.length}&nbsp`;
    }
}

function addCardToHtml(room_number) {
    room_number.currentPhoto = 1;
    room_number.createCard();
    room_number.setCurrentCard();
    room_number.setNumber();
    room_number.setPrice();
    room_number.setLevel();
    room_number.setSwitchers();
    room_number.setPhoto();
    room_number.setRating();
    room_number.setComment();
    room_number.currentCard.children[0].children[0].children[0].onclick = room_number.showNextPhoto.bind(room_number);
    room_number.currentCard.children[0].children[0].children[1].onclick = room_number.showPrewPhoto.bind(room_number);
}

let room_330 = new Room(330, 1440, "economy", ["room_330_1.png", "room_330_2", "room_330_3", "room_330_4"], 3, ["a", "b", "c", "d", 'e', "f", "c", 'g', 'j', 'k']);

addCardToHtml(room_330);

let room_403 = new Room(403, 5050, "comfort", ["room_403_1.png", "room_403_2", "room_403_3", "room_403_4"], 5, ["a", "b", "c", 'g', 'j']);

addCardToHtml(room_403);

let room_503 = new Room(503, 9900, "luxury", ["room_503_1.png", "room_503_2", "room_503_3", "room_503_4"], 4, ["a", "b", "c", "a", "b", "c", "d", 'e', "f", "a", "b", "c", "d", 'e', "f"]);

addCardToHtml(room_503);

let room_203 = new Room(203, 1440, "economy", ["room_203_1.png", "room_203_2", "room_203_3", "room_203_4"], 3, ["a", "b", "c", "d", 'e', "f", "c", 'g', 'j', 'k']);

addCardToHtml(room_203);

let room_230 = new Room(230, 5500, "comfort", ["room_230_1.png", "room_230_2", "room_230_3", "room_230_4"], 5, ["a", "b", "c", 'g', 'j']);

addCardToHtml(room_230);

let room_605 = new Room(605, 1700, "economy", ["room_605_1.png", "room_605_2", "room_605_3", "room_605_4"], 3, ["a", "b", "c", "d", 'e', "f", "c", 'g', 'j', 'k']);

addCardToHtml(room_605);

let room_507 = new Room(507, 1700, "economy", ["room_507_1.png", "room_507_2", "room_507_3", "room_507_4"], 3, ["a", "b", "c", "d", 'e', "f", "c", 'g', 'j', 'k']);

addCardToHtml(room_507);//-----------------------------------------

let room_703 = new Room(703, 1440, "economy", ["room_330_1.png", "room_330_2", "room_330_3", "room_330_4"], 3, ["a", "b", "c", "d", 'e', "f", "c", 'g', 'j', 'k']);

addCardToHtml(room_703);

let room_803 = new Room(803, 5050, "comfort", ["room_403_1.png", "room_403_2", "room_403_3", "room_403_4"], 5, ["a", "b", "c", 'g', 'j']);

addCardToHtml(room_803);

let room_903 = new Room(903, 9900, "luxury", ["room_503_1.png", "room_503_2", "room_503_3", "room_503_4"], 4, ["a", "b", "c", "a", "b", "c", "d", 'e', "f", "a", "b", "c", "d", 'e', "f"]);

addCardToHtml(room_903);

let room_103 = new Room(103, 1440, "economy", ["room_203_1.png", "room_203_2", "room_203_3", "room_203_4"], 3, ["a", "b", "c", "d", 'e', "f", "c", 'g', 'j', 'k']);

addCardToHtml(room_103);

let room_560 = new Room(560, 5500, "comfort", ["room_230_1.png", "room_230_2", "room_230_3", "room_230_4"], 5, ["a", "b", "c", 'g', 'j']);

addCardToHtml(room_560);

roomTemplate.style.display = 'none';//скрываем шаблонную карточку после заполнения всех карточек(но лучше удалить элемент или создать в скрипте переменную с Html-кодом без добавления его в Html файл и на страницу)
//--------------------
