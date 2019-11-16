import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/domain/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginDTO } from '../../../src/models/login.dto';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/services/toast.service';
import { LoadingService } from 'src/services/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuarioLogin : LoginDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, 
    public categoriaService: CategoriaService, 
    public menu: MenuController,
    public auth: AuthService,
    public toastService: ToastService,
    public isCarregando: LoadingService) {

  }

  ngOnInit() {
    // this.isCarregando.presentLoading()
    this.buscarUsuariosCadastrados();
  }

  buscarUsuariosCadastrados() {
    this.categoriaService.findAllUsuarios()
      .subscribe(response => {
        console.log(response);
      },
        error => {
          console.log(error);
        })
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  // ionViewDidLeave(){
  //   this.menu.swipeEnable(true);
  // }

  logar(){
    this.auth.authenticate(this.usuarioLogin)
    .subscribe(response => {
      console.log(this.usuarioLogin);
      console.log(response);
      console.log(response.body);
      // console.log(response.headers.get('Authorization'));
      this.auth.successfullLogin(response.body);
      this.navCtrl.navigateRoot('/home');
    },
    error => {
      this.toastService.presentToast("Email ou Senha Inválidos", "danger");
    });
  }

  cadastrarUsuario(){
    this.navCtrl.navigateRoot('/cadastro')
  }


}