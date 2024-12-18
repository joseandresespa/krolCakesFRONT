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
import { PedidoComponent } from './components/pedido/pedido.component';
import { UnidadMedidaComponent } from './components/unidad-medida/unidad-medida.component';
import { EstadoComponent } from './components/estado/estado.component';
import { PastelRealizadoComponent } from './components/pastel-realizado/pastel-realizado.component';
import { PaginaEnBlancoComponent } from './components/pagina-en-blanco/pagina-en-blanco.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { RolComponent } from './components/rol/rol.component';
import { AccesoMantenimientoComponent } from './components/acceso-mantenimiento/acceso-mantenimiento.component';
import { SeguridadComponent } from './components/seguridad/seguridad.component';
import { CostoComponent } from './components/agenda/costo/costo.component';
import { InsumoUtensilioComponent } from './components/insumo-utensilio/insumo-utensilio.component';
import { SalidasComponent } from './components/inventario/salidas/salidas.component';
import { ComprasComponent } from './components/inventario/compras/compras.component';
import { DesgloceComprasComponent } from './components/inventario/compras/desgloce-compras/desgloce-compras.component';
import { AgregarComprasComponent } from './components/inventario/compras/agregar-compras/agregar-compras.component';
import { PastelesRealizadosComponent } from './components/pasteles-realizados/pasteles-realizados.component';


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
  { path: 'pedido', component:  PedidoComponent },
  { path: 'unidad-medida', component:  UnidadMedidaComponent },
  { path: 'estado', component:  EstadoComponent },
  { path: 'pastel-realizado', component:  PastelRealizadoComponent },
  { path: 'pagina-en-blanco', component:  PaginaEnBlancoComponent },
  { path: 'agenda', component:  AgendaComponent },
  { path: 'rol', component:  RolComponent },
  { path: 'acceso-mantenimiento', component:  AccesoMantenimientoComponent },
  { path: 'seguridad', component:  SeguridadComponent },
  { path: 'costo', component: CostoComponent},
  { path: 'insumo-utencilio', component: InsumoUtensilioComponent},
  { path: 'salidas', component: SalidasComponent},
  { path: 'compras', component: ComprasComponent},
  { path: 'desgloce-compras', component: DesgloceComprasComponent},
  { path: 'agregar-compras', component: AgregarComprasComponent},
  { path: 'pasteles-realizados', component: PastelesRealizadosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
