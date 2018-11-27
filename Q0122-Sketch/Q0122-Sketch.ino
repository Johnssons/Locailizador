//bibliotecas

#include <FloatToString.h>
#include <TinyGPS.h>
#include <SoftwareSerial.h>
//definições
#define pinRX 9
#define pinTX 10
//instânciações de objetos globais
SoftwareSerial serialGPS( pinTX , pinRX);
TinyGPS gps;
//instânciações do codigo de pulseira que seria gerado a cada produto
String codPulseira = "5";

//inicialização dos objetos
void setup()
{
 serialGPS.begin(9600);
 Serial.begin(9600);
}
 
void loop()
{
   bool novaInfo = false;

    while (serialGPS.available())
    {
      char c = serialGPS.read();
      //Serial.write(c); //apague o comentario para mostrar os dados crus
      if (gps.encode(c)) // Atribui true para novaInfo caso novos dados sejam recebidos
        novaInfo = true;
    }
    if (novaInfo) // se tem novas informações, as converte e as envia pela porta serial
    //em um formato adequado ao programa que ira tratar esses dados e repassar para o banco de dados
  {
    char latBuffer[25], lonBuffer[25];
    float latF, lonF;
    String latS, lonS;
    gps.f_get_position(&latF, &lonF);
    latS = floatToString(latBuffer, latF, 6);
    lonS = floatToString(lonBuffer, lonF, 6);
    Serial.println(codPulseira + "La" + latS + "Lo" + lonS);
    delay(3000);
  }
}
