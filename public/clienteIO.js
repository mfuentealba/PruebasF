var socket = io.connect('http://localhost:8888', { 'forceNew': true });
//<script src="clienteIO.js"></script>
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})


var arrTodo = [
//[
//{"x":1,"y":[1.37517,1.37592,1.37372,1.37495],"vo":{"open":1.37517,"close":1.37495,"low":1.37372,"high":1.37592,"id":1,date":"23:10","origen":"S","fecha":"2014.01.01","vol":764}},
/*[{"x":30841,"y":[1.12947,1.13036,1.12848,1.12869],"vo":{"open":1.12947,"close":1.12869,"low":1.12848,"high":1.13036,"id":30841,"date":"20:10","origen":"S","fecha":"2015.09.01","vol":3615,"undefined":null},"indexLabel":"F"},{"x":30842,"y":[1.12867,1.1313,1.12841,1.13081],"vo":{"open":1.12867,"close":1.13081,"low":1.12841,"high":1.1313,"id":30842,"date":"20:30","origen":"S","fecha":"2015.09.01","vol":1956,"undefined":null},"indexLabel":"I"},{"x":30843,"y":[1.13079,1.13129,1.1294,1.1311],"vo":{"open":1.13079,"close":1.1311,"low":1.1294,"high":1.13129,"id":30843,"date":"20:50","origen":"S","fecha":"2015.09.01","vol":2817,"undefined":null}},{"x":30844,"y":[1.13109,1.1313,1.1299,1.12997],"vo":{"open":1.13109,"close":1.12997,"low":1.1299,"high":1.1313,"id":30844,"date":"21:10","origen":"S","fecha":"2015.09.01","vol":2849,"undefined":null}},{"x":30845,"y":[1.12998,1.13013,1.12913,1.12958],"vo":{"open":1.12998,"close":1.12958,"low":1.12913,"high":1.13013,"id":30845,"date":"21:30","origen":"S","fecha":"2015.09.01","vol":2642,"undefined":null}},{"x":30846,"y":[1.12958,1.12982,1.12893,1.12926],"vo":{"open":1.12958,"close":1.12926,"low":1.12893,"high":1.12982,"id":30846,"date":"21:50","origen":"S","fecha":"2015.09.01","vol":3079,"undefined":null}},{"x":30847,"y":[1.12926,1.12981,1.12855,1.12968],"vo":{"open":1.12926,"close":1.12968,"low":1.12855,"high":1.12981,"id":30847,"date":"22:10","origen":"S","fecha":"2015.09.01","vol":2517,"undefined":null}},{"x":30848,"y":[1.12968,1.13068,1.12942,1.12991],"vo":{"open":1.12968,"close":1.12991,"low":1.12942,"high":1.13068,"id":30848,"date":"22:30","origen":"S","fecha":"2015.09.01","vol":2977,"undefined":null}},{"x":30849,"y":[1.1299,1.13034,1.12941,1.13027],"vo":{"open":1.1299,"close":1.13027,"low":1.12941,"high":1.13034,"id":30849,"date":"22:50","origen":"S","fecha":"2015.09.01","vol":2913,"undefined":null}},{"x":30850,"y":[1.13034,1.13111,1.13002,1.13005],"vo":{"open":1.13034,"close":1.13005,"low":1.13002,"high":1.13111,"id":30850,"date":"23:10","origen":"S","fecha":"2015.09.01","vol":1143,"undefined":null}},{"x":30851,"y":[1.13002,1.1319,1.12991,1.13134],"vo":{"open":1.13002,"close":1.13134,"low":1.12991,"high":1.1319,"id":30851,"date":"23:30","origen":"S","fecha":"2015.09.01","vol":1407,"undefined":null}},{"x":30852,"y":[1.1313,1.13193,1.13078,1.13174],"vo":{"open":1.1313,"close":1.13174,"low":1.13078,"high":1.13193,"id":30852,"date":"23:50","origen":"S","fecha":"2015.09.01","vol":820,"undefined":null}},{"x":30853,"y":[1.13176,1.13182,1.13116,1.13137],"vo":{"open":1.13176,"close":1.13137,"low":1.13116,"high":1.13182,"id":30853,"date":"00:10","origen":"S","fecha":"2015.09.02","vol":422,"undefined":null}},{"x":30854,"y":[1.13143,1.13161,1.13058,1.13111],"vo":{"open":1.13143,"close":1.13111,"low":1.13058,"high":1.13161,"id":30854,"date":"00:30","origen":"S","fecha":"2015.09.02","vol":525,"undefined":null}},{"x":30855,"y":[1.13113,1.13117,1.12995,1.13032],"vo":{"open":1.13113,"close":1.13032,"low":1.12995,"high":1.13117,"id":30855,"date":"00:50","origen":"S","fecha":"2015.09.02","vol":1161,"undefined":null}},{"x":30856,"y":[1.13033,1.13042,1.12998,1.13033],"vo":{"open":1.13033,"close":1.13033,"low":1.12998,"high":1.13042,"id":30856,"date":"01:10","origen":"S","fecha":"2015.09.02","vol":980,"undefined":null}},{"x":30857,"y":[1.13033,1.13062,1.12963,1.1299],"vo":{"open":1.13033,"close":1.1299,"low":1.12963,"high":1.13062,"id":30857,"date":"01:30","origen":"S","fecha":"2015.09.02","vol":927,"undefined":null}},{"x":30858,"y":[1.1299,1.13032,1.12957,1.12962],"vo":{"open":1.1299,"close":1.12962,"low":1.12957,"high":1.13032,"id":30858,"date":"01:50","origen":"S","fecha":"2015.09.02","vol":922,"undefined":null}},{"x":30859,"y":[1.12962,1.12997,1.1294,1.12971],"vo":{"open":1.12962,"close":1.12971,"low":1.1294,"high":1.12997,"id":30859,"date":"02:10","origen":"S","fecha":"2015.09.02","vol":680,"undefined":null}},{"x":30860,"y":[1.12969,1.12985,1.12921,1.12932],"vo":{"open":1.12969,"close":1.12932,"low":1.12921,"high":1.12985,"id":30860,"date":"02:30","origen":"S","fecha":"2015.09.02","vol":941,"undefined":null}},{"x":30861,"y":[1.12932,1.13,1.12789,1.12832],"vo":{"open":1.12932,"close":1.12832,"low":1.12789,"high":1.13,"id":30861,"date":"02:50","origen":"S","fecha":"2015.09.02","vol":1835,"undefined":null}},{"x":30862,"y":[1.12832,1.12897,1.12681,1.12767],"vo":{"open":1.12832,"close":1.12767,"low":1.12681,"high":1.12897,"id":30862,"date":"03:10","origen":"S","fecha":"2015.09.02","vol":2985,"undefined":null}},{"x":30863,"y":[1.12764,1.12822,1.1269,1.1276],"vo":{"open":1.12764,"close":1.1276,"low":1.1269,"high":1.12822,"id":30863,"date":"03:30","origen":"S","fecha":"2015.09.02","vol":2261,"undefined":null}},{"x":30864,"y":[1.1276,1.12764,1.12603,1.12621],"vo":{"open":1.1276,"close":1.12621,"low":1.12603,"high":1.12764,"id":30864,"date":"03:50","origen":"S","fecha":"2015.09.02","vol":2126},"indexLabel":"F"}],
[{"x":30842,"y":[1.1260649999999999,1.12924],"tipo":"Nube"},{"x":30843,"y":[1.1258050000000002,1.12924],"tipo":"Nube"},{"x":30844,"y":[1.1258050000000002,1.12924],"tipo":"Nube"},{"x":30845,"y":[1.1255950000000001,1.12924],"tipo":"Nube"},{"x":30846,"y":[1.1253125000000002,1.12924],"tipo":"Nube"},{"x":30847,"y":[1.1251875,1.12924],"tipo":"Nube"},{"x":30848,"y":[1.12553,1.12924],"tipo":"Nube"},{"x":30849,"y":[1.1255875,1.12836],"tipo":"Nube"},{"x":30850,"y":[1.1257,1.127485],"tipo":"Nube"},{"x":30851,"y":[1.1258275,1.12686],"tipo":"Nube"},{"x":30852,"y":[1.1267475,1.12686],"tipo":"Nube"},{"x":30853,"y":[1.1274825,1.12686],"tipo":"Nube"},{"x":30854,"y":[1.1274825,1.1282999999999999],"tipo":"Nube"},{"x":30855,"y":[1.1283675,1.127305],"tipo":"Nube"},{"x":30856,"y":[1.1283675,1.127305],"tipo":"Nube"},{"x":30857,"y":[1.1288900000000002,1.127305],"tipo":"Nube"},{"x":30858,"y":[1.1288900000000002,1.127305],"tipo":"Nube"},{"x":30859,"y":[1.1286875,1.127305],"tipo":"Nube"},{"x":30860,"y":[1.1288075,1.127305],"tipo":"Nube"},{"x":30861,"y":[1.1290324999999999,1.127305],"tipo":"Nube"},{"x":30862,"y":[1.1292849999999999,1.1273499999999999],"tipo":"Nube"},{"x":30863,"y":[1.1295899999999999,1.1273499999999999],"tipo":"Nube"}],
[{"x":30842,"y":1.128085,"tipo":"Tenkan"},{"x":30843,"y":1.129855,"tipo":"Tenkan"},{"x":30844,"y":1.129855,"tipo":"Tenkan"},{"x":30845,"y":1.130215,"tipo":"Tenkan"},{"x":30846,"y":1.130215,"tipo":"Tenkan"},{"x":30847,"y":1.1296300000000001,"tipo":"Tenkan"},{"x":30848,"y":1.1296149999999998,"tipo":"Tenkan"},{"x":30849,"y":1.1296149999999998,"tipo":"Tenkan"},{"x":30850,"y":1.130045,"tipo":"Tenkan"},{"x":30851,"y":1.130655,"tipo":"Tenkan"},{"x":30852,"y":1.1309049999999998,"tipo":"Tenkan"},{"x":30853,"y":1.1309049999999998,"tipo":"Tenkan"},{"x":30854,"y":1.131255,"tipo":"Tenkan"},{"x":30855,"y":1.1312,"tipo":"Tenkan"},{"x":30856,"y":1.131095,"tipo":"Tenkan"},{"x":30857,"y":1.1303999999999998,"tipo":"Tenkan"},{"x":30858,"y":1.130125,"tipo":"Tenkan"},{"x":30859,"y":1.130125,"tipo":"Tenkan"},{"x":30860,"y":1.129765,"tipo":"Tenkan"},{"x":30861,"y":1.129605,"tipo":"Tenkan"},{"x":30862,"y":1.129605,"tipo":"Tenkan"},{"x":30863,"y":1.1284049999999999,"tipo":"Tenkan"}],
[{"x":30842,"y":1.1268799999999999,"tipo":"Kinjou"},{"x":30843,"y":1.1268799999999999,"tipo":"Kinjou"},{"x":30844,"y":1.1268799999999999,"tipo":"Kinjou"},{"x":30845,"y":1.1275650000000002,"tipo":"Kinjou"},{"x":30846,"y":1.1275650000000002,"tipo":"Kinjou"},{"x":30847,"y":1.127745,"tipo":"Kinjou"},{"x":30848,"y":1.1280000000000001,"tipo":"Kinjou"},{"x":30849,"y":1.12845,"tipo":"Kinjou"},{"x":30850,"y":1.128525,"tipo":"Kinjou"},{"x":30851,"y":1.128525,"tipo":"Kinjou"},{"x":30852,"y":1.129385,"tipo":"Kinjou"},{"x":30853,"y":1.1301700000000001,"tipo":"Kinjou"},{"x":30854,"y":1.1302400000000001,"tipo":"Kinjou"},{"x":30855,"y":1.1302400000000001,"tipo":"Kinjou"},{"x":30856,"y":1.1302400000000001,"tipo":"Kinjou"},{"x":30857,"y":1.1302400000000001,"tipo":"Kinjou"},{"x":30858,"y":1.1302400000000001,"tipo":"Kinjou"},{"x":30859,"y":1.130665,"tipo":"Kinjou"},{"x":30860,"y":1.130665,"tipo":"Kinjou"},{"x":30861,"y":1.130665,"tipo":"Kinjou"},{"x":30862,"y":1.130665,"tipo":"Kinjou"},{"x":30863,"y":1.130665,"tipo":"Kinjou"}]*/

/*[{"x":58357,"y":[1.05474,1.0549,1.05453,1.05463],"vo":{"open":1.05474,"close":1.05463,"low":1.05453,"high":1.0549,"id":58357,"date":"03:10","origen":"S","fecha":"2017.02.22","vol":1396,"undefined":null},"indexLabel":"F"},{"x":58358,"y":[1.05463,1.0554,1.05463,1.05513],"vo":{"open":1.05463,"close":1.05513,"low":1.05463,"high":1.0554,"id":58358,"date":"03:30","origen":"S","fecha":"2017.02.22","vol":1248,"undefined":null}},{"x":58359,"y":[1.05513,1.0556,1.05461,1.05472],"vo":{"open":1.05513,"close":1.05472,"low":1.05461,"high":1.0556,"id":58359,"date":"03:50","origen":"S","fecha":"2017.02.22","vol":1715,"undefined":null}},{"x":58360,"y":[1.05472,1.05527,1.05462,1.05525],"vo":{"open":1.05472,"close":1.05525,"low":1.05462,"high":1.05527,"id":58360,"date":"04:10","origen":"S","fecha":"2017.02.22","vol":1481,"undefined":null}},{"x":58361,"y":[1.05525,1.0553,1.05471,1.05483],"vo":{"open":1.05525,"close":1.05483,"low":1.05471,"high":1.0553,"id":58361,"date":"04:30","origen":"S","fecha":"2017.02.22","vol":966,"undefined":null}},{"x":58362,"y":[1.05484,1.05522,1.05464,1.05464],"vo":{"open":1.05484,"close":1.05464,"low":1.05464,"high":1.05522,"id":58362,"date":"04:50","origen":"S","fecha":"2017.02.22","vol":1033,"undefined":null}},{"x":58363,"y":[1.05464,1.05493,1.0546,1.05461],"vo":{"open":1.05464,"close":1.05461,"low":1.0546,"high":1.05493,"id":58363,"date":"05:10","origen":"S","fecha":"2017.02.22","vol":759,"undefined":null}},{"x":58364,"y":[1.0546,1.05475,1.05446,1.05459],"vo":{"open":1.0546,"close":1.05459,"low":1.05446,"high":1.05475,"id":58364,"date":"05:30","origen":"S","fecha":"2017.02.22","vol":1260,"undefined":null}},{"x":58365,"y":[1.05459,1.05469,1.05439,1.05443],"vo":{"open":1.05459,"close":1.05443,"low":1.05439,"high":1.05469,"id":58365,"date":"05:50","origen":"S","fecha":"2017.02.22","vol":939,"undefined":null}},{"x":58366,"y":[1.05443,1.05468,1.05435,1.05465],"vo":{"open":1.05443,"close":1.05465,"low":1.05435,"high":1.05468,"id":58366,"date":"06:10","origen":"S","fecha":"2017.02.22","vol":1000,"undefined":null}},{"x":58367,"y":[1.05464,1.05471,1.05438,1.05469],"vo":{"open":1.05464,"close":1.05469,"low":1.05438,"high":1.05471,"id":58367,"date":"06:30","origen":"S","fecha":"2017.02.22","vol":726,"undefined":null}},{"x":58368,"y":[1.05469,1.0547,1.05433,1.05439],"vo":{"open":1.05469,"close":1.05439,"low":1.05433,"high":1.0547,"id":58368,"date":"06:50","origen":"S","fecha":"2017.02.22","vol":650,"undefined":null}},{"x":58369,"y":[1.05439,1.0545,1.05428,1.05449],"vo":{"open":1.05439,"close":1.05449,"low":1.05428,"high":1.0545,"id":58369,"date":"07:10","origen":"S","fecha":"2017.02.22","vol":784,"undefined":null}},{"x":58370,"y":[1.05449,1.0545,1.05425,1.05441],"vo":{"open":1.05449,"close":1.05441,"low":1.05425,"high":1.0545,"id":58370,"date":"07:30","origen":"S","fecha":"2017.02.22","vol":762,"undefined":null}},{"x":58371,"y":[1.05441,1.05453,1.05433,1.05441],"vo":{"open":1.05441,"close":1.05441,"low":1.05433,"high":1.05453,"id":58371,"date":"07:50","origen":"S","fecha":"2017.02.22","vol":721,"undefined":null}},{"x":58372,"y":[1.05441,1.05441,1.05342,1.05343],"vo":{"open":1.05441,"close":1.05343,"low":1.05342,"high":1.05441,"id":58372,"date":"08:10","origen":"S","fecha":"2017.02.22","vol":1397,"undefined":null}},{"x":58373,"y":[1.05342,1.05359,1.05194,1.05242],"vo":{"open":1.05342,"close":1.05242,"low":1.05194,"high":1.05359,"id":58373,"date":"08:30","origen":"S","fecha":"2017.02.22","vol":2017,"undefined":null}},{"x":58374,"y":[1.05242,1.05284,1.05219,1.05251],"vo":{"open":1.05242,"close":1.05251,"low":1.05219,"high":1.05284,"id":58374,"date":"08:50","origen":"S","fecha":"2017.02.22","vol":2032,"undefined":null}},{"x":58375,"y":[1.05251,1.05269,1.05156,1.0516],"vo":{"open":1.05251,"close":1.0516,"low":1.05156,"high":1.05269,"id":58375,"date":"09:10","origen":"S","fecha":"2017.02.22","vol":2212,"undefined":null}},{"x":58376,"y":[1.0516,1.05174,1.05048,1.05074],"vo":{"open":1.0516,"close":1.05074,"low":1.05048,"high":1.05174,"id":58376,"date":"09:30","origen":"S","fecha":"2017.02.22","vol":2308,"undefined":null}},{"x":58377,"y":[1.05074,1.05135,1.05016,1.05096],"vo":{"open":1.05074,"close":1.05096,"low":1.05016,"high":1.05135,"id":58377,"date":"09:50","origen":"S","fecha":"2017.02.22","vol":2429,"undefined":null}},{"x":58378,"y":[1.05095,1.05114,1.04973,1.05016],"vo":{"open":1.05095,"close":1.05016,"low":1.04973,"high":1.05114,"id":58378,"date":"10:10","origen":"S","fecha":"2017.02.22","vol":2730,"undefined":null}},{"x":58379,"y":[1.05015,1.05116,1.05006,1.05094],"vo":{"open":1.05015,"close":1.05094,"low":1.05006,"high":1.05116,"id":58379,"date":"10:30","origen":"S","fecha":"2017.02.22","vol":2495,"undefined":null}},{"x":58380,"y":[1.05097,1.0511,1.05009,1.0509],"vo":{"open":1.05097,"close":1.0509,"low":1.05009,"high":1.0511,"id":58380,"date":"10:50","origen":"S","fecha":"2017.02.22","vol":2297,"undefined":null}},{"x":58381,"y":[1.05089,1.05195,1.05089,1.0519],"vo":{"open":1.05089,"close":1.0519,"low":1.05089,"high":1.05195,"id":58381,"date":"11:10","origen":"S","fecha":"2017.02.22","vol":2607,"undefined":null}},{"x":58382,"y":[1.0519,1.05191,1.05034,1.05161],"vo":{"open":1.0519,"close":1.05161,"low":1.05034,"high":1.05191,"id":58382,"date":"11:30","origen":"S","fecha":"2017.02.22","vol":2749,"undefined":null}},{"x":58383,"y":[1.05161,1.05164,1.0502,1.0502],"vo":{"open":1.05161,"close":1.0502,"low":1.0502,"high":1.05164,"id":58383,"date":"11:50","origen":"S","fecha":"2017.02.22","vol":2314,"undefined":null}},{"x":58384,"y":[1.0502,1.05089,1.05011,1.05028],"vo":{"open":1.0502,"close":1.05028,"low":1.05011,"high":1.05089,"id":58384,"date":"12:10","origen":"S","fecha":"2017.02.22","vol":2180,"undefined":null}},{"x":58385,"y":[1.05028,1.05065,1.04938,1.04999],"vo":{"open":1.05028,"close":1.04999,"low":1.04938,"high":1.05065,"id":58385,"date":"12:30","origen":"S","fecha":"2017.02.22","vol":2514,"undefined":null}},{"x":58386,"y":[1.04999,1.05075,1.04969,1.05054],"vo":{"open":1.04999,"close":1.05054,"low":1.04969,"high":1.05075,"id":58386,"date":"12:50","origen":"S","fecha":"2017.02.22","vol":1982,"undefined":null}},{"x":58387,"y":[1.05054,1.05074,1.0503,1.05042],"vo":{"open":1.05054,"close":1.05042,"low":1.0503,"high":1.05074,"id":58387,"date":"13:10","origen":"S","fecha":"2017.02.22","vol":1740,"undefined":null}},{"x":58388,"y":[1.05041,1.05044,1.04949,1.05003],"vo":{"open":1.05041,"close":1.05003,"low":1.04949,"high":1.05044,"id":58388,"date":"13:30","origen":"S","fecha":"2017.02.22","vol":2101,"undefined":null}},{"x":58389,"y":[1.05003,1.05005,1.04933,1.04986],"vo":{"open":1.05003,"close":1.04986,"low":1.04933,"high":1.05005,"id":58389,"date":"13:50","origen":"S","fecha":"2017.02.22","vol":1947,"undefined":null}},{"x":58390,"y":[1.04984,1.0509,1.04982,1.05081],"vo":{"open":1.04984,"close":1.05081,"low":1.04982,"high":1.0509,"id":58390,"date":"14:10","origen":"S","fecha":"2017.02.22","vol":1887,"undefined":null}},{"x":58391,"y":[1.0508,1.05125,1.05074,1.05109],"vo":{"open":1.0508,"close":1.05109,"low":1.05074,"high":1.05125,"id":58391,"date":"14:30","origen":"S","fecha":"2017.02.22","vol":1798,"undefined":null}},{"x":58392,"y":[1.05109,1.05138,1.05079,1.05115],"vo":{"open":1.05109,"close":1.05115,"low":1.05079,"high":1.05138,"id":58392,"date":"14:50","origen":"S","fecha":"2017.02.22","vol":1797,"undefined":null}},{"x":58393,"y":[1.05116,1.05141,1.05074,1.05078],"vo":{"open":1.05116,"close":1.05078,"low":1.05074,"high":1.05141,"id":58393,"date":"15:10","origen":"S","fecha":"2017.02.22","vol":2212,"undefined":null}},{"x":58394,"y":[1.05078,1.05164,1.05073,1.05143],"vo":{"open":1.05078,"close":1.05143,"low":1.05073,"high":1.05164,"id":58394,"date":"15:30","origen":"S","fecha":"2017.02.22","vol":2087,"undefined":null}},{"x":58395,"y":[1.05143,1.05195,1.05128,1.05135],"vo":{"open":1.05143,"close":1.05135,"low":1.05128,"high":1.05195,"id":58395,"date":"15:50","origen":"S","fecha":"2017.02.22","vol":2117,"undefined":null}},{"x":58396,"y":[1.05135,1.05181,1.05124,1.05143],"vo":{"open":1.05135,"close":1.05143,"low":1.05124,"high":1.05181,"id":58396,"date":"16:10","origen":"S","fecha":"2017.02.22","vol":1896,"undefined":null}},{"x":58397,"y":[1.05145,1.05207,1.05127,1.0513],"vo":{"open":1.05145,"close":1.0513,"low":1.05127,"high":1.05207,"id":58397,"date":"16:30","origen":"S","fecha":"2017.02.22","vol":2784,"undefined":null}},{"x":58398,"y":[1.0513,1.0517,1.05057,1.05149],"vo":{"open":1.0513,"close":1.05149,"low":1.05057,"high":1.0517,"id":58398,"date":"16:50","origen":"S","fecha":"2017.02.22","vol":2508,"undefined":null}},{"x":58399,"y":[1.0515,1.05158,1.04989,1.0502],"vo":{"open":1.0515,"close":1.0502,"low":1.04989,"high":1.05158,"id":58399,"date":"17:10","origen":"S","fecha":"2017.02.22","vol":2475,"undefined":null}},{"x":58400,"y":[1.0502,1.05406,1.04958,1.054],"vo":{"open":1.0502,"close":1.054,"low":1.04958,"high":1.05406,"id":58400,"date":"17:30","origen":"S","fecha":"2017.02.22","vol":2155},"indexLabel":"F"}],
[{"x":58358,"y":[1.054405,1.053865],"tipo":"Nube"},{"x":58359,"y":[1.0541649999999998,1.053865],"tipo":"Nube"},{"x":58360,"y":[1.0541675000000001,1.053865],"tipo":"Nube"},{"x":58361,"y":[1.0541675000000001,1.05395],"tipo":"Nube"},{"x":58362,"y":[1.05402,1.05395],"tipo":"Nube"},{"x":58363,"y":[1.0539425,1.05395],"tipo":"Nube"},{"x":58364,"y":[1.0539425,1.05395],"tipo":"Nube"},{"x":58365,"y":[1.0539325000000002,1.05395],"tipo":"Nube"},{"x":58366,"y":[1.0542850000000001,1.0542500000000001],"tipo":"Nube"},{"x":58367,"y":[1.0543025,1.054225],"tipo":"Nube"},{"x":58368,"y":[1.0543175,1.054225],"tipo":"Nube"},{"x":58369,"y":[1.0543175,1.054225],"tipo":"Nube"},{"x":58370,"y":[1.0543175,1.054225],"tipo":"Nube"},{"x":58371,"y":[1.0545974999999999,1.054225],"tipo":"Nube"},{"x":58372,"y":[1.0546175,1.054225],"tipo":"Nube"},{"x":58373,"y":[1.0546175,1.054225],"tipo":"Nube"},{"x":58374,"y":[1.05458,1.054225],"tipo":"Nube"},{"x":58375,"y":[1.054695,1.054225],"tipo":"Nube"},{"x":58376,"y":[1.0546925,1.054225],"tipo":"Nube"},{"x":58377,"y":[1.054635,1.0544600000000002],"tipo":"Nube"},{"x":58378,"y":[1.0546925,1.0544600000000002],"tipo":"Nube"},{"x":58379,"y":[1.0546825000000002,1.0544600000000002],"tipo":"Nube"},{"x":58380,"y":[1.0547475,1.0544600000000002],"tipo":"Nube"},{"x":58381,"y":[1.0547300000000002,1.0544600000000002],"tipo":"Nube"},{"x":58382,"y":[1.0547275,1.0544600000000002],"tipo":"Nube"},{"x":58383,"y":[1.05461,1.0544600000000002],"tipo":"Nube"},{"x":58384,"y":[1.054395,1.0544600000000002],"tipo":"Nube"},{"x":58385,"y":[1.0543749999999998,1.0544600000000002],"tipo":"Nube"},{"x":58386,"y":[1.0542725,1.05377],"tipo":"Nube"},{"x":58387,"y":[1.0535575000000001,1.05377],"tipo":"Nube"},{"x":58388,"y":[1.05336,1.05377],"tipo":"Nube"},{"x":58389,"y":[1.0533225000000002,1.05377],"tipo":"Nube"},{"x":58390,"y":[1.0526275,1.05377],"tipo":"Nube"},{"x":58391,"y":[1.0525275,1.05377],"tipo":"Nube"},{"x":58392,"y":[1.0512875,1.05377],"tipo":"Nube"},{"x":58393,"y":[1.05137,1.05377],"tipo":"Nube"},{"x":58394,"y":[1.051575,1.05377],"tipo":"Nube"},{"x":58395,"y":[1.0515725,1.05362],"tipo":"Nube"},{"x":58396,"y":[1.0513575,1.05362],"tipo":"Nube"},{"x":58397,"y":[1.0511025,1.0535800000000002],"tipo":"Nube"},{"x":58398,"y":[1.0506725000000001,1.053435],"tipo":"Nube"},{"x":58399,"y":[1.0504525,1.0533450000000002],"tipo":"Nube"}],
[{"x":58358,"y":1.054505,"tipo":"Tenkan"},{"x":58359,"y":1.055065,"tipo":"Tenkan"},{"x":58360,"y":1.0551050000000002,"tipo":"Tenkan"},{"x":58361,"y":1.0551050000000002,"tipo":"Tenkan"},{"x":58362,"y":1.05496,"tipo":"Tenkan"},{"x":58363,"y":1.0549499999999998,"tipo":"Tenkan"},{"x":58364,"y":1.05491,"tipo":"Tenkan"},{"x":58365,"y":1.054765,"tipo":"Tenkan"},{"x":58366,"y":1.0545499999999999,"tipo":"Tenkan"},{"x":58367,"y":1.05453,"tipo":"Tenkan"},{"x":58368,"y":1.05453,"tipo":"Tenkan"},{"x":58369,"y":1.0544950000000002,"tipo":"Tenkan"},{"x":58370,"y":1.05449,"tipo":"Tenkan"},{"x":58371,"y":1.054405,"tipo":"Tenkan"},{"x":58372,"y":1.0539749999999999,"tipo":"Tenkan"},{"x":58373,"y":1.0539749999999999,"tipo":"Tenkan"},{"x":58374,"y":1.053915,"tipo":"Tenkan"},{"x":58375,"y":1.052575,"tipo":"Tenkan"},{"x":58376,"y":1.0522,"tipo":"Tenkan"},{"x":58377,"y":1.052125,"tipo":"Tenkan"},{"x":58378,"y":1.050735,"tipo":"Tenkan"},{"x":58379,"y":1.05054,"tipo":"Tenkan"},{"x":58380,"y":1.050445,"tipo":"Tenkan"},{"x":58381,"y":1.05061,"tipo":"Tenkan"},{"x":58382,"y":1.0510199999999998,"tipo":"Tenkan"},{"x":58383,"y":1.051075,"tipo":"Tenkan"},{"x":58384,"y":1.0510549999999999,"tipo":"Tenkan"},{"x":58385,"y":1.05092,"tipo":"Tenkan"},{"x":58386,"y":1.050135,"tipo":"Tenkan"},{"x":58387,"y":1.050065,"tipo":"Tenkan"},{"x":58388,"y":1.0501200000000002,"tipo":"Tenkan"},{"x":58389,"y":1.050115,"tipo":"Tenkan"},{"x":58390,"y":1.050195,"tipo":"Tenkan"},{"x":58391,"y":1.050115,"tipo":"Tenkan"},{"x":58392,"y":1.05036,"tipo":"Tenkan"},{"x":58393,"y":1.051075,"tipo":"Tenkan"},{"x":58394,"y":1.05107,"tipo":"Tenkan"},{"x":58395,"y":1.05107,"tipo":"Tenkan"},{"x":58396,"y":1.05134,"tipo":"Tenkan"},{"x":58397,"y":1.0515949999999998,"tipo":"Tenkan"},{"x":58398,"y":1.051655,"tipo":"Tenkan"},{"x":58399,"y":1.05098,"tipo":"Tenkan"}],
[{"x":58358,"y":1.05413,"tipo":"Kinjou"},{"x":58359,"y":1.05413,"tipo":"Kinjou"},{"x":58360,"y":1.05413,"tipo":"Kinjou"},{"x":58361,"y":1.05413,"tipo":"Kinjou"},{"x":58362,"y":1.0542,"tipo":"Kinjou"},{"x":58363,"y":1.05444,"tipo":"Kinjou"},{"x":58364,"y":1.054475,"tipo":"Kinjou"},{"x":58365,"y":1.054505,"tipo":"Kinjou"},{"x":58366,"y":1.0548350000000002,"tipo":"Kinjou"},{"x":58367,"y":1.0548350000000002,"tipo":"Kinjou"},{"x":58368,"y":1.0549650000000002,"tipo":"Kinjou"},{"x":58369,"y":1.0549650000000002,"tipo":"Kinjou"},{"x":58370,"y":1.0549650000000002,"tipo":"Kinjou"},{"x":58371,"y":1.054815,"tipo":"Kinjou"},{"x":58372,"y":1.054815,"tipo":"Kinjou"},{"x":58373,"y":1.054775,"tipo":"Kinjou"},{"x":58374,"y":1.05463,"tipo":"Kinjou"},{"x":58375,"y":1.05454,"tipo":"Kinjou"},{"x":58376,"y":1.0545200000000001,"tipo":"Kinjou"},{"x":58377,"y":1.0545200000000001,"tipo":"Kinjou"},{"x":58378,"y":1.0545200000000001,"tipo":"Kinjou"},{"x":58379,"y":1.0545149999999999,"tipo":"Kinjou"},{"x":58380,"y":1.05213,"tipo":"Kinjou"},{"x":58381,"y":1.05213,"tipo":"Kinjou"},{"x":58382,"y":1.05213,"tipo":"Kinjou"},{"x":58383,"y":1.05207,"tipo":"Kinjou"},{"x":58384,"y":1.05166,"tipo":"Kinjou"},{"x":58385,"y":1.051285,"tipo":"Kinjou"},{"x":58386,"y":1.05121,"tipo":"Kinjou"},{"x":58387,"y":1.05084,"tipo":"Kinjou"},{"x":58388,"y":1.05084,"tipo":"Kinjou"},{"x":58389,"y":1.05084,"tipo":"Kinjou"},{"x":58390,"y":1.05064,"tipo":"Kinjou"},{"x":58391,"y":1.05064,"tipo":"Kinjou"},{"x":58392,"y":1.05064,"tipo":"Kinjou"},{"x":58393,"y":1.0506199999999999,"tipo":"Kinjou"},{"x":58394,"y":1.0504850000000001,"tipo":"Kinjou"},{"x":58395,"y":1.05064,"tipo":"Kinjou"},{"x":58396,"y":1.05064,"tipo":"Kinjou"},{"x":58397,"y":1.05064,"tipo":"Kinjou"},{"x":58398,"y":1.05064,"tipo":"Kinjou"},{"x":58399,"y":1.05064,"tipo":"Kinjou"}]*/

[{"x":23820,"y":[1.07734,1.07772,1.07712,1.07733],"vo":{"open":1.07734,"close":1.07733,"low":1.07712,"high":1.07772,"id":23820,"date":"07:50","origen":"S","fecha":"2015.04.17","vol":750,"undefined":null},"indexLabel":"F"},{"x":23821,"y":[1.07733,1.07738,1.07694,1.07734],"vo":{"open":1.07733,"close":1.07734,"low":1.07694,"high":1.07738,"id":23821,"date":"08:10","origen":"S","fecha":"2015.04.17","vol":502,"undefined":null}},{"x":23822,"y":[1.07736,1.07766,1.07719,1.07734],"vo":{"open":1.07736,"close":1.07734,"low":1.07719,"high":1.07766,"id":23822,"date":"08:30","origen":"S","fecha":"2015.04.17","vol":496,"undefined":null}},{"x":23823,"y":[1.07733,1.07788,1.07564,1.07686],"vo":{"open":1.07733,"close":1.07686,"low":1.07564,"high":1.07788,"id":23823,"date":"08:50","origen":"S","fecha":"2015.04.17","vol":1504,"undefined":null}},{"x":23824,"y":[1.07686,1.0791,1.07686,1.07704],"vo":{"open":1.07686,"close":1.07704,"low":1.07686,"high":1.0791,"id":23824,"date":"09:10","origen":"S","fecha":"2015.04.17","vol":1913,"undefined":null}},{"x":23825,"y":[1.07707,1.07716,1.07417,1.07444],"vo":{"open":1.07707,"close":1.07444,"low":1.07417,"high":1.07716,"id":23825,"date":"09:30","origen":"S","fecha":"2015.04.17","vol":2180,"undefined":null}},{"x":23826,"y":[1.07446,1.07832,1.07378,1.07795],"vo":{"open":1.07446,"close":1.07795,"low":1.07378,"high":1.07832,"id":23826,"date":"09:50","origen":"S","fecha":"2015.04.17","vol":2226},"indexLabel":"F"}],
[{"x":23821,"y":[1.0768925,1.07806],"tipo":"Nube"},{"x":23822,"y":[1.0768925,1.0785],"tipo":"Nube"},{"x":23823,"y":[1.0768900000000001,1.0785],"tipo":"Nube"},{"x":23824,"y":[1.0764025,1.0785],"tipo":"Nube"},{"x":23825,"y":[1.0764225,1.078225],"tipo":"Nube"}],
[{"x":23821,"y":1.0769199999999999,"tipo":"Tenkan"},{"x":23822,"y":1.07733,"tipo":"Tenkan"},{"x":23823,"y":1.07741,"tipo":"Tenkan"},{"x":23824,"y":1.07676,"tipo":"Tenkan"},{"x":23825,"y":1.07676,"tipo":"Tenkan"}],
[{"x":23821,"y":1.07687,"tipo":"Kinjou"},{"x":23822,"y":1.07687,"tipo":"Kinjou"},{"x":23823,"y":1.07668,"tipo":"Kinjou"},{"x":23824,"y":1.07668,"tipo":"Kinjou"},{"x":23825,"y":1.07668,"tipo":"Kinjou"}]
];


var arrNiveles = [
]



socket.on('fnAdd', function(arrMini){
  /*google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function(){
    drawChart(arrMini);
  });*/
  /*var chart = new CanvasJS.Chart("chartContainer",
	{
		title:{
			text: "Candle Stick chart using risingColor property"
		},
		zoomEnabled: true,
		axisY: {
			includeZero:false,
			title: "Prices",
			prefix: "$ "
		},
		axisX: {
			interval:2,
			intervalType: "month",
			//valueFormatString: "MMM-YY",
			labelAngle: -45
		},
		data: [
		{
			type: "candlestick",
			risingColor: "#F79B8E",
			dataPoints: arrMini[0]
			
		}
		]
	});
	chart.render()/*.then(function(){console.log("FINNNN")});*/
	
	var chart2 = new CanvasJS.Chart("chartContainer2",
	{
		title:{
			text: "Candle Stick chart using risingColor property"
		},
		zoomEnabled: true,
		axisY: {
			includeZero:false,
			title: "Prices",
			prefix: "$ "
		},
		axisX: {
			interval:2,
			intervalType: "month",
			//valueFormatString: "MMM-YY",
			labelAngle: -45
		},
		data: [
		{
			type: "candlestick",
			risingColor: "#F79B8E",
			dataPoints: arrMini[1]
			
		}/*, {        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "SMA",
			//axisYType:"secondary",
			dataPoints: arrMini[3]
		}
		, {        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "WMA",
			//axisYType:"secondary",
			dataPoints: arrMini[4]
		}, {        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "Middle",
			//axisYType:"secondary",
			dataPoints: arrMini[5]
		}*/,
		{
			type: "candlestick",
			risingColor: "#f0f0f0",
			dataPoints: arrMini[0]
			
		}

		]
	});
	chart2.render();
 
});

  


// this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart(chart) {
  // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
  chart.zoomToIndexes( chart.dataProvider.length - 10, chart.dataProvider.length - 1 );
}


function render (data) {  
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {  
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  var data = [/*{
			type: "candlestick",
			risingColor: "#F79B8E",
			dataPoints: arrTodo
			
		}*/];
		
	var objLineas = {};
	for(var i = 1; i < arrTodo.length; i++){
		if(arrTodo[i][0].vo){
			arrTodo[0] = arrTodo[0].concat(arrTodo[i]);
		} else {
			switch(arrTodo[i][0].tipo){
				case 'Nube':
					arrTodo[1] = arrTodo[1].concat(arrTodo[i]);
				break;
				case 'Kinjou':
					arrTodo[2] = arrTodo[2].concat(arrTodo[i]);
				break;
				case 'Tenkan':
					arrTodo[3] = arrTodo[3].concat(arrTodo[i]);
				break;
				case 'Chinko':
					arrTodo[4] = arrTodo[4].concat(arrTodo[i]);
				break;
			}
			
			/*if(objLineas[arrTodo[i][0].tipo + arrTodo[i][0].y]){
				data[objLineas[arrTodo[i][0].tipo + arrTodo[i][0].y] - 1].dataPoints = data[objLineas[arrTodo[i][0].tipo + arrTodo[i][0].y] - 1].dataPoints.concat(arrTodo[i]);
					
				
			} else {
				
				data.push(
				{        
					type: "line",
					lineThickness:3,
					showInLegend: true,           
					name: "WMA",
					//axisYType:"secondary",
					dataPoints: arrTodo[i]
				});	
				objLineas[arrTodo[i][0].tipo + arrTodo[i][0].y] = data.length;
			}
			*/
		}
		/*data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "WMA",
			//axisYType:"secondary",
			dataPoints: arrTodo[i]
		});*/
	}
	
	data.push(
		{        
			type: "candlestick",
			risingColor: "#F79B8E",
			dataPoints: arrTodo[0]
		});
	data.push(
		{        
			type: "rangeSplineArea",
			//risingColor: "#F79B8E",
			dataPoints: arrTodo[1]
		});
	
	data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "Kinjou",
			//axisYType:"secondary",
			dataPoints: arrTodo[2]
		});

	data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "Tenkan",
			//axisYType:"secondary",
			dataPoints: arrTodo[3]
		});
	data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "Chinko",
			//axisYType:"secondary",
			dataPoints: arrTodo[4]
		});	
 /* for(var i = 0; i < arrNiveles.length; i++){
		data.push(
		{        
			type: "line",
			lineThickness:3,
			showInLegend: true,           
			name: "WMA",
			//axisYType:"secondary",
			dataPoints: arrNiveles[i]
		});
	}*/
	
	
  var chart = new CanvasJS.Chart("chartContainer",
	{
		title:{
			text: "Candle Stick chart using risingColor property"
		},
		zoomEnabled: true,
		axisY: {
			includeZero:false,
			title: "Prices",
			prefix: "$ "
		},
		axisX: {
			interval:2,
			intervalType: "month",
			//valueFormatString: "MMM-YY",
			labelAngle: -45
		},
		data: data
	});
	
	
	chart.render();
  
  
  
  return false;
}

function fnDisparaEvento(e) {  
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('message', message);
  return false;
}

function fnContarFolk(event){
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };
  socket.emit('contar', message);
  return false;

}



function drawChart(arr) {
	var data = google.visualization.arrayToDataTable(arr[1], true);



	var options = {
	legend:'none'
	};


	var chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));

	chart.draw(data, options);
}



