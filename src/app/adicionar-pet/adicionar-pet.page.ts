import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import * as jwtDecode from 'jwt-decode';
import { ToastService } from 'src/services/toast.service';


@Component({
  selector: 'app-adicionar-pet',
  templateUrl: './adicionar-pet.page.html',
  styleUrls: ['./adicionar-pet.page.scss'],
})
export class AdicionarPetPage implements OnInit {

  public pet: any = {};
  public form: FormGroup;
  public currentLoading = null;
  public usuarioId

  public porteTipos = [{nome: "Pequeno"}, {nome: "Médio"}, {nome: "Grande"}]
  public generoTipos = [{nome: "Macho"}, {nome: "Fêmea"}]
  public especieTipos = [{nome: "Cão"}, {nome: "Gato"}]


  constructor(private fb: FormBuilder,
    private navCtrl: NavController,
    public http: HttpClient,
    public loadingController: LoadingController,
    public menu: MenuController,
    public auth: AuthService,
    public toastService: ToastService) {
  }

  ngOnInit() {
    this.currentLoading = true;
    let token = localStorage.getItem('localUser');
    console.log(token);
    if (token != null) {
      let decoded = jwtDecode(token)
      this.usuarioId = decoded.user_id
      console.log(this.usuarioId);
    }
    this.form = this.fb.group({
      'nome': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      'data_nasc': [''],
      'especie': ['', [Validators.required, Validators.maxLength(20)]],
      'porte': ['', [Validators.required]],
      'genero': ['', [Validators.required, Validators.maxLength(20)]],
      'descricao': ['', [Validators.required]],
      'foto': [''],
    });
  }

  salvar(){
    console.log(this.form.value);
    
    const pet = {
      nome: this.form.value.nome,
      data_nasc: '20/10/2015',
      especie: this.form.value.especie,
      porte: this.form.value.porte,
      genero: this.form.value.genero,
      descricao: this.form.value.descricao,
      usuario_id: this.usuarioId,
      foto : "",
      adotado : 0
    };

    console.log(pet);
    this.http.post('https://adoptpet-api.herokuapp.com/pets/', pet)
    .subscribe(data => {
      console.log(data);
      this.currentLoading = true;
      if(this.currentLoading == true){
        this.navCtrl.navigateRoot('/home');
       }
     }, error => {
      console.log(error);
      this.toastService.presentToast("Não foi possivel salvar!", "danger");

    });    
  }

  // getBase64(file, cb) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //       cb(reader.result)
  //   };
  //   reader.onerror = function (error) {
  //       console.log('Error: ', error);
  //   };
  // }

  selectImg() {
  
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

  logoutUsuario() {
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
