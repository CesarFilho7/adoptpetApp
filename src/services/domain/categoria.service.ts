import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient){

    }

    findAllUsuarios(){
        return this.http.get(`${API_CONFIG.baseUrl}usuarios`);
    }
}