let modal = $("#gameWindow");
let content = $(".modal-content");


$("#launch").click(function () {

    $.get(`/SoftGames/img/games/${slideIndex}.html`, function (data) {
        content.append(data);
    });

    modal.css("display", "block");

});

$(".close").click(close);

function close(){
    content.children().detach();
    modal.css("display", "none");
}


