import init_Display from './JS/init_Display.js'
// import db_handler from './JS/db_handler.js'

//set up cache for offline use
if ('serviceWorker' in navigator) {
    console.log('service available')
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw_pages_cache.js')
            .then(registration => console.info('🌞 Service worker registration succeeded:', registration))
            .catch(err => console.error('Service worker registration failed:', err))
    })
} else {
    console.log('Service workers are not supported.....😞');
}

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

    //live reports click on navbar opens modal if has 5
    $('#modalLink').click(e => {
        if ($('[data-switch-track]:checked').length < 5) {
            alert('please select 5 coins to track');
        } else {
            $('#reportsLink').show();
            $('#trackedCoinsModal')
                .modal('show');
        }
    });

    $('#reportsLink').click(e => {
        if ($('#tracked_content [data-switch-id]:checked').length < 5) {
            return alert('please select 5 coins to track');
        }
        //go to reports
        console.log('dafuq')
        $('#cardContainer').addClass('hide-this');
    });


    $('#trackedCoinsModal [data-dismiss]').click(e => {
        $('#cardContainer').removeClass('hide-this');
    })


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