
//----------LIKE-start-OK---------
let allLikeBtns = document.querySelectorAll('.like');

for (let i = 0; i < allLikeBtns.length; i++) {
    allLikeBtns[i].children[0].onchange = function () {
        let like = allLikeBtns[i];
        let likeValue = +like.children[2].innerHTML;
        let heart = allLikeBtns[i].children[1].firstElementChild;
        like.classList.toggle('like_default');
        like.classList.toggle('like_active');
        heart.classList.toggle('icon-heart-empty');
        heart.classList.toggle('icon-heart');
        if (allLikeBtns[i].children[0].checked) {
            like.children[2].innerHTML = ++likeValue;
        } else {
            like.children[2].innerHTML = --likeValue;
        }
    }
}
//----LIKE-end-OK-----------------