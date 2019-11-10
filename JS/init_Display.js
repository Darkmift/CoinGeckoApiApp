import card_render from './card_render.js'

export default function init_Display() {
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
}