//------dropdown__options-counter-start----------
function dropdownCount(dropdownMenu) {
    let arrOptions = dropdownMenu.children;
    let count = 0;//счётчик для ограничения перебираемых детей в массиве до 3х, т.к. в dropdown_big два последних ребёнка не содержат счётчики
    for (let option of arrOptions) {
      if (count < 3) {
        let value = +option.children[1].children[1].innerHTML;//number
        let decrease = option.children[1].children[0];//-
        let increase = option.children[1].children[2];//+
        let minValue = 0; //огранчение на минимум 1 спальню/кровать/ванную
        let maxValue = 20; //огранчение на максимум 20 спальню/кровать/ванную
  
        function checkClassList() {
          value = +option.children[1].children[1].innerHTML;
          if (value === minValue && !decrease.classList.contains("default")) {
            decrease.classList.add("default");
            decrease.classList.remove("active");
          } else if (value > minValue && !decrease.classList.contains("active")) {
            decrease.classList.add("active");
            decrease.classList.remove("default");
          }
        }
  
        decrease.onclick = function () {
          value = +option.children[1].children[1].innerHTML;
          if (value > minValue) {
            option.children[1].children[1].innerHTML = --value;
            adult = +document.querySelector("#adult_value").innerHTML;
            children = +document.querySelector("#children_value").innerHTML;
            babies = +document.querySelector("#babies_value").innerHTML;
            if (adult == 0 && children == 0 && babies == 0) {
              guestsClear.classList.add('hidden');
            }
            checkClassList();
          }
        };
  
        increase.onclick = function () {
          value = +option.children[1].children[1].innerHTML;
          if (value < maxValue) {
            option.children[1].children[1].innerHTML = ++value;
            if (guestsClear.classList.contains('hidden')) {
              guestsClear.classList.remove('hidden');
              console.log(children);
            }
            checkClassList();
          }
        };
      }
      count++;
    }
  }
  //------dropdown__options-counter-end----------