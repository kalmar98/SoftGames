let modal = $("#gameWindow");
let content = $(".modal-content");


$("#launch").click(function () {

    $.get(`/views/games/${slideIndex}.html`, function (data) {
        content.append(data);
    });

    modal.css("display", "block");

});

$(".close").click(close);

function close(){
    content.children().detach();
    modal.css("display", "none");
}


