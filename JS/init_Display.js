import card_render from './card_render.js'
import track_card_render from './track_card_render.js'
import db_handler from './db_handler.js'

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


                    if (!$(id).hasClass("show")) {

                        $(id).find('.loader').show();
                        //// accesing indexedDB for data to append to collapse element
                        const db = new db_handler();
                        const coinID = $(this).attr('data-id');
                        db.openDB();
                        db.getData(id, coinID);
                        ////
                    }
                });

            //bind switch function
            $(card)
                .find('[data-switch-track]')
                .bind('change', async function(e) {
                    if (this.checked && $('[data-switch-track]:checked').length === 5) {

                        const elements = [];
                        $('[data-switch-track]:checked').each(async function(index, element) {
                            // element == th       
                            const id = $(this).attr('data-switch-id');
                            console.log(id);

                            const awaitElement = new Promise(async(resolve, reject) => {
                                try {
                                    let resp = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
                                    let coinObj = await resp.json();

                                    const awaitedtrackCard = track_card_render(coinObj);

                                    $(awaitedtrackCard).find(`#track_monitor${id}`).prop('checked', true);
                                    $(awaitedtrackCard).find(`#track_monitor${id}`).bind('click', function(e) {
                                        const target = $(`[data-switch-id="${id}"]`);
                                        this.checked ? target.prop('checked', true) : target.prop('checked', false);
                                    });

                                    resolve(awaitedtrackCard)
                                } catch (err) {
                                    reject(console.error('setData fetch error: ', err));
                                }
                            })

                            elements.push(awaitElement);

                        });
                        try {
                            const results = await Promise.all(elements);
                            $('#tracked_content').empty();
                            $('#tracked_content').append(results)
                            console.log("TCL: defaultfunctioninit_Display -> results", results);
                        } catch (err) {
                            console.error('setData fetch error: ', err);
                        }
                        $('#trackedCoinsModal')
                            .modal('show');
                        return;
                    }
                    if (this.checked && $('[data-switch-track]:checked').length > 5) {
                        $(this).prop('checked', false);
                        // alert('only 5 can be tracked');
                        $('#trackedCoinsModal')
                            .modal('show');
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