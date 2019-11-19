export default class Graph_Render {
    // static _self = this;
    constructor(elemendID, currencyName, coinIdArray) {
        this.elemendID = elemendID;
        this.currencyName = currencyName;

        this.dataSet = [];
        this.coinIdArray = coinIdArray;

        // Initial Values
        this.xValue = new Date();
        this.yValue = 0;
        this.newDataCount = 6;
        this.options = {
            theme: "light2",
            title: {
                text: `Live Data Exchange Rates: ${currencyName}`
            },
            xValueFormatString: "hh:mm:ss tt",
            data: this.dataSet
        };
    }

    dataObjBuilder() {
        this.coinIdArray.forEach(coinName => {
            let datapoints = [];
            this.dataSet.push({
                type: "line",
                dataPoints: datapoints,
                showInLegend: true,
                name: coinName
            })
        })
    }

    createUrl() {
        const coinList = this.coinIdArray.reduce(function(prevVal, currVal, idx) {
            return idx == 0 ? currVal : prevVal + ', ' + currVal;
        }, '').replace(/\s/g, '');
        return `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinList}&tsyms=${this.currencyName}`;
    }

    updateData() {
        const self = this;
        const url = self.createUrl();
        // console.log("TCL: Graph_Render -> updateData -> url", url)
        $.ajax({
            type: "GET",
            url: url,
            success: function(response) {
                self.addData(response, self)
            }
        });
    }

    addData(data, instance) {
        // console.log(instance.newDataCount)

        if (instance.newDataCount != 1) {
            //each crypto iteration
            $.each(data, function(key, value) {
                $.each(instance.dataSet, function(d_key, d_value) {
                    if (d_value.name === key) {
                        d_value.dataPoints.push({ x: new Date(), y: Object.values(value)[0] });
                        instance.xValue = new Date();
                        instance.yValue = Object.values(value)[0];
                    }
                });
            });
            instance.options.data = instance.dataSet;
        }
        if ($(`#${instance.elemendID}`).attr('data-version')) {
            $(`#${instance.elemendID}`).CanvasJSChart(instance.options);
            setTimeout(() => { instance.updateData() }, 2000)
        }

    }

    renderGraphContainer() {
        let element = `<div class="card col-12 row">
        <div class="card-body col-12 d-flex flex-column text-center" id="${this.elemendID}" data-version="${Date.now()}" style="padding:0;height: 30vw;"></div>
        </div>`;
        console.log("TCL: renderGraphContainer -> element", $(element))
        return $(element)
    }
}