import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


import * as jwtDecode from 'jwt-decode';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {

  public petPorId: any = {};
  public form: FormGroup;
  public aguardarValor: boolean = false

  constructor(public navCtrl: NavController, 
    public categoriaService: CategoriaService, 
    private fb: FormBuilder,
    public menu: MenuController,
    public http: HttpClient,
    public auth: AuthService,
    private route: ActivatedRoute) {
  }

 async ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (id != null) {
     await this.getPet(id);
    }

    let token = localStorage.getItem('localUser');
    console.log(token);
    if(token != null){
      let decoded = jwtDecode(token)
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

  logoutUsuario(){
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }


}
