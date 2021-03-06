/*
For help and support, please visit http://penguintraders.com

https://github.com/PenguinTraders/MT4-Node.js
http://www.forexfactory.com/saver0
*/

#include <stdlib.mqh>
#include <WinUser32.mqh>
/*
#property indicator_separate_window
#property indicator_buffers 1
#property indicator_color1 DodgerBlue
*/

#include <mq4-http.mqh>
#include <hash.mqh>
#include <json.mqh>


extern string hostIp = "localhost";
extern int hostPort = 8989;//8080;
extern int maxBarsToLoad = 500;

MqlNet INet;
double DataBuffer[];
string _obj = "exampleIndi_";

int deinit() {

	//Delete any objects created on the chart by the indicator
   for (int index = 0; index < ObjectsTotal(); index++)
	{
		if (StringFind(ObjectName(index), _obj) == 0)
		{
			ObjectDelete(ObjectName(index));
			index--;
		}
	}
	
	
   return(0);
}

int init() {

	IndicatorBuffers(1);
	
	/*SetIndexStyle(0,DRAW_LINE);
   SetIndexBuffer(0,DataBuffer);  
	*/
   return(0);
}



datetime expTime;
bool IsNewBar() {
   if (expTime==Time[0]) {
      return (false);
   }
   expTime=Time[0];
   return (true);
}


bool sendVela(string opt, double O2, double H2, double L2, double C2, double spread, string fecha, double cierre){
   
   //---- Candle1 OHLC
  /* double O1=NormalizeDouble(iOpen(Symbol(),PERIOD_H1,2),5);
   double H1=NormalizeDouble(iHigh(Symbol(),PERIOD_H1,2),5);
   double L1=NormalizeDouble(iLow(Symbol(),PERIOD_H1,2),5);
   double C1=NormalizeDouble(iClose(Symbol(),PERIOD_H1,2),5);*/
   //---- Candle2 OHLC
   
   //---- Candle3 OHLC
   /*double O3=NormalizeDouble(iOpen(Symbol(),PERIOD_H1,0),5);
   double H3=NormalizeDouble(iHigh(Symbol(),PERIOD_H1,0),5);
   double L3=NormalizeDouble(iLow(Symbol(),PERIOD_H1,0),5);
   double C3=NormalizeDouble(iClose(Symbol(),PERIOD_H1,0),5);*/
   
   string var1 = TimeToStr(TimeCurrent(),TIME_DATE|TIME_SECONDS);
   //string reqest = "[{\"open\": \"" + O1 + "\", \"close\": \"" + C1 + "\", \"high\": \"" + H1 + "\", \"low\": \"" + L1 + "\"}, {\"open\": \"" + O2 + "\", \"close\": \"" + C2 + "\", \"high\": \"" + H2 + "\", \"low\": \"" + L2 + "\"}, {\"open\": \"" + O3 + "\", \"close\": \"" + C3 + "\", \"high\": \"" + H3 + "\", \"low\": \"" + L3 + "\"}]";
	string reqest = "{\"open\": \"" + O2 + "\", \"close\": \"" + C2 + "\", \"high\": \"" + H2 + "\", \"low\": \"" + L2 + "\", \"spread\": \"" + spread + "\", \"opt\": \"" + opt + "\", \"date\": \"" + fecha + "\", \"close\": \"" + cierre + "\", \"fecha\": \"" + var1 + "\", \"vol\": \"" + Volume[0] + "\"}";
	//Create the response string
	string response = "";
	
	//Make the connection
	if(!INet.Open(hostIp,hostPort)) return(0);
	if(!INet.Request("POST","/",response,false, true, reqest, false))
	{
		printDebug("-Err download ");
		return(0);
	}
	
	double calculated_value = 0; //To store the calculated value from the server
	
	//The response string should now contain the response that the Node.js server gave with the data that we need
	if (response != "") // If the respone isn't empty
	{
		
		Alert(response);
		JSONParser *parser = new JSONParser(); //Since the response is a JSON object, let's parse it
		JSONValue *jv = parser.parse(response);
		
		//If the object looks good
	/*	if (jv == NULL) {
			printDebug("error:"+(string)parser.getErrorCode()+parser.getErrorMessage());
		} else {

			JSONObject *jo    = jv;
         int _GetLastError=0;
         Print(jo.getString("value"));
			if(jo.getString("value") == "C"){
			   //---- abrimos una posición BUY
			      ordenId = OrderSend(Symbol(),OP_BUY,jo.getDouble("lote"),Ask,3,jo.getDouble("stopLoss"),0.0,"MACD_test",_MagicNumber,0,Green);
               if(ordenId < 0)
                 {
                  _GetLastError=GetLastError();
                  Alert("Error al enviar la posición № ",_GetLastError);
                  return(-1);
                 } else {
                  
                 }
               Alert("COMPRA", jo.getString("stopLoss"));
               return(0);
			} else {
			   if(jo.getString("value") == "V"){
			      ordenId = OrderSend(Symbol(),OP_SELL,jo.getDouble("lote"),Ask,3,jo.getDouble("stopLoss"),0.0, "MACD_test",_MagicNumber,0,Red);
			      if(ordenId < 0)
                 {
                  _GetLastError=GetLastError();
                  Alert("Error al enviar la posición № ",_GetLastError);
                  return(-1);
                 }
               Alert("VENTA", jo.getString("stopLoss"));
               return(0);
			   } else {
			      if(ordenId > 0){
			         OrderSelect(ordenId,SELECT_BY_TICKET);
			         if(jo.getString("value") == "X"){
   			          OrderClose(OrderTicket(),jo.getDouble("lote"),Ask,3,Red);
   			         ordenId  = -1;
   			      } else {
   			         if(jo.getString("value") == "A"){
      			         OrderSelect(ordenId,SELECT_BY_TICKET);
      			         bool res=OrderModify(ordenId,OrderOpenPrice(),jo.getDouble("stopLoss"),OrderTakeProfit(),0,Blue);
      			         Alert("ACTUALIZACION ", jo.getString("stopLoss"));
                        if(!res)
                           Print("Error in OrderModify. Error code=",GetLastError());
                        else
                           Print("Order modified successfully.");
                       }
   			         }
   			         
   			      }
			      }
			      
			      
			   }
			}			   
*/
		}
		
		//delete parser;
	
	
	
	return true; // Return the value
}

bool sw = true;
int ordenId;
double O = 0;
double H = 0;
double L = 1000;
double C = 0;
bool newVela = true;


bool fnRevisarPosibleVela(int calc){
   //if(calc == 51 || calc == 52 || calc == 53){
   if(calc == 48 || calc == 49 || calc == 50){
      return true;
   } else {
      return false;
   }
   
}


extern int  _MagicNumber = 1122;
int expira=0;
int start()
{
/*OrderSend(Symbol(), OP_BUY, 0.1, Ask, 3, Bid-15*Point, Bid+15*Point,"",_MagicNumber,expira,Blue);
              return;*/

	/*int counted_bars = IndicatorCounted();
	int limit = MathMin(Bars - counted_bars, maxBarsToLoad);*/
	string senial;
	string fecha;
	int calc;
	fecha = TimeToStr(TimeCurrent(),TIME_SECONDS);
	
   //Ask Bid
   /*if (IsNewBar()) {   
      double O2=NormalizeDouble(iOpen(Symbol(),PERIOD_M1,1),5);
      double H2=NormalizeDouble(iHigh(Symbol(),PERIOD_M1,1),5);
      double L2=NormalizeDouble(iLow(Symbol(),PERIOD_M1,1),5);
      double C2=NormalizeDouble(iClose(Symbol(),PERIOD_M1,1),5);  
     	sendVela("N", O2, H2, L2, C2, Ask - Bid, fecha, Close[0]);  
     	//sw = true;    
      return (0);
   } else {
     */  
       
       calc = StringGetChar(fecha, 6);
      // Alert("", calc);
       if(fnRevisarPosibleVela(calc)){
          if(newVela == true){
            newVela = false;
            sendVela("S", O, H, L, C, Ask - Bid, fecha, Close[0]);
            //sw = false;     
            C = Bid;
            O = Bid;
            H = Bid;
            L = Bid;
                
          } else {
            C = Bid;            
            if(H < C){
               H = C;            
            } else {
               if(L > C){
                  L = C;
               }
            }           
          }
         
       } else {
         newVela = true;
         C = Bid;
          
         if(H < C){
            H = C;            
         } else {
            if(L > C){
               L = C;
            }
         }
         
         
         
       }
   //}
   
   
   //senial = make_request(Close[i]);
   
   
   
	


   return(0);
   
}  



//Helper functions to print debug information on to the chart
int debugLine = 0;
void printDebug(string msg)
{

	int y = 15*debugLine;
	int x = 20+MathFloor(y/800)*410;

	y = 20+MathMod(y,800);

	DrawLabel(_obj+"_debug_"+debugLine, msg, x, y, DodgerBlue, "Arial", 9);
	debugLine++;

}
void DrawLabel(string label, string text, int x, int y, color clr, string fontName, int fontSize)
{
   int typeCorner = 0;
 
   string labelIndicator = label;   
   if (ObjectFind(labelIndicator) == -1)
   {
      ObjectCreate(labelIndicator, OBJ_LABEL, 0, 0, 0);
   }
   
   ObjectSet(labelIndicator, OBJPROP_CORNER, typeCorner);
   ObjectSet(labelIndicator, OBJPROP_XDISTANCE, x);
   ObjectSet(labelIndicator, OBJPROP_YDISTANCE, y);
   ObjectSetText(labelIndicator, text, fontSize, fontName, clr);
}
