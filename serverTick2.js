
var fs = require('fs');
var http = require("http");
var antVol = 1;
var _PORT = 9696; //Http port Node.js server will be listening on. Make sure that this is an open port and its the same as the one defined in MT4 indicator/EA.
	

http.createServer(function onRequest(request, response) {
	request.setEncoding("utf8");	
    var content = [];
	request.addListener("data", function(data) {
		content.push(data); //Collect the incoming data
	});
	

	//At the end of request call
	request.addListener("end", function() {
		//setup the response
		response.writeHead( 200, {"Content-Type": "text/plain"} );
            ms = content[0];
			if(ms.toString() != "")
			{
				
				
				var msg = ms.toString();	//Parse the ms into string		
				var reqObj = JSON.parse(msg);	// If the incoming message is in JSON format, you can parse it as JSON.
				 if(reqObj.nueva == "1"){
                    antVol = reqObj.vol;
                } else {
                    var aux = reqObj.vol;
                    reqObj.vol -= antVol;
                    antVol = aux;
                }
				fs.appendFileSync('./querysReconstruccion/_dataEURUSD2.txt', JSON.stringify(reqObj) + ",\n", (err) => {
					if (err) throw err;
						//console.log('The "data to append" was appended to file!');
					});
				outObj = {
                    
                    value: 'OK', //Just some random value to demonstrate
                    msg: "test message",
                    cta: 100
                }
				
					
				
				response.write(JSON.stringify(outObj));	//Write the response
				response.end(); //Close the response

			}
		/*} catch(e) {
			console.log("ERROR");
		}*/
		

	});

	
	
}).listen(_PORT);

console.log("Node.js server listening on port "+ _PORT);

