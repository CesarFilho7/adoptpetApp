import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule'
  },
  {
    path: 'cadastro',
    loadChildren: './cadastro/cadastro.module#CadastroPageModule'
  },
  {
    path: 'pets/:id',
    loadChildren: './pet/pet.module#PetPageModule'
  },
  {
    path: 'pedidos', loadChildren: './pedidos/pedidos.module#PedidosPageModule'
  },
  {
    path: 'adicionar-pet', loadChildren: './adicionar-pet/adicionar-pet.module#AdicionarPetPageModule'
  },
  { path: 'usuario-pet', loadChildren: './usuario-pet/usuario-pet.module#UsuarioPetPageModule' },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
