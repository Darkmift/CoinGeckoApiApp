export default function card_render(coinObj) {
    return `<div class="card-container col-sm-12 col-md-4 col-lg-4">
<div class="card">
  <div class="card-body row">
    <div class="card-title col-12 row">
      <h5 class="col-8" id="${coinObj.symbol}">
      ${coinObj.symbol.toUpperCase()}
      </h5>
      <!-- switch large  -->
      <div class="form-group col-1">
        <span class="switch">
          <input type="checkbox" class="switch monitor" id="monitor_${coinObj.id}">
          <label for="monitor_${coinObj.id}"></label>
        </span>
      </div>
      <!-- switch large END  -->
    </div>
    <div class="card-text col-12 flex-row row" style="width:100%;padding-bottom: 10px;">
      <div class="col-md-12 col-lg-6" style="margin-top:5%;margin-bottom:5%;">${coinObj.name}</div>
      <img class="hideonsmall offset-1 col-4 d-sm-none d-lg-block"
        src="${coinObj.image.small}" alt="${coinObj.id}_img_small">
    </div>

    <button class="btn btn-primary card-link info" id="info_${coinObj.id}" style="margin-left:10px;">More Info</button>
  </div>
</div>
</div>`;
}