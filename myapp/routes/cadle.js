var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<html> <head>   <script type="text/javascript" src="candle.min.js"></script> </head> <body>   <button id="start">Start</button>   <button id="stop">Stop</button>   <hr>   <canvas id="chart" width="800" height="300"></canvas>    <script type="text/javascript">     function $(name) {       return document.getElementById(name);     };      var cjs = require(\'candle\');      var chart = new cjs.CandleChart({candleWidth: 4});     chart.outputTo($(\'chart\'));      var bars = new cjs.Bars(\'TSL\', 3600*24*1000);     chart.addSeries(bars);      var s = new cjs.Simulator(0.10, 99, 10);     var openTime;     s.onData((err, data) => {       openTime += bars.interval/20;       bars.addTick([openTime, data[1], data[2]]);       chart.render();     });      $(\'start\').addEventListener(\'click\', function() {       console.log(\'simulated price started...\');       bars.clear();       openTime = new Date().getTime();       s.start();     });      $(\'stop\').addEventListener(\'click\', function() {       console.log(\'simulated price stopped...\');       s.stop();     });    </script>  </body> </html>');
});

module.exports = router;
