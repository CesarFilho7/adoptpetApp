import { Injectable } from '@angular/core';
import { LoginDTO } from 'src/models/login.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class AuthService {

    constructor(public http: HttpClient){

    }
    authenticate(usuarioLogin: LoginDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}login`, 
            usuarioLogin,
         {
             observe: 'response',
             responseType : 'text' //Evitar corpo vazio
         });
    }
} 