import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import * as jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  public usuarioID;
  public form: FormGroup;
  public aguardarValor: boolean = false
  public pedidoPendentes


  constructor(public navCtrl: NavController,
    public categoriaService: CategoriaService,
    private fb: FormBuilder,
    public menu: MenuController,
    public http: HttpClient,
    public auth: AuthService,
    private route: ActivatedRoute) {
  }

  async ngOnInit() {

    let token = localStorage.getItem('localUser');
    console.log(token);
    if (token != null) {
      let decoded = jwtDecode(token)
      this.usuarioID = decoded.user_id

      this.http.get('https://adoptpet-api.herokuapp.com/usuarios/pedidos_pendentes/' + this.usuarioID)
        .subscribe(response => {
          this.pedidoPendentes = response
          console.log(this.pedidoPendentes);
          
          this.aguardarValor = true
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

  logoutUsuario() {
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }
}