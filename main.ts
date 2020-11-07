//% groups=['Commun', 'Client', 'Serveur']
//% color="#037268" icon="\uf1eb"
namespace wifi {
    //% block="Connexion au point d'accès SSID $SSID mot de passe $password adresse IP $adresse_IP "
    //% group='Commun'
    //% SSID.defl='launay' password.defl='12345789'
    //% adresse_IP.defl='192.168.1.5'
    export function connect_AP_IP(SSID: string, password: string, adresse_IP: string): void {
        basic.showIcon(IconNames.Asleep)
        serial.setRxBufferSize(100)
        serial.redirect(
        SerialPin.P14,
        SerialPin.P0,
        BaudRate.BaudRate115200
        )
        basic.pause(2000)
        basic.showIcon(IconNames.SmallHeart)
        serial.writeString("connect_to_AP,"+SSID+","+password)
        basic.pause(2000)
        let reception = ""
        while (reception == "") {
            serial.writeString("connected_to_AP?")
            reception = serial.readUntil(serial.delimiters(Delimiters.Hash))
            if (reception == "connected_to_AP") { 
                serial.writeString("set_IP_address_esp32,"+adresse_IP)
                basic.pause(100)
                basic.showString("C")
            }
            else {
                basic.showIcon(IconNames.Sad)
                basic.pause(2000)	
            }
        }
    }
}
