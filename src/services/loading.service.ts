import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';


@Injectable()
export class LoadingService {

    constructor(public loadingController: LoadingController) { }

    createLoading(): Promise<HTMLIonLoadingElement> {
        return this.loadingController.create({
            spinner: 'dots',
            message: 'Aguarde...'
        });
    }
    
}