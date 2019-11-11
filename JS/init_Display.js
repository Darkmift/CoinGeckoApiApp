import card_render from './card_render.js'
import more_info_render from './more_info_render.js'

export default async function init_Display() {
    //url to fetch all coin data
    const coinListUrl = 'https://api.coingecko.com/api/v3/coins';
    $('.loader').show();

    try {
        let response = await fetch(coinListUrl);
        let data = await response.json();

        //populate cardContainer with cards
        $.each(data, async(index, coinObj) => {
            let card = await card_render(coinObj);

            //bind 'more info' function
            $(card)
                .find('.more-info')
                .bind('click', async function(e) {

                    //fetch id of collapse elemnt
                    const id = `#collapse${$(this).attr('data-id')}`;

                    if ($(id).find('.card-exists').length === 0) {
                        $(id).find('.loader').show();
                        try {
                            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${$(this).attr('data-id')}`);
                            const coinData = await response.json();

                            if ($(id).find('.card-exists').length !== 0) {
                                $('.card-exists').remove();
                            }

                            $(id).append(more_info_render(coinData)),
                                $(id).find('.loader').hide();

                        } catch (error) {
                            console.log("TCL: defaultfunctioninit_Display -> error", error)
                        }
                    }
                });

            //bind switch function
            $(card)
                .find('[data-switch-track]')
                .bind('change', async function(e) {
                    if (this.checked && $('[data-switch-track]:checked').length > 5) {
                        $(this).prop("checked", false);

                        $('#trackedCoins')
                            .modal('show')
                        console.log('too many!limit is 5');
                    }
                });

            $('#cardContainer')
                .append(card);
        });

        $('.loader').hide();

    } catch (err) {
        console.error(err);
    }

}