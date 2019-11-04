import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


import * as jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {

  public petPorId: any = {};
  

  constructor(public navCtrl: NavController, 
    public categoriaService: CategoriaService, 
    public menu: MenuController,
    public http: HttpClient,
    public auth: AuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    let token = localStorage.getItem('localUser');
    console.log(token);
    if(token != null){
      let decoded = jwtDecode(token)
      console.log(decoded);
    }
    this.getPet();
  }

  getPet() {
    this.petPorId = this.http.get('https://adoptpet-api.herokuapp.com/pets/' + 1)
     .subscribe(data => {
      console.log(data);      
     }, error => {
      console.log(error); 
    });
  }

  logoutUsuario(){
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }


}
