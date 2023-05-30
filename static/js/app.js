const bbUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data 
// create list bbSamples, bbIds, bbMeta with all our data to draw from
let bbData = d3.json(bbUrl).then(function(data) {
  let bbIds = [];
  let bbSamples = [];
  let bbMeta = [];
  for (let i=0; i < data.names.length; i++){
    let name = data.names[i];
    bbIds.push(name);
    let sample = data.samples[i];
    bbSamples.push(sample);
    let meta = data.metadata[i];
    bbMeta.push(meta);

};

// check the lists
console.log("sample: ",bbSamples);
console.log("Ids: ",bbIds);
console.log("Meta: ",bbMeta);

// Set up example from bbSamples to model bubble chart and bar chart after
sampleOne = bbSamples[0];
console.log(sampleOne);

function init(){

// FOR DROPDOWN MENU
let dropdownIDs = document.getElementById('selDataset');

for (let i = 0; i < bbIds.length; i++) {
  let id = bbIds[i];
  let dropdownOption = document.createElement('option');
  dropdownOption.value = id;
  dropdownOption.textContent = id;
  dropdownIDs.append(dropdownOption);
}

// for updating the charts?
createBarChart()
createBubbleChart();
createGaugeChart()
createMetadataChart();

}


// // FOR UPDATING CHARTS
// dropdownIDs.addEventListener('change', function() {
//   let selectedID = dropdownIDs.value;
//   createBarChart(selectedID);
//   createBubbleChart(selectedID);
//   createGaugeChart(selectedID);
// });
// attempt 2
// dropdownIDs.addEventListener('change',createBarChart, createBubbleChart, createGaugeChart);

// Set up example to model after
init();



// FOR BAR CHART
function createBarChart(id){
let otuID = sampleOne.otu_ids.slice(0,10).map(id => `otu${id}`).reverse();
let otuIDValues = sampleOne.sample_values.slice(0,10).reverse();
let trace1 = {
  x: otuIDValues,
  y: otuID,
  type: 'bar',
  orientation: 'h',

};
let traceBar = [trace1];
let layoutBar = {
  title: 'Top Ten OTU_IDs',
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100}
  };
  
Plotly.newPlot("bar", traceBar, layoutBar);
}





// FOR BUBBLE CHART
function createBubbleChart(id) {
  let otuIDs = sampleOne.otu_ids;
  let otuValues = sampleOne.sample_values;
  let otuLabels = sampleOne.otu_labels;
  let trace2 = {
    x: otuIDs,
    y: otuValues,
    text: otuLabels,
    mode: 'markers', 
    marker: {
      size: otuValues, 
      color: otuIDs, 
      colorscale: 'YlGnBu'
    }
  };
  let traceBubble = [trace2]
  let layoutBubble = {
    title: 'OTU_IDs',
    margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100}
  };
  Plotly.newPlot('bubble',traceBubble,layoutBubble);
}


// FOR METADATA CHART
function createMetadataChart(id) {
    let metadataElement = document.getElementById('sample-metadata');
    let metadataObject = bbMeta[0];
  // clear old info
    if (metadataObject) {
      metadataElement.innerHTML = '';
  // set up table
      let table = document.createElement('table');
      table.className = 'metadata-table';
      for (let key in metadataObject) {
        if (metadataObject.hasOwnProperty(key)) {
          let row = document.createElement('tr');
          let keyCell = document.createElement('td');
          let valueCell = document.createElement('td');
          keyCell.textContent = key;
          valueCell.textContent = metadataObject[key];
          row.appendChild(keyCell);
          row.appendChild(valueCell);
          table.appendChild(row);
        }
      }
      metadataElement.appendChild(table);
    } else {
      metadataElement.textContent = 'No metadata available for ID: ' + id;
    }
  }



// FOR GAUGE CHART
function createGaugeChart(id) {
  let washCount = bbMeta[0].wfreq;
  let trace3 = [
    {
      type: 'indicator',
      mode: 'gauge+number',
      value: washCount,
      title: { text: 'Weekly Belly Button Washing Frequency' },
      gauge: {
        axis: { range: [0, 10],tickwidth: 1, tickcolor: 'black', tickvals: [0, 2, 4, 6, 8, 10], ticktext: ['0', '2', '4', '6', '8', '10'] },
        bar: { color: 'black' },
        steps: [
          { range: [0, 1], color: 'red' },
          { range: [1, 2], color: 'orangered' },
          { range: [2, 3], color: 'orange' },
          { range: [3, 4], color: 'gold' },
          { range: [4, 5], color: 'yellow' },
          { range: [5, 6], color: 'yellowgreen' },
          { range: [6, 7], color: 'green' },
          { range: [7, 8], color: 'teal' },
          { range: [8, 9], color: 'blue' },
          { range: [9, 10], color: 'indigo' }
       ],
        threshold: {
          line: { color: "white", width: 4 },
          thickness: 0.75,
          value: washCount
        },
      }
      }
  ];
  let layout = { width: 400, height: 300 };
  Plotly.newPlot('gauge', trace3, layout);
}

});




