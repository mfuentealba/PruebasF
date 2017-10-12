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
extern int hostPort = 9696;//8080;
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

extern int  _MagicNumber = 1122;
int expira=0;
int start()
{
string var1 = TimeToStr(TimeCurrent(),TIME_DATE|TIME_SECONDS);   
	string reqest = "{\"bid\": \"" + Bid + "\", \"ask\": \"" + Ask + "\", \"spread\": \"" + (Ask - Bid) + "\", \"fecha\": \"" + var1 + "\", \"vol\": \"" + (Volume[0]) + "\, \"nueva\":\"" + IsNewBar() + "\"}";
	//Create the response string
	string response = "";
	
	//Make the connection
	if(!INet.Open(hostIp,hostPort)) return(0);
	if(!INet.Request("POST","/",response,false, true, reqest, false))
	{
		printDebug("-Err download ");
		
	}
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
