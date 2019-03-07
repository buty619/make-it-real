$(".buttom").on("click",function(){    
    $(this).addClass("hide");
    $(this).next("div").removeClass("hide");
    $(this).before("<input type=\"text\" class=\"card\"></input>")
})
$(".fa-times").on("click", function(){
    $(this).parent().parent().prev().prev().remove();
    $(this).parent().parent().prev().removeClass("hide");
    $(this).parent().parent().addClass("hide");
})
