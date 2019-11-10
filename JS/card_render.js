import more_info_render from './more_info_render.js'

export default function card_render(coinObj) {

    const { id, name, symbol } = coinObj;
    const imageUrl = coinObj.image.small;

    let cardContainer =
        makeElement('div', { class: 'card-container col-sm-12 col-md-4 col-lg-4' });
    let card = makeElement('div', { class: 'card' });
    let cardBody = makeElement('div', { class: 'card-body row' });
    //title elements
    let cardTitleContainer = makeElement('div', { class: 'card-title col-12 row' });
    let title = makeElement('h5', { class: 'col-8', id: id, text: symbol.toUpperCase() });
    //switch group elements--also nested in title
    let switchContainer = makeElement('div', { class: 'form-group col-1' });
    let spanSwitch = makeElement('span', { class: 'switch' });
    let switchInput = makeElement('input', { class: 'switch', id: `monitor${id}`, type: 'checkbox' });
    let switchLabel = makeElement('label', { for: `monitor${id}` })

    //cardTitle stiching
    $(spanSwitch)
        .append([$(switchInput), $(switchLabel)]);
    $(switchContainer)
        .append($(spanSwitch));
    $(cardTitleContainer)
        .append([$(title), $(switchContainer)]);

    //card-text elements
    let cardText = makeElement('div', { class: 'card-text col-12 flex-row row card-text-fix' });
    let coinName = makeElement('div', { class: 'col-md-12 col-lg-6', style: 'margin-top:5%;margin-bottom:5%;', text: name });
    let coinImage = makeElement('img', { class: 'hideonsmall offset-1 col-4 d-sm-none d-lg-block', src: imageUrl, alt: `image of ${name}` });

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
        // e.preventDefault();
        collapseOnClick($(this))
        console.log($(this).attr('aria-controls'));
        const id = $(this).attr('data-id');
        const coinDataUrl = `https://api.coingecko.com/api/v3/coins/${id}`
        fetch(coinDataUrl)
            .then(res => res.json())
            .then(coinData => {
                const exchangeRatesUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinData.id}&vs_currencies=USD%2CEUR%2CILS`;
                fetch(exchangeRatesUrl)
                    .then(res => res.json())
                    .then(exchangeData => {
                        //more_info_render
                        return $(`#collapse${coinData.id}`).html(more_info_render(coinData, exchangeData))
                            // console.log("TCL: defaultfunctioncard_render -> more_info_render(coinData, exchangeData)", more_info_render(coinData, exchangeData))
                    })
            })
    });

    //collpase group elements
    let collapse =
        makeElement('div', { class: 'collapse infoPanel col-12 row', id: `collapse${id}` });
    let loaderContainer = makeElement('div', { class: 'row loader' });
    let loaderButton =
        makeElement('div', {
            class: 'col-12 btn btn-block btn-secondary',
            type: 'button',
            disabled: 'disabled'
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

function collapseOnClick(collapseTrigger) {
    /**
     * Manually add collapse on click event.
     * 
     * Because dynamically added Bootstrap collapse elements don't
     * work automatically for me most of the time.
     * 
     * 'data-target' is a selector for the collapsing element as per
     * the Bootstrap documentation. 
     * https://getbootstrap.com/docs/4.3/components/collapse/#via-data-attributes
     *
     * @param {jQuery} collapseTrigger Trigger element for the collapse.
     * 
     */
    var target = collapseTrigger.attr("data-target")
    collapseTrigger.on('click', function() {
        $(target).collapse('toggle')
    })
}