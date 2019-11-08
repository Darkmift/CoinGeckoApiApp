//toggle active css
$('.navbar-nav .nav-link').click(function() {
    $('.navbar-nav .nav-link').removeClass('active');
    $(this).addClass('active');
})

//fix css for hamburger menu
$(window).resize(function() {
    windowsize = $(window).width();
    if (windowsize > 990) {
        $(".nav-link,.searchbar")
            .removeClass('nav-item-small bg-dark')
            .css('margin:0;')
    }
});

$(".navbar-toggler-icon").click(function() {
    windowsize = $(window).width();
    if (windowsize < 990) {
        $(".nav-link,.searchbar")
            .addClass('nav-item-small bg-dark')
    }
});
//fix css for hamburger menu -end