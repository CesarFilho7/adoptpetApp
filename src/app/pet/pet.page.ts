import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


import * as jwtDecode from 'jwt-decode';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from 'src/services/toast.service';


@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {

  public petPorId: any = {};
  public form: FormGroup;
  public aguardarValor: boolean = false
  public usuarioID
  public loading: boolean = false
  public imagePet

  constructor(public navCtrl: NavController,
    public categoriaService: CategoriaService,
    private fb: FormBuilder,
    public menu: MenuController,
    public http: HttpClient,
    public auth: AuthService,
    private route: ActivatedRoute,
    public toastService: ToastService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (id != null) {
      await this.getPet(id);
    }

    let token = localStorage.getItem('localUser');
    console.log(token);
    if (token != null) {
      let decoded = jwtDecode(token)
      this.usuarioID = decoded.user_id
      console.log(this.usuarioID);

      console.log(decoded);
    }

    this.form = this.fb.group({
      'nome': [''],
      'genero': [''],
      'descricao': [''],
      'porte': [''],
    });
  }

  getPet(id: string) {
    this.http.get('https://adoptpet-api.herokuapp.com/pets/' + id)
      .subscribe(response => {
        this.petPorId = response
        console.log(this.petPorId);
        this.aguardarValor = true
      },
        error => {
          console.log(error);
        })
  }

  adotar() {
    if (this.usuarioID != null || this.usuarioID != "") {
      if (this.usuarioID !== this.petPorId.usuario_id) {
        const pedido = {
          pet_id: this.petPorId.id,
          usuario_id: this.usuarioID,
          status: 'Pendente'
        }

        this.http.post('https://adoptpet-api.herokuapp.com/pedidos/', pedido)
          .subscribe(data => {
            console.log(data);
            this.loading = true;
            if (this.loading == true) {
              this.navCtrl.navigateRoot('/home');
              // alert("Pedido Enviado");
              this.toastService.presentToast("Pedido Enviado", "success");
            }
          }, error => {
            console.log(error);
          });

      } else {
        this.toastService.presentToast("Não é possivel adotar o proprio pet", "danger");
      }
    } else {
      this.toastService.presentToast("Para adotar um pet é preciso fazer login!", "warning");
    }

  }


  logoutUsuario() {
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }


}
