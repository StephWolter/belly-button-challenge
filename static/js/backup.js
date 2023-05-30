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

// Set up example to model after
sampleOne = bbSamples[0];
console.log(sampleOne);


// FOR DROPDOWN MENU
var dropdownIDs = document.getElementById('selDataset');

for (let i = 0; i < bbIds.length; i++) {
  let id = bbIds[i];
  let dropdownOption = document.createElement('option');
  dropdownOption.value = id;
  dropdownOption.textContent = id;
  dropdownIDs.appendChild(dropdownOption);
}



// // FOR DROPDOWN MENU
// attempt 1

// let dropdownMenu = d3.getElementByID('dropdown-menu');
// d3.json(bbUrl).then((bbData)=>{
//   bbIds.forEach(function(bbID){
//     let ddID = document.createElement('bbID');
//     ddID.textContent = bbID;
//     dropdownMenu.append(ddID);
//   });
// });

// // attempt to update
// function changeName(value){
//   console.log(value);
//   bbBar(value);
//   bbBuble(value);
//   bbMetaTable(value);

// // attempt 2
// let dropdown = d3.getElementById("#selDataset");
// bbIds.forEach(function(id){
//   let option = d3.createElement("option");
//   option.value = id;
//   option.text = id;
//   dropdown.appendChild(option);
// });

// // attempt 3
// let dropdownIDs = document.createElement('option');
// for (let i=0; i< bbIds.length; i++) {
//   let id = bbIds[i];
//   let dropdownOption = document.createElement('option');
//   dropdownOption.value = id;
//   dropdownOption.textContent = id;
//   dropdownIDs.appendChild(dropdownOption);
// }
// let divOption = document.getElementById('selDataset');
// divOption.appendChild(dropdownIDs);



// // attempt 4
// let dropdownIDs = document.getElementById('selDataset');
// for (let i = 0; i < bbIds.length; i++) {
//   let id = ids[i];
//   let optionElement = document.createElement('option');
//   dropdownOption.value = id;
//   dropdownOption.textContent = id;
//   dropdownIDs.appendChild(dropdownOption);
// }

// // Function to handle the option change event
// function optionChanged(value) {
//   // Handle the selected value here
//   console.log('Selected ID:', value);
// }


// FOR BAR CHART
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
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100}
  };
Plotly.newPlot("bar", traceBar, layoutBar);





// FOR BUBBLE CHART
let otuIDs = sampleOne.otu_ids;
let otuValues = sampleOne.sample_values;
let otuLabels = sampleOne.otu_labels;
// console.log(otuIDs, otuValues, otuLabels);
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
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100}
};
Plotly.newPlot('bubble',traceBubble,layoutBubble);



// // FOR METADATA
// get keys from metadata
// let labels = Object.keys(bbMeta[0]);
// let values = Object.values(bbMeta[0]);
// // attempt 1
// d3.json(bbUrl).then((data)=>{
//   let metadata = data.metadata;
//   let value = metadata.filter(result => result.id == sampleOne);
//   console.log(value)
//   let valueData = value[0];
//   d3.select("#sample-metadata").html("");
//   Object.entries(valueData).forEach(([key,value])=>{
//     console.log(key,value)
//   d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//   });  
// });

// attempt 2
// let bbTable = '<table>';
// bbTable += '<tr>';
// labels.forEach(key =>{
//   bbTable += '<th>${key}</th>';
// });
// bbTable +='</tr>';

// bbTable += '<tr>';
// values.forEach(value => {
//   bbTable += '<td>${value}</td>';
// });
// bbTable +='</tr>';
// bbTable += '</table>';

// const panelBody = document.getElementById('.panel-body');
// sampleMetadata.innerHTML= bbTable;

// attempt 3
// let panelBody = document.getElementById('panel-body')
// let table = document.createElement('table');
// let thead = document.createElement('thead');
// table.appendChild(thead);
// let headerRow = document.createElement('tr');
// labels.forEach(function(label) {
//   let th = document.createElement('th');
//   th.textContent = label;
//   headerRow.appendChild(th);
// });
// thead.appendChild(headerRow);
// let tbody = document.createElement('tbody');
// table.appendChild(tbody);
// let valueRow = document.createElement('tr');
// values.forEach(function(value) {
//   let td = document.createElement('td');
//   td.textContent = value;
//   valueRow.appendChild(td);
// });
// tbody.appendChild(valueRow);

// // attempt4
// get keys from metadata
let labels = Object.keys(bbMeta[0]);
let values = Object.values(bbMeta[0]);
// attempt 1
d3.json(bbUrl).then((data)=>{
  let value = bbMeta.filter(result => result.id == sampleOne);
  // console.log(value)
  let valueData = value[0];
  d3.select("#sample-metadata").html("");
  Object.entries(valueData).forEach(([key,value])=>{
    // console.log(key,value)
  d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
  });  
});

// FOR GAUGE CHART
let washCount = bbMeta[0].wfreq;
let trace3 = [
  {
    type: 'indicator',
    mode: 'gauge+number',
    value: washCount,
    title: { text: 'Weekly Belly Button Washing Frequency' },
    gauge: {
      axis: { range: [0, 10],tickwidth: 1, tickcolor: 'black', tickvals: [0, 2, 4, 6, 8, 10], ticktext: ['0', '2', '4', '6', '8', '10'] },
      bar: { color: 'white' },
      // shape: 'needle',
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
      // threshold: {
      //   line: { color: "red", width: 4 },
      //   thickness: 0.75,
      //   value: washCount
      // },
      // shape: "needle"
    }
    }
];
let layout = { width: 400, height: 300 };
Plotly.newPlot('gauge', trace3, layout);
});

// // FOR METADATA CHART
// function createMetadataChart(id) {
//     let metadataElement = document.getElementById('sample-metadata');
//     let metadataObject = bbMeta.find(obj => obj.id === id);
//   // clear old info
//     if (metadataObject) {
//       metadataElement.innerHTML = '';
//   // set up table
//       let table = document.createElement('table');
//       table.className = 'metadata-table';
//       for (let key in metadataObject) {
//         if (metadataObject.hasOwnProperty(key)) {
//           let row = document.createElement('tr');
//           let keyCell = document.createElement('td');
//           let valueCell = document.createElement('td');
//           keyCell.textContent = key;
//           valueCell.textContent = metadataObject[key];
//           row.appendChild(keyCell);
//           row.appendChild(valueCell);
//           table.appendChild(row);
//         }
//       }
//       metadataElement.appendChild(table);
//     } else {
//       metadataElement.textContent = 'No metadata available for ID: ' + id;
//     }
//   }




// function init () {

// };




// for (i = 0; i<bbIds.length; i++){
//   let otuID = bbData.samples.otu_ids[i].slice(0,10);
//   let otuIDValues = bbData.samples.sample_values[i].slice(0,10);
//   let trace = {
//     x: otuID,
//     y: otuIDValues,
//     type: 'bar',
//     orientation: 'h',
//     visible: i === 0 ? true : false
//   };
//   let traceSamples = [trace];

// }
// let layout = {
//   updatemenus: [{
//     buttons: dropdownOptions,
//     direction: 'down',
//     showactive: true
//   }]
// };

// // FOR METADATA
// get keys from metadata
// let labels = Object.keys(bbMeta[0]);
// let values = Object.values(bbMeta[0]);
// // attempt 1
// d3.json(bbUrl).then((data)=>{
//   let metadata = data.metadata;
//   let value = metadata.filter(result => result.id == sampleOne);
//   console.log(value)
//   let valueData = value[0];
//   d3.select("#sample-metadata").html("");
//   Object.entries(valueData).forEach(([key,value])=>{
//     console.log(key,value)
//   d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//   });  
// });

// attempt 2
// let bbTable = '<table>';
// bbTable += '<tr>';
// labels.forEach(key =>{
//   bbTable += '<th>${key}</th>';
// });
// bbTable +='</tr>';

// bbTable += '<tr>';
// values.forEach(value => {
//   bbTable += '<td>${value}</td>';
// });
// bbTable +='</tr>';
// bbTable += '</table>';

// const panelBody = document.getElementById('.panel-body');
// sampleMetadata.innerHTML= bbTable;

// attempt 3
// let panelBody = document.getElementById('panel-body')
// let table = document.createElement('table');
// let thead = document.createElement('thead');
// table.appendChild(thead);
// let headerRow = document.createElement('tr');
// labels.forEach(function(label) {
//   let th = document.createElement('th');
//   th.textContent = label;
//   headerRow.appendChild(th);
// });
// thead.appendChild(headerRow);
// let tbody = document.createElement('tbody');
// table.appendChild(tbody);
// let valueRow = document.createElement('tr');
// values.forEach(function(value) {
//   let td = document.createElement('td');
//   td.textContent = value;
//   valueRow.appendChild(td);
// });
// tbody.appendChild(valueRow);

// // attempt4
// get keys from metadata
// let labels = Object.keys(bbMeta[0]);
// let values = Object.values(bbMeta[0]);
// // attempt 1
// d3.json(bbUrl).then((data)=>{
//   let value = bbMeta.filter(result => result.id == sampleOne);
//   // console.log(value)
//   let valueData = value[0];
//   d3.select("#sample-metadata").html("");
//   Object.entries(valueData).forEach(([key,value])=>{
//     // console.log(key,value)
//   d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//   });  
// });
