import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginDTO } from '../../../src/models/login.dto';
import { NavController } from '@ionic/angular';

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

  constructor(public navCtrl: NavController, public categoriaService: CategoriaService) {

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

  logar(){
    console.log(this.usuarioLogin);
    this.navCtrl.navigateRoot('/home');
  }


}
