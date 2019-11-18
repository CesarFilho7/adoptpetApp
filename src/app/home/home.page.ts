import { Component } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { AuthService } from '../../services/auth.service';
import { NavController, MenuController } from '@ionic/angular';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PetPage } from '../pet/pet.page';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingService } from 'src/services/loading.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public allPets
  public stadeEdit: boolean = false;
  public imagePet
  public usuarioID
  public pedidosPendentes
  public isCarregando = false

  constructor(public categoriaService: CategoriaService,
    public auth: AuthService,
    public navCtrl: NavController,
    private router: Router,
    public http: HttpClient,
    public menu: MenuController,
    private _sanitizer: DomSanitizer,
    public loadingService: LoadingService,
    public toastService: ToastService) {

  }

 async ngOnInit() {
    this.buscarPets();
    let token = localStorage.getItem('localUser');
    console.log(token);
    if (token != null) {
      let decoded = jwtDecode(token)
      this.usuarioID = decoded.user_id
      console.log(decoded);
    }

      let loading = await this.loadingService.createLoading();
      loading.present();
      this.http.get('https://adoptpet-api.herokuapp.com/usuarios/pedidos_pendentes/' + this.usuarioID)
        .subscribe(response => {
          this.isCarregando = true
          this.pedidosPendentes = response
          console.log(this.pedidosPendentes);
          
          setTimeout(() => {
            loading.dismiss();
          }, 500)
        },
          error => {
            console.log(error);
            setTimeout(() => {
              loading.dismiss();
              this.toastService.presentToast("Não foi possivel salvar!", "danger")
            }, 300)
          })
  }

  buscarPetPeloId(pet) {
    // this.router.navigate("/src/app/pet/" + pet.id);
    // this.util.redireciona("/app/tresprev/orgaos/editar/" + orgao.uuid);
    console.log(pet.id);
    this.navCtrl.navigateRoot('/pets/' + pet.id)
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

  goPedidos(){
    this.navCtrl.navigateRoot('/pedidos');
  }

  async buscarPets() {
    let loading = await this.loadingService.createLoading();
    loading.present();
    this.categoriaService.findAllPets()
      .subscribe(response => {
        this.allPets = response
        console.log(this.allPets);
        setTimeout(() => {
          loading.dismiss();
        }, 500)
        
        // this.isCarregando.dismissLoading()
        // this.profilePicture(this.allPets)
      },
        error => {
          console.log(error);
          setTimeout(() => {
            loading.dismiss();
            this.toastService.presentToast("Não foi possivel listar os pets!", "danger")
          }, 300)
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
