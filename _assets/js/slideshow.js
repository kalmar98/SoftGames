let slideIndex = 1;

const maxGamesNumber = 2; //reflection could be a far better choice, but I am aiming for simplicity

function addSlide(n) {

    slideIndex += n
    this.showSlide();
}

function showSlide() {

    let path = $('#gamesContainer');

    this.validateSlide();

    let bgImage = path.css('background-image', `url(/SoftGames/img/games/${slideIndex}.jpg)`);

}

function validateSlide() {
    if (slideIndex > maxGamesNumber) {
        slideIndex = 1;
    }
    else if (slideIndex < 1) {
        slideIndex = maxGamesNumber;
    }
}




//bgImage = `url("/img/${slideIndex}.jpg")`