import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-usuario-pet',
  templateUrl: './usuario-pet.page.html',
  styleUrls: ['./usuario-pet.page.scss'],
})
export class UsuarioPetPage implements OnInit {

  public petPorUsuario: any = {};
  public aguardarValor = null;
  public usuarioId


  constructor(public navCtrl: NavController,
    public categoriaService: CategoriaService,
    private fb: FormBuilder,
    public menu: MenuController,
    public http: HttpClient,
    public auth: AuthService,
    public loadingService: LoadingService
  ) { }

  async ngOnInit() {
    let loading = await this.loadingService.createLoading();
    loading.present();
    let token = localStorage.getItem('localUser');
    console.log(token);
    if (token != null) {
      let decoded = jwtDecode(token)
      console.log(decoded);
      this.usuarioId = decoded.user_id
      this.http.get('https://adoptpet-api.herokuapp.com/pets/usuarios/' + this.usuarioId)
        .subscribe(response => {
          this.petPorUsuario = response
          console.log(this.petPorUsuario);
          setTimeout(() => {
            loading.dismiss();
            this.aguardarValor = true
          }, 500)
          
        },
          error => {
            console.log(error);
          })
    }
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

  paginaDoPet(pet){
      // this.router.navigate("/src/app/pet/" + pet.id);
      // this.util.redireciona("/app/tresprev/orgaos/editar/" + orgao.uuid);
      console.log(pet.id);
      this.navCtrl.navigateRoot('/pets/' + pet.id)
  }
}
