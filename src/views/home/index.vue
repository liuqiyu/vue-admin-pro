<template>
  <div id="mynetwork"></div>
</template>

<script>
import vis from 'vis'
export default {
  name: 'index',
  mounted () {
//    // Create and populate a data table.
//    var data = new vis.DataSet();
//    // create some nice looking data with sin/cos
//    var counter = 0;
//    var steps = 50;  // number of datapoints will be steps*steps
//    var axisMax = 314;
//    var axisStep = axisMax / steps;
//    for (var x = 0; x < axisMax; x+=axisStep) {
//      for (var y = 0; y < axisMax; y+=axisStep) {
//        var value = (Math.sin(x/50) * Math.cos(y/50) * 50 + 50);
//        data.add({id:counter++,x:x,y:y,z:value,style:value});
//      }
//    }
//
//    // specify options
//    var options = {
//      width:  '500px',
//      height: '552px',
//      style: 'surface',
//      showPerspective: true,
//      showGrid: true,
//      showShadow: false,
//      keepAspectRatio: true,
//      verticalRatio: 0.5
//    };
//
//    // Instantiate our graph object.
//    var container = document.getElementById('visualization');
//    new vis.Graph3d(container, data, options);

    // create an array with nodes
    var nodes = new vis.DataSet([
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]);

    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {};

    // initialize your network!
    new vis.Network(container, data, options);
  }
}
</script>

<style scoped>

</style>
