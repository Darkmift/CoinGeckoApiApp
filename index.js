import card_render from './JS/card_render.js'

//toggle active css
$('.navbar-nav .nav-link').click(function() {
    $('.navbar-nav .nav-link').removeClass('active');
    $(this).addClass('active');
})

//fix css for hamburger menu
$(window).resize(function() {
    if ($(window).width() > 990) {
        $(".nav-link,.searchbar")
            .removeClass('nav-item-small bg-dark')
            .css('margin:0;')
    }
});

$(".navbar-toggler-icon").click(function() {
    if ($(window).width() < 990) {
        $(".nav-link,.searchbar")
            .addClass('nav-item-small bg-dark')
    }
});
//fix css for hamburger menu -end



//url to fetch all coin data
const coinListUrl = 'https://api.coingecko.com/api/v3/coins';
$('.loader').show();
fetch(coinListUrl)
    .then((resp) => resp.json())
    .then(function(data) {
        //populate cardContainer with cards
        let cardContainer = $('#cardContainer');
        $.each(data, function(index, coinObj) {
            console.log("TCL: coinObj", coinObj)
            $($('#cardContainer')).append(card_render(coinObj));
        });
        $('.loader').hide();
    })
    .catch(function(error) {
        console.log(JSON.stringify(error));
    });

// async function fetchCoinData(url) {
//     const response = await fetch(url);
//     let coinData = await response.json();
//     console.log("TCL: fetchCoinData -> coinData", coinData)
// }