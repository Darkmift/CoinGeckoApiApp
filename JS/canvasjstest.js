// window.onload = function() {

//     let graphTitle = "Bitcoin Exchange rates";
//     var options = {
//         exportEnabled: true,
//         animationEnabled: true,
//         title: {
//             text: graphTitle
//         },
//         // subtitles: [{
//         //     text: "Click Legend to Hide or Unhide Data Series"
//         // }],
//         // axisX: {
//         //     title: "Timeline"
//         // },
//         // axisY: {
//         //     title: "Amount",
//         //     titleFontColor: "#4F81BC",
//         //     lineColor: "#4F81BC",
//         //     labelFontColor: "#4F81BC",
//         //     tickColor: "#4F81BC",
//         //     includeZero: false
//         // },
//         // axisY: {
//         //     title: "Profit in USD",
//         //     titleFontColor: "#C0504E",
//         //     lineColor: "#C0504E",
//         //     labelFontColor: "#C0504E",
//         //     tickColor: "#C0504E",
//         //     includeZero: false
//         // },
//         toolTip: {
//             shared: true
//         },
//         legend: {
//             cursor: "pointer",
//             itemclick: toggleDataSeries
//         },
//         data: [{
//                 type: "spline",
//                 name: "Euro",
//                 showInLegend: true,
//                 xValueFormatString: "MMM YYYY",
//                 yValueFormatString: "#,##0 Units",
//                 dataPointsUSD: [
//                     { x: new Date(2016, 0, 1), y: 120 },
//                     { x: new Date(2016, 1, 1), y: 135 },
//                     { x: new Date(2016, 2, 1), y: 144 }
//                 ]
//             },
//             {
//                 type: "spline",
//                 name: "USD",
//                 axisYType: "secondary",
//                 showInLegend: true,
//                 xValueFormatString: "MMM YYYY",
//                 yValueFormatString: "$#,##0.#",
//                 dataPointsUSD: [
//                     { x: new Date(2016, 0, 1), y: 856.5 },
//                     { x: new Date(2016, 1, 1), y: 4000 },
//                     { x: new Date(2016, 2, 1), y: 1000 }
//                 ]
//             },
//             {
//                 type: "spline",
//                 name: "ILS",
//                 axisYType: "secondary",
//                 showInLegend: true,
//                 xValueFormatString: "MMM YYYY",
//                 yValueFormatString: "$#,##0.#",
//                 dataPointsUSD: [
//                     { x: new Date(2016, 0, 1), y: 5000.5 },
//                     { x: new Date(2016, 1, 1), y: 7500 },
//                     { x: new Date(2016, 2, 1), y: 500 }
//                 ]
//             },
//         ]
//     };
//     $("#graph1").CanvasJSChart(options);

//     function toggleDataSeries(e) {
//         if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//         } else {
//             e.dataSeries.visible = true;
//         }
//         e.chart.render();
//     }

// }

window.onload = function() {

    var dataPointsUSD = [];
    var dataPointsEUR = [];
    var dataPointsILS = [];

    var options = {
        theme: "light2",
        title: {
            text: "Live Data"
        },
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
    $("#graph1").CanvasJSChart(options);
    updateData();

    // Initial Values
    var xValue = 0;
    var yValue = 0;
    var newDataCount = 0;

    function addData(data) {
        console.log(dataPointsUSD)
        if (newDataCount != 0) {
            $.each(data, function(key, value) {
                dataPointsUSD.push({ x: xValue, y: parseInt(value.USD) });
                dataPointsEUR.push({ x: xValue, y: parseInt(value.EUR) });
                dataPointsILS.push({ x: xValue, y: parseInt(value.ILS) });
                xValue += 2;
                yValue = parseInt(value.EUR);
            });
        } else {
            dataPointsUSD.push({ x: xValue, y: parseInt(data.BTC.USD) });
            dataPointsEUR.push({ x: xValue, y: parseInt(data.BTC.EUR) });
            dataPointsILS.push({ x: xValue, y: parseInt(data.BTC.ILS) });
            xValue += 2;
            yValue = parseInt(data.BTC.usd);
        }

        newDataCount = 1;

        $("#graph1").CanvasJSChart().render()
        setTimeout(updateData, 1500);
    }

    function updateData() {
        $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD,EUR,ILS", addData);
    }

}