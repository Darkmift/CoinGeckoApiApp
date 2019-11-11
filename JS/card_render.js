export default function card_render(coinObj) {

    const { symbol, name, id, image } = coinObj;
    const image_url = image.small;

    let card = `
    <div class="card-container col-sm-12 col-md-6 col-lg-4" data-search-target="${symbol}">
        <div class="card">

            <div class="card-body d-flex flex-column">
                <div class="card-title col-12 row">
                    <h5 class="col-9" data-search-key="${symbol}">${symbol.toUpperCase()}</h5>
                    <div class="form-group col-1">
                        <span class="switch">
                            <input class="switch" id="monitor${id}" type="checkbox" data-switch-track="${symbol}">
                            <label for="monitor${id}"></label>
                        </span>
                    </div>
                </div>

                <div class="card-text col-12 flex-row row card-text-fix">
                    <div class="col-8" style="margin-top:5%;margin-bottom:5%;">${name}</div>
                    <img class="hideonsmall offset-1 col-3" src="${image_url}" alt="image of ${name}">
                </div>

                <div class="card card-decor" >
                    <h5 class="card-header custom-card-header-decor">
                        <a class="more-info row justify-content-between" 
                            data-toggle="collapse" 
                            data-id="${id}" 
                            data-target="#collapse${id}"
                            aria-expanded="false"
                            aria-controls="collapse${id}"
                            id="heading-${id}"
                        style="font-size: 18px;">
                        <span>More info</span>
                        <i class="fa fa-chevron-down pull-right" style="margin-top:3px;"></i>
                        </a>
                    </h5>
                    <div class="collapse infoPanel card-margin-left col-12 row" id="collapse${id}" aria-labelledby="heading-${id}">
                        <!-- loader -->
                        <div class="card-body row loader">
                            <div class="col-12 btn btn-block btn-secondary" type="button" disabled="disabled">
                                fetching data
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </div>
                        </div>
                        <!-- loader end -->
                    </div>
                </div>
            </div>
        </div>
    </div>`

    return $(card);

}