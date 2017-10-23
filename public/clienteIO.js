var socket = io.connect('http://localhost:8888', { 'forceNew': true });
//<script src="clienteIO.js"></script>
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})


var arrTodo = [
[
{"x":80,"y":[1.3671,1.36716,1.36643,1.36654],"vo":{"open":1.3671,"close":1.36654,"low":1.36643,"high":1.36716,"id":80,"date":"01:30","origen":"S","fecha":"2014.01.03","vol":208},"indexLabel":"V2"},
{"x":81,"y":[1.3665,1.36659,1.3658,1.3658],"vo":{"open":1.3665,"close":1.3658,"low":1.3658,"high":1.36659,"id":81,"date":"01:50","origen":"S","fecha":"2014.01.03","vol":422}},
{"x":82,"y":[1.36581,1.36583,1.36544,1.36563],"vo":{"open":1.36581,"close":1.36563,"low":1.36544,"high":1.36583,"id":82,"date":"02:10","origen":"S","fecha":"2014.01.03","vol":357}},
{"x":83,"y":[1.36564,1.36637,1.36564,1.36575],"vo":{"open":1.36564,"close":1.36575,"low":1.36564,"high":1.36637,"id":83,"date":"02:30","origen":"S","fecha":"2014.01.03","vol":320}},
{"x":84,"y":[1.36574,1.36597,1.36536,1.36573],"vo":{"open":1.36574,"close":1.36573,"low":1.36536,"high":1.36597,"id":84,"date":"02:50","origen":"S","fecha":"2014.01.03","vol":372}},
{"x":85,"y":[1.36575,1.3664,1.36554,1.36572],"vo":{"open":1.36575,"close":1.36572,"low":1.36554,"high":1.3664,"id":85,"date":"03:10","origen":"S","fecha":"2014.01.03","vol":582}},
{"x":86,"y":[1.36573,1.36607,1.3649,1.36494],"vo":{"open":1.36573,"close":1.36494,"low":1.3649,"high":1.36607,"id":86,"date":"03:30","origen":"S","fecha":"2014.01.03","vol":558}},
{"x":87,"y":[1.36494,1.36578,1.36493,1.36573],"vo":{"open":1.36494,"close":1.36573,"low":1.36493,"high":1.36578,"id":87,"date":"03:50","origen":"S","fecha":"2014.01.03","vol":451}},
{"x":88,"y":[1.36573,1.36622,1.36565,1.36574],"vo":{"open":1.36573,"close":1.36574,"low":1.36565,"high":1.36622,"id":88,"date":"04:10","origen":"S","fecha":"2014.01.03","vol":288}},
{"x":89,"y":[1.36573,1.36655,1.36564,1.36614],"vo":{"open":1.36573,"close":1.36614,"low":1.36564,"high":1.36655,"id":89,"date":"04:30","origen":"S","fecha":"2014.01.03","vol":346}},
{"x":90,"y":[1.36614,1.36615,1.36575,1.3661],"vo":{"open":1.36614,"close":1.3661,"low":1.36575,"high":1.36615,"id":90,"date":"04:50","origen":"S","fecha":"2014.01.03","vol":247}},
{"x":91,"y":[1.36609,1.36656,1.36582,1.36638],"vo":{"open":1.36609,"close":1.36638,"low":1.36582,"high":1.36656,"id":91,"date":"05:10","origen":"S","fecha":"2014.01.03","vol":409}},
{"x":92,"y":[1.36634,1.36642,1.36592,1.36604],"vo":{"open":1.36634,"close":1.36604,"low":1.36592,"high":1.36642,"id":92,"date":"05:30","origen":"S","fecha":"2014.01.03","vol":254}},
{"x":93,"y":[1.36605,1.36649,1.36602,1.36623],"vo":{"open":1.36605,"close":1.36623,"low":1.36602,"high":1.36649,"id":93,"date":"05:50","origen":"S","fecha":"2014.01.03","vol":347}},
{"x":94,"y":[1.36622,1.36634,1.3657,1.36576],"vo":{"open":1.36622,"close":1.36576,"low":1.3657,"high":1.36634,"id":94,"date":"06:10","origen":"S","fecha":"2014.01.03","vol":267}},
{"x":95,"y":[1.36575,1.3658,1.36511,1.3654],"vo":{"open":1.36575,"close":1.3654,"low":1.36511,"high":1.3658,"id":95,"date":"06:30","origen":"S","fecha":"2014.01.03","vol":374}},
{"x":96,"y":[1.36535,1.36535,1.36446,1.3649],"vo":{"open":1.36535,"close":1.3649,"low":1.36446,"high":1.36535,"id":96,"date":"06:50","origen":"S","fecha":"2014.01.03","vol":427}},
{"x":97,"y":[1.36488,1.36535,1.36467,1.36512],"vo":{"open":1.36488,"close":1.36512,"low":1.36467,"high":1.36535,"id":97,"date":"07:10","origen":"S","fecha":"2014.01.03","vol":344}},
{"x":98,"y":[1.36513,1.36531,1.365,1.3651],"vo":{"open":1.36513,"close":1.3651,"low":1.365,"high":1.36531,"id":98,"date":"07:30","origen":"S","fecha":"2014.01.03","vol":246}},
{"x":99,"y":[1.36512,1.36579,1.36487,1.36487],"vo":{"open":1.36512,"close":1.36487,"low":1.36487,"high":1.36579,"id":99,"date":"07:50","origen":"S","fecha":"2014.01.03","vol":384}},
{"x":100,"y":[1.36485,1.36616,1.36484,1.36607],"vo":{"open":1.36485,"close":1.36607,"low":1.36484,"high":1.36616,"id":100,"date":"08:10","origen":"S","fecha":"2014.01.03","vol":557},"indexLabel":"C2"},
],
[
{"x":80,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":81,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":82,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":83,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":84,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":85,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":86,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":87,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":88,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":89,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":90,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":91,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":92,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":93,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":94,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":95,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":96,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":97,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":98,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":99,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
],
[
{"x":80,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":81,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":82,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":83,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":84,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":85,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":86,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":87,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":88,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":89,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":90,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":91,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":92,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":93,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":94,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":95,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":96,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":97,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":98,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":99,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
],
[
{"x":80,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":81,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":82,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":83,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":84,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":85,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":86,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":87,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":88,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":89,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":90,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":91,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":92,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":93,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":94,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":95,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":96,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":97,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":98,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":99,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
],
[
{"x":80,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":81,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":82,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":83,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":84,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":85,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":86,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":87,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":88,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":89,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":90,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":91,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":92,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":93,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":94,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":95,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":96,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":97,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":98,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":99,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
],
[
{"x":90,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":91,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":92,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":93,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":94,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":95,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":96,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":97,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":98,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":99,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
],
[
{"x":100,"y":[1.36485,1.36616,1.36484,1.36607],"vo":{"open":1.36485,"close":1.36607,"low":1.36484,"high":1.36616,"id":100,"date":"08:10","origen":"S","fecha":"2014.01.03","vol":557},"indexLabel":"C2"},
{"x":101,"y":[1.36606,1.36612,1.36498,1.36519],"vo":{"open":1.36606,"close":1.36519,"low":1.36498,"high":1.36612,"id":101,"date":"08:30","origen":"S","fecha":"2014.01.03","vol":598}},
{"x":102,"y":[1.36519,1.36561,1.3645,1.36527],"vo":{"open":1.36519,"close":1.36527,"low":1.3645,"high":1.36561,"id":102,"date":"08:50","origen":"S","fecha":"2014.01.03","vol":721}},
{"x":103,"y":[1.36528,1.36558,1.36361,1.36371],"vo":{"open":1.36528,"close":1.36371,"low":1.36361,"high":1.36558,"id":103,"date":"09:10","origen":"S","fecha":"2014.01.03","vol":1035},"indexLabel":"V2"},
],
[
{"x":100,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":101,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":102,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
],
[
{"x":100,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":101,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":102,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
],
[
{"x":100,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":101,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":102,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
],
[
{"x":100,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":101,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":102,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
],
[
{"x":100,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":101,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":102,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
],
[
{"x":100,"y":1.3645,"tipo":"N","ini":97,"ptos":[97,101,102]},
{"x":101,"y":1.3645,"tipo":"N","ini":97,"ptos":[97,101,102]},
{"x":102,"y":1.3645,"tipo":"N","ini":97,"ptos":[97,101,102]},
],
[
{"x":103,"y":[1.36528,1.36558,1.36361,1.36371],"vo":{"open":1.36528,"close":1.36371,"low":1.36361,"high":1.36558,"id":103,"date":"09:10","origen":"S","fecha":"2014.01.03","vol":1035},"indexLabel":"V2"},
{"x":104,"y":[1.3637,1.36409,1.36326,1.36373],"vo":{"open":1.3637,"close":1.36373,"low":1.36326,"high":1.36409,"id":104,"date":"09:30","origen":"S","fecha":"2014.01.03","vol":846}},
{"x":105,"y":[1.36371,1.3642,1.3631,1.3631],"vo":{"open":1.36371,"close":1.3631,"low":1.3631,"high":1.3642,"id":105,"date":"09:50","origen":"S","fecha":"2014.01.03","vol":835}},
{"x":106,"y":[1.36294,1.36374,1.36284,1.36366],"vo":{"open":1.36294,"close":1.36366,"low":1.36284,"high":1.36374,"id":106,"date":"10:10","origen":"S","fecha":"2014.01.03","vol":828}},
{"x":107,"y":[1.36371,1.36494,1.36316,1.36465],"vo":{"open":1.36371,"close":1.36465,"low":1.36316,"high":1.36494,"id":107,"date":"10:30","origen":"S","fecha":"2014.01.03","vol":845}},
{"x":108,"y":[1.36467,1.36527,1.36434,1.36509],"vo":{"open":1.36467,"close":1.36509,"low":1.36434,"high":1.36527,"id":108,"date":"10:50","origen":"S","fecha":"2014.01.03","vol":664}},
{"x":109,"y":[1.36508,1.36544,1.36433,1.36499],"vo":{"open":1.36508,"close":1.36499,"low":1.36433,"high":1.36544,"id":109,"date":"11:10","origen":"S","fecha":"2014.01.03","vol":568}},
{"x":110,"y":[1.36497,1.36527,1.36453,1.36476],"vo":{"open":1.36497,"close":1.36476,"low":1.36453,"high":1.36527,"id":110,"date":"11:30","origen":"S","fecha":"2014.01.03","vol":520}},
{"x":111,"y":[1.36478,1.36508,1.36452,1.36488],"vo":{"open":1.36478,"close":1.36488,"low":1.36452,"high":1.36508,"id":111,"date":"11:50","origen":"S","fecha":"2014.01.03","vol":671}},
{"x":112,"y":[1.36489,1.36508,1.3641,1.36425],"vo":{"open":1.36489,"close":1.36425,"low":1.3641,"high":1.36508,"id":112,"date":"12:10","origen":"S","fecha":"2014.01.03","vol":598}},
{"x":113,"y":[1.36424,1.36437,1.36403,1.36423],"vo":{"open":1.36424,"close":1.36423,"low":1.36403,"high":1.36437,"id":113,"date":"12:30","origen":"S","fecha":"2014.01.03","vol":485}},
{"x":114,"y":[1.36422,1.36452,1.36361,1.36415],"vo":{"open":1.36422,"close":1.36415,"low":1.36361,"high":1.36452,"id":114,"date":"12:50","origen":"S","fecha":"2014.01.03","vol":704}},
{"x":115,"y":[1.36421,1.36554,1.36416,1.36544],"vo":{"open":1.36421,"close":1.36544,"low":1.36416,"high":1.36554,"id":115,"date":"13:10","origen":"S","fecha":"2014.01.03","vol":752}},
{"x":116,"y":[1.36543,1.36584,1.36491,1.36495],"vo":{"open":1.36543,"close":1.36495,"low":1.36491,"high":1.36584,"id":116,"date":"13:30","origen":"S","fecha":"2014.01.03","vol":690}},
{"x":117,"y":[1.36501,1.36523,1.36377,1.36389],"vo":{"open":1.36501,"close":1.36389,"low":1.36377,"high":1.36523,"id":117,"date":"13:50","origen":"S","fecha":"2014.01.03","vol":794}},
{"x":118,"y":[1.36391,1.36392,1.36219,1.36348],"vo":{"open":1.36391,"close":1.36348,"low":1.36219,"high":1.36392,"id":118,"date":"14:10","origen":"S","fecha":"2014.01.03","vol":1024}},
{"x":119,"y":[1.36345,1.36448,1.36329,1.36373],"vo":{"open":1.36345,"close":1.36373,"low":1.36329,"high":1.36448,"id":119,"date":"14:30","origen":"S","fecha":"2014.01.03","vol":750}},
{"x":120,"y":[1.36374,1.36472,1.36127,1.36152],"vo":{"open":1.36374,"close":1.36152,"low":1.36127,"high":1.36472,"id":120,"date":"14:50","origen":"S","fecha":"2014.01.03","vol":1027},"indexLabel":"V2"},
],
[
{"x":103,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":104,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":105,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":106,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":107,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":108,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":109,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":110,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":111,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":112,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":113,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":114,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":115,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":116,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":117,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":118,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
{"x":119,"y":1.3737,"tipo":"N","ini":2,"ptos":[2,33]},
],
[
{"x":103,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":104,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":105,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":106,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":107,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":108,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":109,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":110,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":111,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":112,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":113,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":114,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":115,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":116,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":117,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":118,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
{"x":119,"y":1.3742,"tipo":"N","ini":28,"ptos":[28,36]},
],
[
{"x":103,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":104,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":105,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":106,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":107,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":108,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":109,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":110,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":111,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":112,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":113,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":114,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":115,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":116,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":117,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":118,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
{"x":119,"y":1.3676,"tipo":"N","ini":57,"ptos":[57,62]},
],
[
{"x":103,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":104,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":105,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":106,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":107,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":108,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":109,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":110,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":111,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":112,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":113,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":114,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":115,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":116,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":117,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":118,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
{"x":119,"y":1.3672,"tipo":"N","ini":73,"ptos":[73,80]},
],
[
{"x":103,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":104,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":105,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":106,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":107,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":108,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":109,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":110,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":111,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":112,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":113,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":114,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":115,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":116,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":117,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":118,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
{"x":119,"y":1.3666,"tipo":"N","ini":90,"ptos":[90,91]},
],
[
{"x":103,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":104,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":105,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":106,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":107,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":108,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":109,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":110,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":111,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":112,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":113,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":114,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":115,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":116,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":117,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":118,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
{"x":119,"y":1.3658,"tipo":"N","ini":91,"ptos":[91,115,116]},
],

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
			if(objLineas[arrTodo[i][0].tipo + arrTodo[i][0].y]){
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



