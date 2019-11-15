import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../../src/models/login.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';
import { ToastService } from 'src/services/toast.service';

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
    public toastService: ToastService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      'nome': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      'email': ['', [Validators.required, Validators.maxLength(100)]],
      'senha': ['', [Validators.required, Validators.maxLength(20)]],
      // 'cpf': ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  // async present(message: string = null, duration: number = null) {

  //   if (this.currentLoading != null) {
  //     this.currentLoading.dismiss();
  //   }

  //   this.currentLoading = await this.loadingController.create({
  //     duration: duration,
  //     message: message
  //   });

  //   return await this.currentLoading.present();
  // }

  // async dismiss() {
  //   if (this.currentLoading != null) {

  //     await this.loadingController.dismiss();
  //     this.currentLoading = null;
  //   }
  //   return;
  // }

  async salvar() {
    // this.currentLoading.create(5000, "Aguarde...")
    console.log('entrou');
    
    if (!this.form.valid) {
      this.toastService.presentToast("Preencha os campos obrigatórios.", "danger");
      return;
    }

    this.http.post('https://adoptpet-api.herokuapp.com/usuarios/', this.usuario)
    .subscribe(data => {
      console.log(data);
      this.teste = true;
      console.log(this.teste);
      if(this.teste == true){
        this.navCtrl.navigateRoot('/login');
       }
     }, error => {
      console.log(error); 
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
