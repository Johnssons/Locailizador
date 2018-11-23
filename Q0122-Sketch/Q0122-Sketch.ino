#include <SoftwareSerial.h>
#include <TinyGPS.h>
#define pinoRX 9
#define pinoTX 10

SoftwareSerial serialGPS(pinoRX,pinoTX); // RX, TX
TinyGPS gps1;
const String codPulseira = "1";
float latitude, longitude;
void setup() {
  pinMode(pinoRX, INPUT);
  pinMode(pinoTX, OUTPUT);
   serialGPS.begin(9600);
   Serial.begin(9600);
}

void loop() {
  bool temInfo = false;
  while (serialGPS.available())  
  {
    char data = serialGPS.read();
    Serial.println(data);
    if(gps1.encode(data))
    temInfo = true;
  }
  if (temInfo) 
  {
     //Latitude e Longitude
     gps1.f_get_position(&latitude, &longitude);
        String sLat, sLon;
        if(latitude != TinyGPS::GPS_INVALID_F_ANGLE && longitude != TinyGPS::GPS_INVALID_F_ANGLE)
        {
           Serial.println (codPulseira + "La" + latitude + "Lo" + longitude);
        } 
  }
  delay(5000);
}
