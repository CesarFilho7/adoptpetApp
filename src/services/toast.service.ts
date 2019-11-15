import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';


@Injectable()
export class ToastService {

    constructor(public toastController: ToastController) {}
  
    async presentToast(msg, color) {
      const toast = await this.toastController.create({
        message: msg,
        color: color,
        duration: 2000
      });
      toast.present();
    }
  
    async presentToastWithOptions() {
      const toast = await this.toastController.create({
        header: 'Toast header',
        message: 'Click to Close',
        position: 'top',
        buttons: [
          {
            side: 'start',
            icon: 'star',
            text: 'Favorite',
            handler: () => {
              console.log('Favorite clicked');
            }
          }, {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }
  
  }