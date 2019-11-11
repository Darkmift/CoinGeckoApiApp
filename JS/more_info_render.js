export default function more_info_render(coinObj) {
    const exchangeRates = coinObj.market_data.current_price;
    const imageUrl = coinObj.image.small;
    return `<div class="card-exists card d-flex flex-row col-12" style="border:none;padding:8px 0 2px 0 !important;">
    <img class="col-4 .d-none .d-sm-block"
      src="${coinObj.image.small}"
      alt="bitcoin_img_thumbnail">
    <ul class="pricesUl offset-1 col-lg-7" style="margin-top:10px;list-style: none;">
      <li>
        <span>$: <span class="price">${ format(exchangeRates.usd)}</span></span>
      </li>
      <li>
        <span>₠: <span class="price">${ format(exchangeRates.eur)}</span></span>
      </li>
      <li>
        <span>₪: <span class="price">${ format(exchangeRates.ils)}</span></span>
      </li>
    </ul>
    </div>`;

}

function format(n, sep, decimals) {
    sep = sep || "."; // Default to period as decimal separator
    decimals = decimals || 2; // Default to 2 decimals

    return n.toLocaleString().split(sep)[0] +
        sep +
        n.toFixed(decimals).split(sep)[1];
}