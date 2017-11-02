var socket = io.connect('http://localhost:8888', { 'forceNew': true });
//<script src="clienteIO.js"></script>
socket.on('messages', function(data) {  
  console.log(data);
  render(data);
})


var arrTodo = [
//[
//{"x":1,"y":[1.37517,1.37592,1.37372,1.37495],"vo":{"open":1.37517,"close":1.37495,"low":1.37372,"high":1.37592,"id":1,date":"23:10","origen":"S","fecha":"2014.01.01","vol":764}},
[{"x":2,"y":[1.37517,1.37592,1.37372,1.37495],"vo":{"open":1.37517,"close":1.37495,"low":1.37372,"high":1.37592,"id":2,"date":"23:10","origen":"S","fecha":"2014.01.01","vol":764}},{"x":3,"y":[1.37495,1.37569,1.37493,1.37536],"vo":{"open":1.37495,"close":1.37536,"low":1.37493,"high":1.37569,"id":3,"date":"23:30","origen":"S","fecha":"2014.01.01","vol":858}},{"x":4,"y":[1.37536,1.37687,1.37511,1.37677],"vo":{"open":1.37536,"close":1.37677,"low":1.37511,"high":1.37687,"id":4,"date":"23:50","origen":"S","fecha":"2014.01.01","vol":1265}},{"x":5,"y":[1.37677,1.3773,1.37649,1.3765],"vo":{"open":1.37677,"close":1.3765,"low":1.37649,"high":1.3773,"id":5,"date":"00:10","origen":"S","fecha":"2014.01.02","vol":714}},{"x":6,"y":[1.3765,1.37708,1.37626,1.37636],"vo":{"open":1.3765,"close":1.37636,"low":1.37626,"high":1.37708,"id":6,"date":"00:30","origen":"S","fecha":"2014.01.02","vol":1049}},{"x":7,"y":[1.37636,1.37699,1.37614,1.37662],"vo":{"open":1.37636,"close":1.37662,"low":1.37614,"high":1.37699,"id":7,"date":"00:50","origen":"S","fecha":"2014.01.02","vol":970}},{"x":8,"y":[1.37662,1.37664,1.37609,1.37615],"vo":{"open":1.37662,"close":1.37615,"low":1.37609,"high":1.37664,"id":8,"date":"01:10","origen":"S","fecha":"2014.01.02","vol":709}},{"x":9,"y":[1.37611,1.37623,1.37582,1.37623],"vo":{"open":1.37611,"close":1.37623,"low":1.37582,"high":1.37623,"id":9,"date":"01:30","origen":"S","fecha":"2014.01.02","vol":527}},{"x":10,"y":[1.3762,1.37652,1.37578,1.37603],"vo":{"open":1.3762,"close":1.37603,"low":1.37578,"high":1.37652,"id":10,"date":"01:50","origen":"S","fecha":"2014.01.02","vol":666}},{"x":11,"y":[1.37602,1.37602,1.37508,1.37514],"vo":{"open":1.37602,"close":1.37514,"low":1.37508,"high":1.37602,"id":11,"date":"02:10","origen":"S","fecha":"2014.01.02","vol":552}},{"x":12,"y":[1.37517,1.37662,1.37504,1.3763],"vo":{"open":1.37517,"close":1.3763,"low":1.37504,"high":1.37662,"id":12,"date":"02:30","origen":"S","fecha":"2014.01.02","vol":1338}},{"x":13,"y":[1.37635,1.3765,1.37596,1.37646],"vo":{"open":1.37635,"close":1.37646,"low":1.37596,"high":1.3765,"id":13,"date":"02:50","origen":"S","fecha":"2014.01.02","vol":917}},{"x":14,"y":[1.37644,1.37676,1.37625,1.37644],"vo":{"open":1.37644,"close":1.37644,"low":1.37625,"high":1.37676,"id":14,"date":"03:10","origen":"S","fecha":"2014.01.02","vol":681}},{"x":15,"y":[1.37644,1.3767,1.37637,1.3766],"vo":{"open":1.37644,"close":1.3766,"low":1.37637,"high":1.3767,"id":15,"date":"03:30","origen":"S","fecha":"2014.01.02","vol":690}},{"x":16,"y":[1.37664,1.37677,1.37642,1.37676],"vo":{"open":1.37664,"close":1.37676,"low":1.37642,"high":1.37677,"id":16,"date":"03:50","origen":"S","fecha":"2014.01.02","vol":676}},{"x":17,"y":[1.37677,1.37749,1.37662,1.3767],"vo":{"open":1.37677,"close":1.3767,"low":1.37662,"high":1.37749,"id":17,"date":"04:10","origen":"S","fecha":"2014.01.02","vol":857}},{"x":18,"y":[1.3767,1.37678,1.37633,1.37636],"vo":{"open":1.3767,"close":1.37636,"low":1.37633,"high":1.37678,"id":18,"date":"04:30","origen":"S","fecha":"2014.01.02","vol":461}},{"x":19,"y":[1.37637,1.3767,1.376,1.37609],"vo":{"open":1.37637,"close":1.37609,"low":1.376,"high":1.3767,"id":19,"date":"04:51","origen":"S","fecha":"2014.01.02","vol":481}},{"x":20,"y":[1.3761,1.37612,1.37524,1.37534],"vo":{"open":1.3761,"close":1.37534,"low":1.37524,"high":1.37612,"id":20,"date":"05:10","origen":"S","fecha":"2014.01.02","vol":656}},{"x":21,"y":[1.37532,1.37551,1.3747,1.37474],"vo":{"open":1.37532,"close":1.37474,"low":1.3747,"high":1.37551,"id":21,"date":"05:30","origen":"S","fecha":"2014.01.02","vol":981}},{"x":22,"y":[1.3747,1.37476,1.37441,1.37465],"vo":{"open":1.3747,"close":1.37465,"low":1.37441,"high":1.37476,"id":22,"date":"05:50","origen":"S","fecha":"2014.01.02","vol":900}},{"x":23,"y":[1.37466,1.37495,1.37465,1.37494],"vo":{"open":1.37466,"close":1.37494,"low":1.37465,"high":1.37495,"id":23,"date":"06:10","origen":"S","fecha":"2014.01.02","vol":426}},{"x":24,"y":[1.37494,1.37538,1.37485,1.37537],"vo":{"open":1.37494,"close":1.37537,"low":1.37485,"high":1.37538,"id":24,"date":"06:30","origen":"S","fecha":"2014.01.02","vol":1510}},{"x":25,"y":[1.37543,1.37583,1.37532,1.37567],"vo":{"open":1.37543,"close":1.37567,"low":1.37532,"high":1.37583,"id":25,"date":"06:50","origen":"S","fecha":"2014.01.02","vol":1275}},{"x":26,"y":[1.37568,1.3758,1.37531,1.37571],"vo":{"open":1.37568,"close":1.37571,"low":1.37531,"high":1.3758,"id":26,"date":"07:10","origen":"S","fecha":"2014.01.02","vol":551}},{"x":27,"y":[1.37568,1.37571,1.37468,1.37494],"vo":{"open":1.37568,"close":1.37494,"low":1.37468,"high":1.37571,"id":27,"date":"07:30","origen":"S","fecha":"2014.01.02","vol":663}},{"x":28,"y":[1.37493,1.37545,1.3745,1.37452],"vo":{"open":1.37493,"close":1.37452,"low":1.3745,"high":1.37545,"id":28,"date":"07:50","origen":"S","fecha":"2014.01.02","vol":843}},{"x":29,"y":[1.37453,1.37492,1.37421,1.37479],"vo":{"open":1.37453,"close":1.37479,"low":1.37421,"high":1.37492,"id":29,"date":"08:10","origen":"S","fecha":"2014.01.02","vol":535}},{"x":30,"y":[1.37484,1.37485,1.37323,1.37338],"vo":{"open":1.37484,"close":1.37338,"low":1.37323,"high":1.37485,"id":30,"date":"08:30","origen":"S","fecha":"2014.01.02","vol":831}},{"x":31,"y":[1.37338,1.37342,1.37195,1.37241],"vo":{"open":1.37338,"close":1.37241,"low":1.37195,"high":1.37342,"id":31,"date":"08:50","origen":"S","fecha":"2014.01.02","vol":988}},{"x":32,"y":[1.37243,1.37264,1.37159,1.37184],"vo":{"open":1.37243,"close":1.37184,"low":1.37159,"high":1.37264,"id":32,"date":"09:10","origen":"S","fecha":"2014.01.02","vol":1099}},{"x":33,"y":[1.37184,1.37403,1.37177,1.3731],"vo":{"open":1.37184,"close":1.3731,"low":1.37177,"high":1.37403,"id":33,"date":"09:30","origen":"S","fecha":"2014.01.02","vol":972}},{"x":34,"y":[1.3731,1.37369,1.37231,1.3734],"vo":{"open":1.3731,"close":1.3734,"low":1.37231,"high":1.37369,"id":34,"date":"09:50","origen":"S","fecha":"2014.01.02","vol":1003}},{"x":35,"y":[1.37341,1.37358,1.37226,1.37277],"vo":{"open":1.37341,"close":1.37277,"low":1.37226,"high":1.37358,"id":35,"date":"10:10","origen":"S","fecha":"2014.01.02","vol":935}},{"x":36,"y":[1.37274,1.37304,1.37224,1.37303],"vo":{"open":1.37274,"close":1.37303,"low":1.37224,"high":1.37304,"id":36,"date":"10:30","origen":"S","fecha":"2014.01.02","vol":935}},{"x":37,"y":[1.37299,1.3742,1.37271,1.37292],"vo":{"open":1.37299,"close":1.37292,"low":1.37271,"high":1.3742,"id":37,"date":"10:50","origen":"S","fecha":"2014.01.02","vol":1031}},{"x":38,"y":[1.37292,1.37293,1.372,1.37225],"vo":{"open":1.37292,"close":1.37225,"low":1.372,"high":1.37293,"id":38,"date":"11:10","origen":"S","fecha":"2014.01.02","vol":822}},{"x":39,"y":[1.37224,1.37279,1.37203,1.37279],"vo":{"open":1.37224,"close":1.37279,"low":1.37203,"high":1.37279,"id":39,"date":"11:30","origen":"S","fecha":"2014.01.02","vol":797}},{"x":40,"y":[1.37279,1.37286,1.37012,1.37037],"vo":{"open":1.37279,"close":1.37037,"low":1.37012,"high":1.37286,"id":40,"date":"11:50","origen":"S","fecha":"2014.01.02","vol":1168}},{"x":41,"y":[1.37037,1.37045,1.36837,1.36889],"vo":{"open":1.37037,"close":1.36889,"low":1.36837,"high":1.37045,"id":41,"date":"12:10","origen":"S","fecha":"2014.01.02","vol":1245}},{"x":42,"y":[1.36888,1.3695,1.36841,1.36929],"vo":{"open":1.36888,"close":1.36929,"low":1.36841,"high":1.3695,"id":42,"date":"12:30","origen":"S","fecha":"2014.01.02","vol":791}},{"x":43,"y":[1.36934,1.36936,1.36687,1.36762],"vo":{"open":1.36934,"close":1.36762,"low":1.36687,"high":1.36936,"id":43,"date":"12:50","origen":"S","fecha":"2014.01.02","vol":995}},{"x":44,"y":[1.36762,1.3684,1.36654,1.36678],"vo":{"open":1.36762,"close":1.36678,"low":1.36654,"high":1.3684,"id":44,"date":"13:10","origen":"S","fecha":"2014.01.02","vol":1158}},{"x":45,"y":[1.36677,1.36686,1.36545,1.36637],"vo":{"open":1.36677,"close":1.36637,"low":1.36545,"high":1.36686,"id":45,"date":"13:30","origen":"S","fecha":"2014.01.02","vol":1091}},{"x":46,"y":[1.3664,1.36659,1.36373,1.36488],"vo":{"open":1.3664,"close":1.36488,"low":1.36373,"high":1.36659,"id":46,"date":"13:50","origen":"S","fecha":"2014.01.02","vol":1218}},{"x":47,"y":[1.36489,1.36614,1.3642,1.3642],"vo":{"open":1.36489,"close":1.3642,"low":1.3642,"high":1.36614,"id":47,"date":"14:10","origen":"S","fecha":"2014.01.02","vol":1109}},{"x":48,"y":[1.36417,1.36523,1.36353,1.36411],"vo":{"open":1.36417,"close":1.36411,"low":1.36353,"high":1.36523,"id":48,"date":"14:30","origen":"S","fecha":"2014.01.02","vol":1276}},{"x":49,"y":[1.36411,1.36549,1.36411,1.36539],"vo":{"open":1.36411,"close":1.36539,"low":1.36411,"high":1.36549,"id":49,"date":"14:50","origen":"S","fecha":"2014.01.02","vol":1177}},{"x":50,"y":[1.36539,1.36572,1.3644,1.36495],"vo":{"open":1.36539,"close":1.36495,"low":1.3644,"high":1.36572,"id":50,"date":"15:10","origen":"S","fecha":"2014.01.02","vol":1082}},{"x":51,"y":[1.36491,1.36569,1.36432,1.36466],"vo":{"open":1.36491,"close":1.36466,"low":1.36432,"high":1.36569,"id":51,"date":"15:30","origen":"S","fecha":"2014.01.02","vol":1239}},{"x":52,"y":[1.36466,1.36597,1.36363,1.36539],"vo":{"open":1.36466,"close":1.36539,"low":1.36363,"high":1.36597,"id":52,"date":"15:50","origen":"S","fecha":"2014.01.02","vol":1409}},{"x":53,"y":[1.3654,1.36581,1.36392,1.36439],"vo":{"open":1.3654,"close":1.36439,"low":1.36392,"high":1.36581,"id":53,"date":"16:10","origen":"S","fecha":"2014.01.02","vol":1230}},{"x":54,"y":[1.36436,1.36438,1.36294,1.36436],"vo":{"open":1.36436,"close":1.36436,"low":1.36294,"high":1.36438,"id":54,"date":"16:30","origen":"S","fecha":"2014.01.02","vol":1148}},{"x":55,"y":[1.36437,1.36681,1.36358,1.36652],"vo":{"open":1.36437,"close":1.36652,"low":1.36358,"high":1.36681,"id":55,"date":"16:50","origen":"S","fecha":"2014.01.02","vol":1236}},{"x":56,"y":[1.36653,1.36666,1.36554,1.36557],"vo":{"open":1.36653,"close":1.36557,"low":1.36554,"high":1.36666,"id":56,"date":"17:10","origen":"S","fecha":"2014.01.02","vol":834}},{"x":57,"y":[1.36559,1.36752,1.36559,1.36746],"vo":{"open":1.36559,"close":1.36746,"low":1.36559,"high":1.36752,"id":57,"date":"17:30","origen":"S","fecha":"2014.01.02","vol":747}},{"x":58,"y":[1.36746,1.36764,1.36694,1.36708],"vo":{"open":1.36746,"close":1.36708,"low":1.36694,"high":1.36764,"id":58,"date":"17:50","origen":"S","fecha":"2014.01.02","vol":711}},{"x":59,"y":[1.36706,1.3674,1.36625,1.36657],"vo":{"open":1.36706,"close":1.36657,"low":1.36625,"high":1.3674,"id":59,"date":"18:10","origen":"S","fecha":"2014.01.02","vol":555}},{"x":60,"y":[1.36657,1.36695,1.36633,1.36649],"vo":{"open":1.36657,"close":1.36649,"low":1.36633,"high":1.36695,"id":60,"date":"18:30","origen":"S","fecha":"2014.01.02","vol":498}},{"x":61,"y":[1.36649,1.36745,1.36639,1.36735],"vo":{"open":1.36649,"close":1.36735,"low":1.36639,"high":1.36745,"id":61,"date":"18:50","origen":"S","fecha":"2014.01.02","vol":603}},{"x":62,"y":[1.36731,1.36754,1.36704,1.36732],"vo":{"open":1.36731,"close":1.36732,"low":1.36704,"high":1.36754,"id":62,"date":"19:10","origen":"S","fecha":"2014.01.02","vol":431}},{"x":63,"y":[1.36729,1.3676,1.36696,1.36697],"vo":{"open":1.36729,"close":1.36697,"low":1.36696,"high":1.3676,"id":63,"date":"19:30","origen":"S","fecha":"2014.01.02","vol":417}},{"x":64,"y":[1.36696,1.36732,1.36665,1.36666],"vo":{"open":1.36696,"close":1.36666,"low":1.36665,"high":1.36732,"id":64,"date":"19:50","origen":"S","fecha":"2014.01.02","vol":467}},{"x":65,"y":[1.36665,1.36682,1.36609,1.36617],"vo":{"open":1.36665,"close":1.36617,"low":1.36609,"high":1.36682,"id":65,"date":"20:10","origen":"S","fecha":"2014.01.02","vol":596}},{"x":66,"y":[1.36617,1.36643,1.36557,1.36591],"vo":{"open":1.36617,"close":1.36591,"low":1.36557,"high":1.36643,"id":66,"date":"20:30","origen":"S","fecha":"2014.01.02","vol":573}},{"x":67,"y":[1.36589,1.36596,1.36507,1.3654],"vo":{"open":1.36589,"close":1.3654,"low":1.36507,"high":1.36596,"id":67,"date":"20:50","origen":"S","fecha":"2014.01.02","vol":591}},{"x":68,"y":[1.3654,1.36575,1.36526,1.36533],"vo":{"open":1.3654,"close":1.36533,"low":1.36526,"high":1.36575,"id":68,"date":"21:10","origen":"S","fecha":"2014.01.02","vol":333}},{"x":69,"y":[1.36533,1.36565,1.36507,1.36556],"vo":{"open":1.36533,"close":1.36556,"low":1.36507,"high":1.36565,"id":69,"date":"21:30","origen":"S","fecha":"2014.01.02","vol":322}},{"x":70,"y":[1.36556,1.36712,1.36528,1.36706],"vo":{"open":1.36556,"close":1.36706,"low":1.36528,"high":1.36712,"id":70,"date":"21:50","origen":"S","fecha":"2014.01.02","vol":590}},{"x":71,"y":[1.36705,1.36709,1.36644,1.36678],"vo":{"open":1.36705,"close":1.36678,"low":1.36644,"high":1.36709,"id":71,"date":"22:10","origen":"S","fecha":"2014.01.02","vol":314}},{"x":72,"y":[1.36677,1.36685,1.36651,1.36651],"vo":{"open":1.36677,"close":1.36651,"low":1.36651,"high":1.36685,"id":72,"date":"22:30","origen":"S","fecha":"2014.01.02","vol":306}},{"x":73,"y":[1.36652,1.36722,1.36651,1.36658],"vo":{"open":1.36652,"close":1.36658,"low":1.36651,"high":1.36722,"id":73,"date":"22:50","origen":"S","fecha":"2014.01.02","vol":356}},{"x":74,"y":[1.36659,1.36687,1.36634,1.3664],"vo":{"open":1.36659,"close":1.3664,"low":1.36634,"high":1.36687,"id":74,"date":"23:10","origen":"S","fecha":"2014.01.02","vol":207}},{"x":75,"y":[1.3664,1.36649,1.36595,1.36603],"vo":{"open":1.3664,"close":1.36603,"low":1.36595,"high":1.36649,"id":75,"date":"23:30","origen":"S","fecha":"2014.01.02","vol":197}},{"x":76,"y":[1.36604,1.36676,1.36595,1.3666],"vo":{"open":1.36604,"close":1.3666,"low":1.36595,"high":1.36676,"id":76,"date":"23:50","origen":"S","fecha":"2014.01.02","vol":267}},{"x":77,"y":[1.36658,1.36661,1.3662,1.36638],"vo":{"open":1.36658,"close":1.36638,"low":1.3662,"high":1.36661,"id":77,"date":"00:10","origen":"S","fecha":"2014.01.03","vol":143}},{"x":78,"y":[1.36642,1.36658,1.36621,1.3665],"vo":{"open":1.36642,"close":1.3665,"low":1.36621,"high":1.36658,"id":78,"date":"00:30","origen":"S","fecha":"2014.01.03","vol":124}},{"x":79,"y":[1.36651,1.36689,1.36635,1.36688],"vo":{"open":1.36651,"close":1.36688,"low":1.36635,"high":1.36689,"id":79,"date":"00:50","origen":"S","fecha":"2014.01.03","vol":180}},{"x":80,"y":[1.36686,1.36709,1.36678,1.36707],"vo":{"open":1.36686,"close":1.36707,"low":1.36678,"high":1.36709,"id":80,"date":"01:10","origen":"S","fecha":"2014.01.03","vol":166}},{"x":81,"y":[1.3671,1.36716,1.36643,1.36654],"vo":{"open":1.3671,"close":1.36654,"low":1.36643,"high":1.36716,"id":81,"date":"01:30","origen":"S","fecha":"2014.01.03","vol":208}},{"x":82,"y":[1.3665,1.36659,1.3658,1.3658],"vo":{"open":1.3665,"close":1.3658,"low":1.3658,"high":1.36659,"id":82,"date":"01:50","origen":"S","fecha":"2014.01.03","vol":422}},{"x":83,"y":[1.36581,1.36583,1.36544,1.36563],"vo":{"open":1.36581,"close":1.36563,"low":1.36544,"high":1.36583,"id":83,"date":"02:10","origen":"S","fecha":"2014.01.03","vol":357}},{"x":84,"y":[1.36564,1.36637,1.36564,1.36575],"vo":{"open":1.36564,"close":1.36575,"low":1.36564,"high":1.36637,"id":84,"date":"02:30","origen":"S","fecha":"2014.01.03","vol":320}},{"x":85,"y":[1.36574,1.36597,1.36536,1.36573],"vo":{"open":1.36574,"close":1.36573,"low":1.36536,"high":1.36597,"id":85,"date":"02:50","origen":"S","fecha":"2014.01.03","vol":372}},{"x":86,"y":[1.36575,1.3664,1.36554,1.36572],"vo":{"open":1.36575,"close":1.36572,"low":1.36554,"high":1.3664,"id":86,"date":"03:10","origen":"S","fecha":"2014.01.03","vol":582}},{"x":87,"y":[1.36573,1.36607,1.3649,1.36494],"vo":{"open":1.36573,"close":1.36494,"low":1.3649,"high":1.36607,"id":87,"date":"03:30","origen":"S","fecha":"2014.01.03","vol":558}},{"x":88,"y":[1.36494,1.36578,1.36493,1.36573],"vo":{"open":1.36494,"close":1.36573,"low":1.36493,"high":1.36578,"id":88,"date":"03:50","origen":"S","fecha":"2014.01.03","vol":451}},{"x":89,"y":[1.36573,1.36622,1.36565,1.36574],"vo":{"open":1.36573,"close":1.36574,"low":1.36565,"high":1.36622,"id":89,"date":"04:10","origen":"S","fecha":"2014.01.03","vol":288}},{"x":90,"y":[1.36573,1.36655,1.36564,1.36614],"vo":{"open":1.36573,"close":1.36614,"low":1.36564,"high":1.36655,"id":90,"date":"04:30","origen":"S","fecha":"2014.01.03","vol":346}},{"x":91,"y":[1.36614,1.36615,1.36575,1.3661],"vo":{"open":1.36614,"close":1.3661,"low":1.36575,"high":1.36615,"id":91,"date":"04:50","origen":"S","fecha":"2014.01.03","vol":247}},{"x":92,"y":[1.36609,1.36656,1.36582,1.36638],"vo":{"open":1.36609,"close":1.36638,"low":1.36582,"high":1.36656,"id":92,"date":"05:10","origen":"S","fecha":"2014.01.03","vol":409}},{"x":93,"y":[1.36634,1.36642,1.36592,1.36604],"vo":{"open":1.36634,"close":1.36604,"low":1.36592,"high":1.36642,"id":93,"date":"05:30","origen":"S","fecha":"2014.01.03","vol":254}},{"x":94,"y":[1.36605,1.36649,1.36602,1.36623],"vo":{"open":1.36605,"close":1.36623,"low":1.36602,"high":1.36649,"id":94,"date":"05:50","origen":"S","fecha":"2014.01.03","vol":347}},{"x":95,"y":[1.36622,1.36634,1.3657,1.36576],"vo":{"open":1.36622,"close":1.36576,"low":1.3657,"high":1.36634,"id":95,"date":"06:10","origen":"S","fecha":"2014.01.03","vol":267}},{"x":96,"y":[1.36575,1.3658,1.36511,1.3654],"vo":{"open":1.36575,"close":1.3654,"low":1.36511,"high":1.3658,"id":96,"date":"06:30","origen":"S","fecha":"2014.01.03","vol":374}},{"x":97,"y":[1.36535,1.36535,1.36446,1.3649],"vo":{"open":1.36535,"close":1.3649,"low":1.36446,"high":1.36535,"id":97,"date":"06:50","origen":"S","fecha":"2014.01.03","vol":427}},{"x":98,"y":[1.36488,1.36535,1.36467,1.36512],"vo":{"open":1.36488,"close":1.36512,"low":1.36467,"high":1.36535,"id":98,"date":"07:10","origen":"S","fecha":"2014.01.03","vol":344}},{"x":99,"y":[1.36513,1.36531,1.365,1.3651],"vo":{"open":1.36513,"close":1.3651,"low":1.365,"high":1.36531,"id":99,"date":"07:30","origen":"S","fecha":"2014.01.03","vol":246}},{"x":100,"y":[1.36512,1.36579,1.36487,1.36487],"vo":{"open":1.36512,"close":1.36487,"low":1.36487,"high":1.36579,"id":100,"date":"07:50","origen":"S","fecha":"2014.01.03","vol":384}},{"x":101,"y":[1.36485,1.36616,1.36484,1.36607],"vo":{"open":1.36485,"close":1.36607,"low":1.36484,"high":1.36616,"id":101,"date":"08:10","origen":"S","fecha":"2014.01.03","vol":557}},{"x":102,"y":[1.36606,1.36612,1.36498,1.36519],"vo":{"open":1.36606,"close":1.36519,"low":1.36498,"high":1.36612,"id":102,"date":"08:30","origen":"S","fecha":"2014.01.03","vol":598}},{"x":103,"y":[1.36519,1.36561,1.3645,1.36527],"vo":{"open":1.36519,"close":1.36527,"low":1.3645,"high":1.36561,"id":103,"date":"08:50","origen":"S","fecha":"2014.01.03","vol":721}},{"x":104,"y":[1.36528,1.36558,1.36361,1.36371],"vo":{"open":1.36528,"close":1.36371,"low":1.36361,"high":1.36558,"id":104,"date":"09:10","origen":"S","fecha":"2014.01.03","vol":1035}},{"x":105,"y":[1.3637,1.36409,1.36326,1.36373],"vo":{"open":1.3637,"close":1.36373,"low":1.36326,"high":1.36409,"id":105,"date":"09:30","origen":"S","fecha":"2014.01.03","vol":846}},{"x":106,"y":[1.36371,1.3642,1.3631,1.3631],"vo":{"open":1.36371,"close":1.3631,"low":1.3631,"high":1.3642,"id":106,"date":"09:50","origen":"S","fecha":"2014.01.03","vol":835}},{"x":107,"y":[1.36294,1.36374,1.36284,1.36366],"vo":{"open":1.36294,"close":1.36366,"low":1.36284,"high":1.36374,"id":107,"date":"10:10","origen":"S","fecha":"2014.01.03","vol":828}},{"x":108,"y":[1.36371,1.36494,1.36316,1.36465],"vo":{"open":1.36371,"close":1.36465,"low":1.36316,"high":1.36494,"id":108,"date":"10:30","origen":"S","fecha":"2014.01.03","vol":845}},{"x":109,"y":[1.36467,1.36527,1.36434,1.36509],"vo":{"open":1.36467,"close":1.36509,"low":1.36434,"high":1.36527,"id":109,"date":"10:50","origen":"S","fecha":"2014.01.03","vol":664}},{"x":110,"y":[1.36508,1.36544,1.36433,1.36499],"vo":{"open":1.36508,"close":1.36499,"low":1.36433,"high":1.36544,"id":110,"date":"11:10","origen":"S","fecha":"2014.01.03","vol":568}},{"x":111,"y":[1.36497,1.36527,1.36453,1.36476],"vo":{"open":1.36497,"close":1.36476,"low":1.36453,"high":1.36527,"id":111,"date":"11:30","origen":"S","fecha":"2014.01.03","vol":520}},{"x":112,"y":[1.36478,1.36508,1.36452,1.36488],"vo":{"open":1.36478,"close":1.36488,"low":1.36452,"high":1.36508,"id":112,"date":"11:50","origen":"S","fecha":"2014.01.03","vol":671}},{"x":113,"y":[1.36489,1.36508,1.3641,1.36425],"vo":{"open":1.36489,"close":1.36425,"low":1.3641,"high":1.36508,"id":113,"date":"12:10","origen":"S","fecha":"2014.01.03","vol":598}},{"x":114,"y":[1.36424,1.36437,1.36403,1.36423],"vo":{"open":1.36424,"close":1.36423,"low":1.36403,"high":1.36437,"id":114,"date":"12:30","origen":"S","fecha":"2014.01.03","vol":485}},{"x":115,"y":[1.36422,1.36452,1.36361,1.36415],"vo":{"open":1.36422,"close":1.36415,"low":1.36361,"high":1.36452,"id":115,"date":"12:50","origen":"S","fecha":"2014.01.03","vol":704}},{"x":116,"y":[1.36421,1.36554,1.36416,1.36544],"vo":{"open":1.36421,"close":1.36544,"low":1.36416,"high":1.36554,"id":116,"date":"13:10","origen":"S","fecha":"2014.01.03","vol":752}},{"x":117,"y":[1.36543,1.36584,1.36491,1.36495],"vo":{"open":1.36543,"close":1.36495,"low":1.36491,"high":1.36584,"id":117,"date":"13:30","origen":"S","fecha":"2014.01.03","vol":690}},{"x":118,"y":[1.36501,1.36523,1.36377,1.36389],"vo":{"open":1.36501,"close":1.36389,"low":1.36377,"high":1.36523,"id":118,"date":"13:50","origen":"S","fecha":"2014.01.03","vol":794}},{"x":119,"y":[1.36391,1.36392,1.36219,1.36348],"vo":{"open":1.36391,"close":1.36348,"low":1.36219,"high":1.36392,"id":119,"date":"14:10","origen":"S","fecha":"2014.01.03","vol":1024}},{"x":120,"y":[1.36345,1.36448,1.36329,1.36373],"vo":{"open":1.36345,"close":1.36373,"low":1.36329,"high":1.36448,"id":120,"date":"14:30","origen":"S","fecha":"2014.01.03","vol":750}},{"x":121,"y":[1.36374,1.36472,1.36127,1.36152],"vo":{"open":1.36374,"close":1.36152,"low":1.36127,"high":1.36472,"id":121,"date":"14:50","origen":"S","fecha":"2014.01.03","vol":1027}},{"x":122,"y":[1.36154,1.36189,1.36107,1.36157],"vo":{"open":1.36154,"close":1.36157,"low":1.36107,"high":1.36189,"id":122,"date":"15:10","origen":"S","fecha":"2014.01.03","vol":1123}},{"x":123,"y":[1.36157,1.3618,1.36045,1.36093],"vo":{"open":1.36157,"close":1.36093,"low":1.36045,"high":1.3618,"id":123,"date":"15:30","origen":"S","fecha":"2014.01.03","vol":1098}},{"x":124,"y":[1.36092,1.36157,1.36021,1.36038],"vo":{"open":1.36092,"close":1.36038,"low":1.36021,"high":1.36157,"id":124,"date":"15:50","origen":"S","fecha":"2014.01.03","vol":1083}},{"x":125,"y":[1.36036,1.3612,1.35992,1.36098],"vo":{"open":1.36036,"close":1.36098,"low":1.35992,"high":1.3612,"id":125,"date":"16:10","origen":"S","fecha":"2014.01.03","vol":691},"indexLabel":"F"}],
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



