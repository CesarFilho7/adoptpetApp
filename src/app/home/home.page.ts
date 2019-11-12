import { Component } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { AuthService } from '../../services/auth.service';
import { NavController, MenuController } from '@ionic/angular';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PetPage } from '../pet/pet.page';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public allPets
  public stadeEdit: boolean = false;
  public imagePet

  constructor(public categoriaService: CategoriaService,
    public auth: AuthService,
    public navCtrl: NavController,
    private router: Router,
    public http: HttpClient,
    public menu: MenuController,
    private _sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.buscarPets();
    let token = localStorage.getItem('localUser');
    console.log(token);
    if (token != null) {
      let decoded = jwtDecode(token)
      console.log(decoded);
    }
  }

  buscarPetPeloId(pet) {
    // this.router.navigate("/src/app/pet/" + pet.id);
    // this.util.redireciona("/app/tresprev/orgaos/editar/" + orgao.uuid);
    console.log(pet.id);
    this.navCtrl.navigateRoot('/pets/' + pet.id)
  }

  buscarPets() {
    this.categoriaService.findAllPets()
      .subscribe(response => {
        this.allPets = response
        console.log(this.allPets);
        // this.profilePicture(this.allPets)
      },
        error => {
          console.log(error);
        })
  }

  // profilePicture(binImage) {
  //   console.log(binImage);

  //   if (binImage != null) {
  //     var imageData = btoa(binImage.foto);
  //     console.log(imageData);
  //     //console.log("Base64 Image: ",imageData);
  //     this.imagePet = imageData;
  //   }
  // }

  logoutUsuario() {
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(true);
  }
}
