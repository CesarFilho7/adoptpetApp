import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';
import * as jwtDecode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/services/loading.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public aguardarValor: boolean =  false;
  public usuario
  public usuarioDados
  public form: FormGroup;
  public userEdit =  false;


  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public http: HttpClient,
    public auth: AuthService,
    public loadingService: LoadingService,
    private fb: FormBuilder) {
  }

  async ngOnInit() {
    
    let loading = await this.loadingService.createLoading();
    loading.present();

    this.form = this.fb.group({
      'nome': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      'email': ['', [Validators.required, Validators.maxLength(100)]],
      'senha': ['', [Validators.required, Validators.maxLength(20)]],
      // 'cpf': ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });

    let token = localStorage.getItem('localUser');
    console.log(token);
    if (token != null) {
      let decoded = jwtDecode(token)
      this.usuario = decoded.user_id
      console.log(this.usuario);
      this.http.get('https://adoptpet-api.herokuapp.com/usuarios/' + this.usuario)
      .subscribe(response => {
        this.usuarioDados = response
        console.log(this.usuarioDados);
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

  logoutUsuario(){
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }
  editar(){
    console.log(this.form.value);
    this.userEdit = true;
  }

  async atualizar() {
    let loading = await this.loadingService.createLoading();
    loading.present();
    console.log(this.form.value);
    console.log(this.usuario);
    
    // console.log(this.state.id);
    this.http.put('https://adoptpet-api.herokuapp.com/usuarios/' +  this.usuario, this.form.value)
    .subscribe(response => {
      console.log(response);
      setTimeout(() => {
        loading.dismiss();
        this.userEdit = false
      }, 500)
    },
      error => {
        console.log(error);
      })
    
  }


}
