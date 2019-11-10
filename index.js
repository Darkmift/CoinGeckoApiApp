import card_render from './JS/card_render.js'
import more_info_render from './JS/more_info_render.js'

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

//url to fetch all coin data
const coinListUrl = 'https://api.coingecko.com/api/v3/coins';
$('.loader').show();
fetch(coinListUrl)
    .then((resp) => resp.json())
    .then(function(data) {
        //populate cardContainer with cards
        $.each(data, function(index, coinObj) {
            let card = card_render(coinObj);
            $('#cardContainer')
                .append(card);
        });
        $('.loader').hide();
    })
    .catch(function(error) {
        console.log(error);
    });

$(document).ready(function() {
    $(".searchButton").on("click", e => filterSearch());
    $(".searchInput").on("click touchend mouseup mousedown keypress  paste keyup change blur", e => filterSearch());

});

function filterSearch() {
    if ($('.searchInput').val().length) {
        var value = $('.searchInput').val().toLowerCase();
        $("[data-search-target]").filter(function() {
            $(this).toggle($(this).attr('data-search-target').toLowerCase().toLowerCase().indexOf(value) > -1)
        });
        return;
    }
    $("[data-search-target]").show();
}