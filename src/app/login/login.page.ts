import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/domain/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginDTO } from '../../../src/models/login.dto';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // public form: FormGroup;
  // private fb: FormBuilder;

  public usuarioLogin : LoginDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, 
    public categoriaService: CategoriaService, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  ngOnInit() {
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

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  logar(){
    console.log('1111111');
    this.auth.authenticate(this.usuarioLogin)
    .subscribe(response => {
      console.log('22222');
      console.log(response.headers.get('Authorization'));
      this.navCtrl.navigateRoot('/home');
    },
    error => {
      alert('Email ou Senha Inválidos!');
    });
  }


}
