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

export default function more_info_render(coinObj, exchangeRates) {
    exchangeRates = exchangeRates[Object.keys(exchangeRates)[0]];
    const coinId = coinObj.id;
    return `<div class="collapse infoPanel" id="collapse_${coinId}">
    <div class="card card-body row">
        <span class="offset-2 col-4">
            <img src="${coinObj.image.thumb}" alt="${coinId}_img_thumbnail">
        </span>
            <ul class="list-inline col-6">
                <li class="list-inline-item">
                    <span>USD:&#36;${exchangeRates.usd}</span>
                    <span>EUR:&#8352;${exchangeRates.eur}</span>
                    <span>ILS:&#8362;${exchangeRates.usd}</span>
                </li>
            </ul>
        </div>
    </div>`;

}

export default function card_render(coinObj) {
    return `
<div class="card-container col-sm-12 col-md-4 col-lg-4">
  <div class="card">
    <div class="card-body row">
      <div class="card-title col-12 row">
        <h5 class="col-8" id="${coinObj.symbol}">
        ${coinObj.symbol.toUpperCase()}
        </h5>
        <!-- switch large  -->
          <div class="form-group col-1">
            <span class="switch">
              <input type="checkbox" class="switch monitor" id="monitor${coinObj.id}">
              <label for="monitor${coinObj.id}"></label>
            </span>
          </div>
        <!-- switch large END  -->
      </div>

      <div class="card-text col-12 flex-row row card-text-fix">
        <div class="col-md-12 col-lg-6" style="margin-top:5%;margin-bottom:5%;">${coinObj.name}</div>
        <img class="hideonsmall offset-1 col-4 d-sm-none d-lg-block"
          src="${coinObj.image.small}" alt="${coinObj.id}_img_small">
      </div>

      <button class="btn btn-primary card-link info" 
      data-toggle="collapse"
      data-target="#collapse${coinObj.id}"
      aria-expanded="false"
      aria-controls="collapse${coinObj.id}"
      data-crypto-name="${coinObj.id}" 
      style="margin-left:10px;">More Info</button>
      <div class="collapse infoPanel col-12 row" id="collapse${coinObj.id}">
        <div class="col-12 row loader">
          <button class="col-12 btn btn-block btn-secondary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
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

let old_card_render_snippet = html `<button class="btn btn-primary card-link more-info" data-toggle="collapse" data-id="${id}" data-target="#collapse${id}"
aria-expanded="false" aria-controls="collapse${id}" style="margin-left:10px;">
More info
</button>
<div class="collapse infoPanel card-margin-left col-12 row" id="old_collapse${id}">
<div class="card-body row loader">
    <div class="col-12 btn btn-block btn-secondary" type="button" disabled="disabled">
        fetching data
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    </div>
</div>
</div>`

//init_display
$(card)
    .find('.more-info')
    .bind('click', async function(e) {

        const id = `collapse${$(this).attr('data-id')}`;
        if ($(`#${id}`).find('.card-exists').length === 0) {
            $(`#${id} .loader`).show();

            fetch(`https://api.coingecko.com/api/v3/coins/${$(this).attr('data-id')}`)
                .then(res => res.json())
                .then(coinData => {
                    //more_info_render
                    if ($(`#${id}`).find('.card-exists').length !== 0) {
                        $('.card-exists').remove();
                        console.log("TCL: defaultfunctioninit_Display -> id", id)
                    }

                    $(`#${id}`).append(more_info_render(coinData))
                    $(`#${id} .loader`).hide();
                });
        }
    });

//init display->click collpase

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

//db_handler ->method in class

// addData(coinID) {
//     this._db[this._objectStoreTitle]
//         .add({
//             id: coinID,
//             timeStamp: Date.now()
//         }, coinID.id)
//         .then(coinID => { console.info('coinInfo:', coinID) })
//         .catch(err => {
//             console.info('error adding key:', err.message, err)
//             this.setData(coinID);

//         })
// }