import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { AuthService } from 'src/services/auth.service';
import * as jwtDecode from 'jwt-decode';
import { decode } from 'punycode';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public aguardarValor: boolean =  false;
  public usuario
  public usuarioDados

  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public http: HttpClient,
    public auth: AuthService,) {
  }

  ngOnInit() {
    let token = localStorage.getItem('localUser');
    console.log(token);
    if (token != null) {
      let decoded = jwtDecode(token)
      this.usuario = decoded.user_id
      console.log(this.usuario);
      this.http.get('https://adoptpet-api.herokuapp.com/usuarios/' + this.usuario)
      .subscribe(response => {
        this.usuarioDados = response
        console.log(this.usuarioDados);
        this.aguardarValor = true
      },
        error => {
          console.log(error);
        })
    }
  }

  logoutUsuario(){
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

}
