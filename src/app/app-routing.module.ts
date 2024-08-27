import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { MisionComponent } from './components/mision/mision.component';
import { OrganizacionComponent } from './components/organizacion/organizacion.component';
import { QsComponent } from './components/qs/qs.component';
import { ContactoComponent } from './components/contacto/contacto.component';






const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto
  { path: 'login', component: LoginComponent }, // Ruta principal para el LoginComponent
  { path: 'cotizar', component: CotizarComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'organizacion', component: OrganizacionComponent },
  { path: 'qs', component: QsComponent },
  { path: 'contacto', component: ContactoComponent },

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
