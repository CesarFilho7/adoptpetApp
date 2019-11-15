import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person',
      component: 'ProfilePage'
    },
    {
      title: 'Pedidos',
      url: '/pedidos',
      icon: 'home',
      component: 'PedidosPage'
    },
    {
      title: 'Meus Pets',
      url: '/usuario-pet',
      icon: 'person',
      component: 'UsuarioPetPage'
    },
    {
      title: 'Adicionar Pet',
      url: '/adicionar-pet',
      icon: 'home',
      component: 'AdicionarPetPage'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService,
    public navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logoutUsuario() {
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
