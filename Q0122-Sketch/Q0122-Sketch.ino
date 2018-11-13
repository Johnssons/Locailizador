
#include <SoftwareSerial.h>
#include <TinyGPS.h>

SoftwareSerial serial1(10, 11); // RX, TX
TinyGPS gps1;
const String codPulseira = "1";
void setup() {
   serial1.begin(9600);
   Serial.begin(9600);
}

void loop() {
  bool recebido = false;

  while (serial1.available()) 
  {
     char cIn = serial1.read();
     recebido = gps1.encode(cIn);
  }

  if (recebido) 
  {
     
     //Latitude e Longitude
     long latitude, longitude;
     gps1.get_position(&latitude, &longitude);     

     if (latitude != TinyGPS::GPS_INVALID_F_ANGLE && longitude != TinyGPS::GPS_INVALID_F_ANGLE)
     {
        Serial.println(codPulseira);
        Serial.print("La");
        Serial.print(float(latitude) / 100000, 6);
        Serial.print("Lo");
        Serial.print(float(longitude) / 100000, 6);
     }
  }
  delay(1000);
}
