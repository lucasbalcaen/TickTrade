$(function(){
    var activateHamburger = function(event) {



    };
    $('.hamburger').click(function() {

        var el = $(this);
        if (el.hasClass('active')){
            el.addClass('active-end');
            el.one('transitionend', function(){
                el.removeClass('active active-end')
            });
            $('html, body').animate({
                left: "0px"
            }, 200);


            $('.zijmenu').animate({
                left: "-285px"
            }, 200);

        } else {
            el.addClass('active');
            $('html, body').animate({
                left: "285px"
            }, 200);

            $('.zijmenu').animate({
                left: "0px"
            }, 200);
        }



    });




});