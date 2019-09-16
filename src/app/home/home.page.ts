import { Component } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public allPets;

  constructor(public categoriaService: CategoriaService) {}

  ngOnInit() {
    this.buscarPets();
  }


  buscarPets() {
    this.categoriaService.findAllPets()
      .subscribe(response => {
        this.allPets = response
        console.log(this.allPets);
      },
        error => {
          console.log(error);
        })
  }

}
