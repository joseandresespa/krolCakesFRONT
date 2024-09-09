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
import { ListarCotizacionesComponent } from './components/listar-cotizaciones/listar-cotizaciones.component';
import { MasasComponent } from './components/masas/masas.component';
import { RellenoComponent } from './components/relleno/relleno.component';
import { RecetaComponent } from './components/receta/receta.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TipoEntregaComponent } from './components/tipo-entrega/tipo-entrega.component';
import { TipoEventoComponent } from './components/tipo-evento/tipo-evento.component';
import { UmpsComponent } from './components/umps/umps.component';
import { TipoInsumoUtencilioComponent } from './components/tipo-insumo-utencilio/tipo-insumo-utencilio.component'
import { MotivoSalidaComponent } from './components/motivo-salida/motivo-salida.component'
import { ProveedorComponent } from './components/proveedor/proveedor.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a 'login' por defecto
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
  { path: 'listar-cotizaciones', component:  ListarCotizacionesComponent },
  { path: 'masas', component:  MasasComponent },
  { path: 'relleno', component:  RellenoComponent },
  { path: 'receta', component:  RecetaComponent },
  { path: 'producto', component:  ProductoComponent },
  { path: 'cliente', component:  ClienteComponent },
  { path: 'tipo-entrega', component:  TipoEntregaComponent },
  { path: 'tipo-evento', component:  TipoEventoComponent },
  { path: 'umps', component:  UmpsComponent },
  { path: 'tipo-insumo-utencilio', component:  TipoInsumoUtencilioComponent },
  { path: 'motivo-salida', component:  MotivoSalidaComponent },
  { path: 'proveedor', component:  ProveedorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
