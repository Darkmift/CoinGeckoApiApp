function card_render(coinObj) {
    let container = $('<div>', { class: 'card-container col-sm-12 col-md-4 col-lg-4' });
    let card = $('<div>', { class: 'card' });
    let card_body = $('<div>', { class: 'card-body' });
    let card_title = $('<div>', { class: 'card-title justify-content-between row' });
    let coin_title = $('<h5>', {
        class: 'col-7',
        id: coinObj.id
    });

}