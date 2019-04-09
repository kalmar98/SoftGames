let modal = $("#gameWindow");
let content = $(".modal-content");


$("#launch").click(function () {

    $.get(`/views/games/${slideIndex}.html`, function(data){
        content.append(data);
    });

    modal.css("display", "block");

});

$(".close").click(function () {

    content.children().detach();

    modal.css("display", "none");

});


