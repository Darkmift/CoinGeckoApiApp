let card = `<div class="card-container col-sm-12 col-md-4 col-lg-4">
<div class="card">
  <div class="card-body">
    <div class="card-title justify-content-between row">
      <h5 class="col-7" id="${coinObj.id}">
        ${coinObj.symbol.toUpperCase()}
      </h5>
      <div class="form-group col-1">
        <span class="switch">
          <input type="checkbox" class="switch" id="switch_${coinObj.symbol}">
          <label for="switch_${coinObj.symbol}"></label>
        </span>
      </div>
      <div class="col-1">&nbsp;</div>
    </div>
    <p class="card-text">${coinObj.name}</p>
    <button class="btn btn-primary card-link">More Info</button>
  </div>
</div>
</div>`;

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