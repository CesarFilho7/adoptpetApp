import { Injectable } from '@angular/core';
import { LoginDTO } from 'src/models/login.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from 'src/models/local_user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient , public storage: StorageService){
    }
    authenticate(usuarioLogin: LoginDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}login`, 
            usuarioLogin,
         {
             observe: 'response', // Pegar o header da resposta
             responseType : 'text' // Evitar corpo vazio
         });    
    }

    successfullLogin( authorizationValue: string){
        let tok = authorizationValue.substring(40) // Pegar somente o token
        let user: LocalUser = {
            token: tok
        }
        this.storage.setLocalUser(user); //Guardo meu usuario no meu localStorage
    }
    
    // Remove do meu localStorage o usuario
    logout(){
        this.storage.setLocalUser(null);
    }
} 