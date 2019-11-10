export default function more_info_render(coinObj, exchangeRates) {
    exchangeRates = exchangeRates[Object.keys(exchangeRates)[0]];
    const coinId = coinObj.id;
    return `<div class="card card-body flex-row justify-content-center">
    <img class="img-thumbnail thumb col-4"
      src="${coinObj.image.thumb}"
      alt="bitcoin_img_thumbnail">
    <ul class="offset-1 col-6" style="margin-top:10px;list-style: none;">
      <li>
        <span>USD:$${exchangeRates.usd}</span>
      </li>
      <li>
        <span>EUR:₠${exchangeRates.eur}</span>
      </li>
      <li>
        <span>ILS:₪${exchangeRates.ils}</span>
      </li>
    </ul>
    </div>`;

}