export default function track_card_render(coinObj) {

    const { symbol, name, id, image } = coinObj;
    const image_url = image.small;

    let card = `          
  <div class="card-container col-12">
    <div class="card">
      <div class="card-body row" style="padding-bottom:0px;">
  
        <div class="card-title d-flex align-items-center col-12 row">
  
          <img class="col-3" style="background-color:#fff;"
            src="${image_url}"
            alt="image of  ${name}">
  
          <h5 class="col-6">${symbol.toUpperCase()}</h5>
  
          <div class="form-group col-1" style="margin:5px 0 0 0;">
            <span class="switch">
              <input class="switch" id="track_monitor${id}" type="checkbox" data-switch-id="${symbol.toUpperCase()}">
              <label for="track_monitor${id}"></label>
            </span>
          </div>
  
        </div>
  
      </div>
    </div>
  </div>`;
    return $(card);

}