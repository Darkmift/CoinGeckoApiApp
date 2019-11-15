window.onload = function() {

    var dataPointsUSD = [];
    var dataPointsEUR = [];
    var dataPointsILS = [];
    var options = {
        theme: "light2",
        title: {
            text: "Live Data"
        },
        xValueFormatString: "hh:mm:ss tt",
        data: [{
                type: "line",
                dataPoints: dataPointsUSD,
                showInLegend: true,
                name: "USD"
            },
            {
                type: "line",
                dataPoints: dataPointsEUR,
                showInLegend: true,
                name: "EUR"
            },
            {
                type: "line",
                dataPoints: dataPointsILS,
                showInLegend: true,
                name: "ILS"
            },
        ]
    };


    $("#graph1, #graph2, #graph3").each(function(index, element) {
        $(element).CanvasJSChart(options);
        updateData();
    });


    // Initial Values
    var xValue = new Date();
    var yValue = 0;
    var newDataCount = 6;

    function addData(data) {
        if (newDataCount != 1) {
            $.each(data, function(key, value) {
                dataPointsUSD.push({ x: xValue, y: parseInt(value.USD) });
                dataPointsEUR.push({ x: xValue, y: parseInt(value.EUR) });
                dataPointsILS.push({ x: xValue, y: parseInt(value.ILS) });
                xValue = new Date();
                yValue = parseInt(value.EUR);
            });
        } else {
            dataPointsUSD.push({ x: xValue, y: parseInt(data.BTC.USD) });

            dataPointsEUR.push({ x: xValue, y: parseInt(data.BTC.EUR) });

            dataPointsILS.push({ x: xValue, y: parseInt(data.BTC.ILS) });

            xValue = new Date();
            yValue = parseInt(data.BTC.usd);
        }

        // newDataCount = 1;
        newDataCount--;
        if (newDataCount) {
            $("#graph1, #graph2, #graph3").each(function(index, element) {
                $(element).CanvasJSChart(options);
            });
            setTimeout(updateData, 2000);
            console.log("TCL: addData -> dataPointsUSD", dataPointsUSD)
            console.log("TCL: addData -> dataPointsEUR", dataPointsEUR)
            console.log("TCL: addData -> dataPointsILS", dataPointsILS)
        }


    }

    function updateData() {
        $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD,EUR,ILS", addData);
    }

}

function formatAMPM() {
    let date = new Date();
    let hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
}

console.log(formatAMPM(new Date));