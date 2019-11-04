import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public navCtrl: NavController, 
    public auth: AuthService) {
  }

  ngOnInit() {
    
  }

  salvar(){
    
  }

  logoutUsuario(){
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
