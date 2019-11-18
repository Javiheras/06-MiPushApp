import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  mensajes: any[] = [
    {
      title: "Título de la notificación",
      body: "cuerpo del mensaje",
      date: new Date()
    }
  ];

  constructor( private oneSignal: OneSignal,
    private alertCtrl: AlertController) { }

  configuracionInicial() {
    this.oneSignal.startInit('','');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe(( noti ) => {
      // do something when notification is received
      console.log("Notificacion recibida", noti);
      this.notificacionRecibida(noti);
      

    });

    this.oneSignal.handleNotificationOpened().subscribe(( noti ) => {
      // do something when a notification is opened
      console.log("notificación abierta", noti);
    });

    this.oneSignal.endInit();
  }

  notificacionRecibida( noti:OSNotification) {
    
    const payload = noti.payload;

    this.mensajes.unshift(payload);

    let msg = payload.body;
      let title = payload.title;
      let additionalData = payload.additionalData;
      this.showAlert(title, msg, additionalData.task);

    //debugger;
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }
}
