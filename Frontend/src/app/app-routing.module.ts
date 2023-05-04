import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoInteresesComponent } from './components/catalogo-intereses/catalogo-intereses.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PrincipalWannaComponent } from './components/principal-wanna/principal-wanna.component';

const routes: Routes = [
  {
    path: 'panelDeControl', loadChildren: () => import('./pages/panel-de-control/panel-de-control.module').then(m => m.PanelDeControlModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'intereses',
    component: CatalogoInteresesComponent
  },
  {
    path: 'principal',
    component: PrincipalWannaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
