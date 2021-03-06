import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import { LoadingService } from 'src/services/loading.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  public usuarioID;
  public form: FormGroup;
  public aguardarValor: boolean = false
  public pedidoPendentes;


  constructor(public navCtrl: NavController,
    public categoriaService: CategoriaService,
    private fb: FormBuilder,
    public menu: MenuController,
    public http: HttpClient,
    public auth: AuthService,
    public loadingService: LoadingService) {
  }

  async ngOnInit() {
    let token = localStorage.getItem('localUser');
    console.log(token);
    if (token != null) {
      let decoded = jwtDecode(token)
      console.log(decoded);
      this.usuarioID = decoded.user_id

      let loading = await this.loadingService.createLoading();
      loading.present();
      this.http.get('https://adoptpet-api.herokuapp.com/usuarios/pedidos_pendentes/' + this.usuarioID)
        .subscribe(response => {
          this.aguardarValor = true
          this.pedidoPendentes = response
          console.log(this.pedidoPendentes);
          setTimeout(() => {
            loading.dismiss();
          }, 500)
        },
          error => {
            console.log(error);
          })
    }

    this.form = this.fb.group({
      'pedidos': [[]],
      'nome': [''],
      'nomeUsuario': [''],
      'foto': [''],
    });
  }

  async responderPedido(_id, _resposta) {
    let loading = await this.loadingService.createLoading();
    loading.present();
    const pedido = {
      status: _resposta
    };

    this.http.put('https://adoptpet-api.herokuapp.com/pedidos_resposta/' + _id, pedido)
      .subscribe(response => {
        console.log(response);
        setTimeout(() => {
          loading.dismiss();
        }, 300)
        },
        error => { setTimeout(() => {
          loading.dismiss();
          this.navCtrl.navigateRoot('/pedidos');
          location.reload()
          console.log(this.pedidoPendentes);          
          // this.navCtrl.setRoot(this.navCtrl.getActive().component)
          }, 100)
          console.log(error);
        })
  }

  logoutUsuario() {
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }
}