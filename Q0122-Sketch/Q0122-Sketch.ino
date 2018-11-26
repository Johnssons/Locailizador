#include <SoftwareSerial.h>
#include <TinyGPS.h>
#define pinoRX 9
#define pinoTX 8

SoftwareSerial serialGPS(pinoRX,pinoTX); // RX, TX
TinyGPS gps;
const String codPulseira = "1";
float latitude, longitude;
void setup() {
   serialGPS.begin(9600);
   Serial.begin(9600);
}

void loop() {
  //Mostra os dados crus do GPS
  bool newData = false;
  // For one second we parse GPS data and report some key values
  for (unsigned long start = millis(); millis() - start < 1000;)
  {
    while (serialGPS.available())
    {
      char c = serialGPS.read();
      // Serial.write(c); //apague o comentario para mostrar os dados crus
      if (gps.encode(c)) // Atribui true para newData caso novos dados sejam recebidos
        newData = true;
    }
  }
  if (newData)
  {
    float flat, flon;
    String Sflat, Sflon;
    gps.f_get_position(&flat, &flon);
    Serial.print(codPulseira + "La" + (flat == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flat, 6) + "Lo" + (flon == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flon, 6));
  }
}
