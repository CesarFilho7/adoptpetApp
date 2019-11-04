import { Component } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular'; 
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public allPets;

  constructor(public categoriaService: CategoriaService, 
    public auth: AuthService, 
    public navCtrl: NavController) { }

  ngOnInit() {
    let token = localStorage.getItem('localUser');
    console.log(token);
    if(token != null){
      let decoded = jwtDecode(token)
      console.log(decoded);
    }
    this.buscarPets();
  }

  buscarPet(){
    this.navCtrl.navigateRoot('/pet')
  }


  buscarPets() {
    this.categoriaService.findAllPets()
      .subscribe(response => {
        this.allPets = response
        console.log(this.allPets);
      },
        error => {
          console.log(error);
        })
  }


  logoutUsuario(){
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
