import more_info_render from './more_info_render.js'

export default function card_render(coinObj) {

    const { id, name, symbol } = coinObj;
    const imageUrl = coinObj.image.small;

    let cardContainer =
        makeElement('div', { class: 'card-container col-sm-12 col-md-4 col-lg-4', 'data-search-target': coinObj.symbol });
    let card = makeElement('div', { class: 'card' });
    let cardBody = makeElement('div', { class: 'card-body d-flex flex-column' });
    //title elements
    let cardTitleContainer = makeElement('div', { class: 'card-title col-12 row' });
    let title = makeElement('h5', { class: 'col-8', 'data-search-key': symbol, text: symbol.toUpperCase() });
    //switch group elements--also nested in title
    let switchContainer = makeElement('div', { class: 'form-group col-1' });
    let spanSwitch = makeElement('span', { class: 'switch' });
    let switchInput = makeElement('input', { class: 'switch', id: `monitor${id}`, type: 'checkbox', 'data-switch-track': coinObj.symbol });
    let switchLabel = makeElement('label', { for: `monitor${id}` })


    $(switchInput).bind('change', function(e) {
        if (this.checked && $('[data-switch-track]:checked').length > 5) {
            $(this).prop("checked", false);
            $("#limit-alert")
                .show()
                .delay(1500)
                .fadeOut("slow");
            console.log('too many!limit is 5');
        }
    });

    //cardTitle stiching
    $(spanSwitch)
        .append([$(switchInput), $(switchLabel)]);
    $(switchContainer)
        .append($(spanSwitch));
    $(cardTitleContainer)
        .append([$(title), $(switchContainer)]);

    //card-text elements
    let cardText = makeElement('div', { class: 'card-text col-12 flex-row row card-text-fix' });
    let coinName = makeElement('div', { class: 'col-md-12 col-lg-8', style: 'margin-top:5%;margin-bottom:5%;', text: name });
    let coinImage = makeElement('img', { class: 'hideonsmall offset-1 col-3 d-sm-none d-lg-block', src: imageUrl, alt: `image of ${name}` });

    //card text stiching
    $(cardText).append([$(coinName), $(coinImage)]);

    let cardButton = makeElement('button', {
        class: 'btn btn-primary card-link info',
        'data-toggle': 'collapse',
        'data-id': `${id}`,
        'data-target': `#collapse${id}`,
        'aria-expanded': "false",
        'aria-controls': `collapse${id}`,
        'data-crypto-name': `${id}`,
        'style': "margin-left:10px;",
        text: `More info`
    });

    cardButton.click(function(e) {
        const id = $(this).attr('data-id');
        if ($(`#collapse${id}`).find('.card-exists').length === 0) {

            $(`#collapse${id} .loader`).show();
            const coinDataUrl = `https://api.coingecko.com/api/v3/coins/${id}`
            fetch(coinDataUrl)
                .then(res => res.json())
                .then(coinData => {
                    //more_info_render
                    $(`#collapse${id} .loader`).hide();
                    if ($(`#collapse${coinData.id}`).find('.card-exists').length !== 0) {
                        $('.card-exists').remove();
                    }
                    return $(`#collapse${coinData.id}`).append(more_info_render(coinData))
                })
        }

    });

    //collpase group elements
    let collapse =
        makeElement('div', { class: 'collapse infoPanel card-margin-left col-12 row', id: `collapse${id}` });
    let loaderContainer = makeElement('div', { class: 'card-body row loader' });
    let loaderButton =
        makeElement('div', {
            class: 'col-12 btn btn-block btn-secondary',
            type: 'button',
            disabled: 'disabled',
            text: 'fetching data '
        });
    let spanLoader = makeElement('span', {
        class: 'spinner-border spinner-border-sm',
        role: 'status',
        'aria-hidden': 'true'
    });
    //loader stiching
    $(loaderButton)
        .append($(spanLoader));
    $(loaderContainer)
        .append($(loaderButton));
    $(collapse)
        .append($(loaderContainer));

    //put it all together
    $(cardBody)
        .append([
            $(cardTitleContainer),
            $(cardText),
            $(cardButton),
            $(collapse)
        ]);

    $(card)
        .append($(cardBody))
    $(cardContainer)
        .append($(card))

    return $(cardContainer);

}

function makeElement(type, attrObj) {
    return $(`<${type}>`, attrObj)
}