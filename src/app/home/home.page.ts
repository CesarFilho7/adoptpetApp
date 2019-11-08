import { Component } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular'; 
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PetPage } from '../pet/pet.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public allPets
  public stadeEdit: boolean = false;

  constructor(public categoriaService: CategoriaService, 
    public auth: AuthService, 
    public navCtrl: NavController,
    private router: Router,
    public http: HttpClient) { }

  ngOnInit() {
    this.buscarPets();
    let token = localStorage.getItem('localUser');
    console.log(token);
    if(token != null){
      let decoded = jwtDecode(token)
      console.log(decoded);
    }
  }

  buscarPetPeloId(pet){
    // this.router.navigate("/src/app/pet/" + pet.id);
    // this.util.redireciona("/app/tresprev/orgaos/editar/" + orgao.uuid);

    console.log(pet.id);
    
    this.navCtrl.navigateRoot('/pets/' + pet.id)
  }


  buscarPets() {

    // try {
    //   this.stadeEdit = true
    //   this.allPets = this.http.get('https://adoptpet-api.herokuapp.com/pets/');
    //   console.log(this.allPets);
    // } catch (e) {
    //   console.log('Entrou');
      
    // } finally {
    //   this.stadeEdit = false;
    // }
    
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
