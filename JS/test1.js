import Graph_Render from "./Graph_Render.js";

const GraphHandler = new Graph_Render('GraphUSD', 'USD', ['BTC', 'ETH', 'NANO']);

GraphHandler.dataObjBuilder();
GraphHandler.updateData();
$('#trackedGraphs').append(GraphHandler.renderGraphContainer());