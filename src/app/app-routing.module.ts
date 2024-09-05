import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { MisionComponent } from './components/mision/mision.component';
import { OrganizacionComponent } from './components/organizacion/organizacion.component';
import { QsComponent } from './components/qs/qs.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InicioComponent } from './inicio/inicio.component';
import { SistemaComponent } from './sistema/sistema.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { SisprincipalComponent } from './components/sisprincipal/sisprincipal.component';






const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'cotizar', component: CotizarComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'organizacion', component: OrganizacionComponent },
  { path: 'qs', component: QsComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'sistema', component: SistemaComponent },
  { path: 'mantenimiento', component: MantenimientoComponent },
  { path: 'sisprincipal', component: SisprincipalComponent },


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
