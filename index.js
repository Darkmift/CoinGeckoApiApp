import init_Display from './JS/init_Display.js'


$(document).ready(function() {

    //fetch all card data
    init_Display();

    //toggle active css
    $('.navbar-nav .nav-link').click(function() {
        $('.navbar-nav .nav-link').removeClass('active');
        $(this).addClass('active');
    })

    /*fix css for hamburger menu/exchange info
     */
    $(window).resize(function() {
        if ($(window).width() > 990) {
            $(".nav-link,.searchbar")
                .removeClass('nav-item-small bg-dark')
                .css('margin:0;');
        }
    });

    $(".navbar-toggler-icon").click(function() {
        if ($(window).width() < 990) {
            $(".nav-link,.searchbar")
                .addClass('nav-item-small bg-dark');
        }
    });
    /*
     *fix css for hamburger menu -end*/

    //search bar functionality
    $(".searchButton").on("click", e => filterSearch());
    $(".searchInput").on("click touchend mouseup mousedown keypress  paste keyup change blur", e => filterSearch());

    //show tracked/checked cards
    $('#tracked_coins').click(function() {
        if (this.checked) {
            const tracked = $('[data-switch-track]:checked');
            if (tracked.length) {
                $('.card-container').hide()
                tracked.closest('.card-container').show();
            }
        } else {
            $('.card-container').show()
        }
    });

});

function filterSearch() {
    if ($('.searchInput').val().length >= 3) {
        var value = $('.searchInput').val().toLowerCase();
        $("[data-search-target]").filter(function() {
            $(this).toggle($(this).attr('data-search-target').toLowerCase().toLowerCase().indexOf(value) > -1)
        });
        return;
    }
    $("[data-search-target]").show();
}