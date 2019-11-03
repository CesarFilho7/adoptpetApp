import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../../src/models/login.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public usuario: any = {};
  public form: FormGroup;

  constructor(private fb: FormBuilder, private navCtrl: NavController, public http: HttpClient) { 
  }

  ngOnInit() {
    this.form = this.fb.group({
      'nome': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      'email': ['', [Validators.required, Validators.maxLength(100)]],
      'senha': ['', [Validators.required, Validators.maxLength(20)]],
      'cpf': ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }

  async salvar() {
    console.log(this.form.value);
    console.log(this.usuario);
        
    if (!this.form.valid) {
      alert('Preencha os campos obrigatórios.')
      return;
    }
    this.http.post('https://adoptpet-api.herokuapp.com/usuarios/', this.usuario)
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error); 
    });
    // this.navCtrl.navigateRoot('/login');
  }
  

}
