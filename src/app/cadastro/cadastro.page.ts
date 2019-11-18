import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../../src/models/login.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';
import { ToastService } from 'src/services/toast.service';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: any = {};
  public form: FormGroup;
  public currentLoading = null;
  public teste: boolean =  false;

  constructor(private fb: FormBuilder,
    private navCtrl: NavController,
    public http: HttpClient,
    public loadingController: LoadingController,
    public menu: MenuController,
    public toastService: ToastService,
    public loadingService: LoadingService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      'nome': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      'email': ['', [Validators.required, Validators.maxLength(100)]],
      'senha': ['', [Validators.required, Validators.maxLength(20)]],
      // 'cpf': ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  async salvar() {
    // this.currentLoading.create(5000, "Aguarde...")
    console.log('entrou');
    
    if (!this.form.valid) {
      this.toastService.presentToast("Preencha os campos obrigatórios.", "danger");
      return;
    }
    let loading = await this.loadingService.createLoading();
    loading.present();
    this.http.post('https://adoptpet-api.herokuapp.com/usuarios/', this.usuario)
    .subscribe(data => {
      console.log(data);
      console.log(this.teste);
      setTimeout(() => {
        this.teste = true;
        loading.dismiss();
        this.navCtrl.navigateRoot('/login');
      }, 500)
     }, error => {
      console.log(error); 
      setTimeout(() => {
        loading.dismiss();
        this.toastService.presentToast("Não foi possivel adicionar!", "danger")
      }, 300)
    });    
    
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  goLogin(){
    this.navCtrl.navigateRoot('/login');
  }
  // ionViewDidLeave(){
  //   this.menu.swipeEnable(true);
  // }

}
