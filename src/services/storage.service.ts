import { Injectable } from '@angular/core';
import { LocalUser } from 'src/models/local_user';
import { STORAGE_KEYS } from 'src/config/storage_keys.config';

@Injectable()
export class StorageService {


    getLocalUser(): LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);  // pego o valor que está no meu localStorage com essa chave
        if( usr == null){
            console.log('Valor Nulo');
            return
        } else {
            return JSON.parse(usr); 
        }
    }

    //Recebe o obj e armazena no storage
    setLocalUser(obj: LocalUser) { 
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}