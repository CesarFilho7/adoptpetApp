import { Component } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';


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
    this.buscarPets();
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
