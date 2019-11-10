export default function more_info_render(coinObj, exchangeRates) {
    exchangeRates = exchangeRates[Object.keys(exchangeRates)[0]];
    const coinId = coinObj.id;
    return `<div class="card-exists card d-flex flex-row col-12" style="padding:8px 0 2px 0 !important;">
    <img class="d-none d-lg-block thumb col-md-12 col-lg-4"
      src="${coinObj.image.small}"
      alt="bitcoin_img_thumbnail">
    <ul class="pricesUl offset-1 col-md-12 col-lg-8" style="margin-top:10px;list-style: none;">
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