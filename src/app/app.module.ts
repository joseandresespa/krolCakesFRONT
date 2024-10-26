import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module'; // Importa tus rutas
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MisionComponent } from './components/mision/mision.component';
import { OrganizacionComponent } from './components/organizacion/organizacion.component';
import { QsComponent } from './components/qs/qs.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InicioComponent } from './inicio/inicio.component';
import { SesionService } from 'src/services/sesion.service';
import { HttpClientModule } from '@angular/common/http';
import { SistemaComponent } from './sistema/sistema.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarUsuarioDialogComponent } from './components/agregar-usuario-dialog/agregar-usuario-dialog.component';
import { EditarUsuarioDialogComponent } from './components/editar-usuario-dialog/editar-usuario-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CatalogosService } from 'src/services/catalogos.service';
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
import { TipoInsumoUtencilioComponent } from './components/tipo-insumo-utencilio/tipo-insumo-utencilio.component';
import { MotivoSalidaComponent } from './components/motivo-salida/motivo-salida.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ModalGenericoComponent } from './components/modal-generico/modal-generico.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalEditarComponent } from './components/modal-editar/modal-editar.component';
import { ModalCotizacionComponent } from './components/listar-cotizaciones/modal-cotizacion/modal-cotizacion.component';
import { ModalConfirmarComponent } from './components/listar-cotizaciones/modal-confirmar/modal-confirmar.component';
import { ModalObservacionComponent } from './components/listar-cotizaciones/modal-observacion/modal-observacion.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ConfirmarCotizacionComponent } from './components/listar-cotizaciones/confirmar-cotizacion/confirmar-cotizacion.component';
import { ModalAgregarPedidoComponent } from './components/pedido/modal-agregar-pedido/modal-agregar-pedido.component';
import { ModalEditarPedidoComponent } from './components/pedido/modal-editar-pedido/modal-editar-pedido.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ModalPedidoDesgloseComponent } from './components/pedido/modal-pedido-desglose/modal-pedido-desglose.component';
import { ModalEstadoPedidoComponent } from './components/pedido/modal-estado-pedido/modal-estado-pedido.component';
import { UnidadMedidaComponent } from './components/unidad-medida/unidad-medida.component';
import { ModaleditarUnidadComponent } from './components/unidad-medida/modaleditar-unidad/modaleditar-unidad.component';
import { ModalAgregarUnidadComponent } from './components/unidad-medida/modal-agregar-unidad/modal-agregar-unidad.component';
import { EstadoComponent } from './components/estado/estado.component';
import { ModalAgregarEstadoComponent } from './components/estado/modal-agregar-estado/modal-agregar-estado.component';
import { ModalEditarEstadoComponent } from './components/estado/modal-editar-estado/modal-editar-estado.component';
import { PastelRealizadoComponent } from './components/pastel-realizado/pastel-realizado.component';
import { ModalAgregarPastelComponent } from './components/pastel-realizado/modal-agregar-pastel/modal-agregar-pastel.component';
import { ModalEditarPastelComponent } from './components/pastel-realizado/modal-editar-pastel/modal-editar-pastel.component';
import { PaginaEnBlancoComponent } from './components/pagina-en-blanco/pagina-en-blanco.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { RolComponent } from './components/rol/rol.component';
import { ModalAgregarRolComponent } from './components/rol/modal-agregar-rol/modal-agregar-rol.component';
import { ModalEditarRolComponent } from './components/rol/modal-editar-rol/modal-editar-rol.component';
import { AccesoMantenimientoComponent } from './components/acceso-mantenimiento/acceso-mantenimiento.component';
import { ModalAgregarAccesoComponent } from './components/acceso-mantenimiento/modal-agregar-acceso/modal-agregar-acceso.component';
import { ModalEditarAccesoComponent } from './components/acceso-mantenimiento/modal-editar-acceso/modal-editar-acceso.component';
import { SeguridadComponent } from './components/seguridad/seguridad.component';
import { ModalAgregarComponent } from './components/seguridad/modal-agregar/modal-agregar.component';
import { ModalEditarSeguridadComponent } from './components/seguridad/modal-editar-seguridad/modal-editar-seguridad.component';
import { ModalFinPedidoAgendaComponent } from './components/agenda/modal-fin-pedido-agenda/modal-fin-pedido-agenda.component';
import { CostoComponent } from './components/agenda/costo/costo.component';
import { InsumoUtensilioComponent } from './components/insumo-utensilio/insumo-utensilio.component';
import { ModalAgregarInsumoComponent } from './components/insumo-utensilio/modal-agregar-insumo/modal-agregar-insumo.component';
import { ModalEditarInsumoComponent } from './components/insumo-utensilio/modal-editar-insumo/modal-editar-insumo.component';
import { ModalVerRecetaComponent } from './components/receta/modal-ver-receta/modal-ver-receta.component';
import { SalidasComponent } from './components/inventario/salidas/salidas.component';
import { ComprasComponent } from './components/inventario/compras/compras.component';
import { DesgloceComprasComponent } from './components/inventario/compras/desgloce-compras/desgloce-compras.component';
import { AgregarComprasComponent } from './components/inventario/compras/agregar-compras/agregar-compras.component';
import { DesgloseSalidaComponent } from './components/inventario/salidas/desglose-salida/desglose-salida.component';
import { AgregarSalidaComponent } from './components/inventario/salidas/agregar-salida/agregar-salida.component';













  @NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      CotizarComponent,
      MisionComponent,
      QsComponent,
      ContactoComponent,
      InicioComponent,
      OrganizacionComponent,
      SistemaComponent,
      MantenimientoComponent,
      AgregarUsuarioDialogComponent,
      EditarUsuarioDialogComponent,
      ConfirmDialogComponent,
      SisprincipalComponent,
      ListarCotizacionesComponent,
      MasasComponent,
      RellenoComponent,
      RecetaComponent,
      ProductoComponent,
      ClienteComponent,
      TipoEntregaComponent,
      TipoEventoComponent,
      UmpsComponent,
      TipoInsumoUtencilioComponent,
      MotivoSalidaComponent,
      ProveedorComponent,
      ModalGenericoComponent,
      ModalEditarComponent,
      ModalCotizacionComponent,
      ModalConfirmarComponent,
      ModalObservacionComponent,
      PedidoComponent,
      ConfirmarCotizacionComponent,
      ModalAgregarPedidoComponent,
      ModalEditarPedidoComponent,
      ModalPedidoDesgloseComponent,
      ModalEstadoPedidoComponent,
      UnidadMedidaComponent,
      ModaleditarUnidadComponent,
      ModalAgregarUnidadComponent,
      EstadoComponent,
      ModalAgregarEstadoComponent,
      ModalEditarEstadoComponent,
      PastelRealizadoComponent,
      ModalAgregarPastelComponent,
      ModalEditarPastelComponent,
      PaginaEnBlancoComponent,
      AgendaComponent,
      RolComponent,
      ModalAgregarRolComponent,
      ModalEditarRolComponent,
      AccesoMantenimientoComponent,
      ModalAgregarAccesoComponent,
      ModalEditarAccesoComponent,
      SeguridadComponent,
      ModalAgregarComponent,
      ModalEditarSeguridadComponent,
      ModalFinPedidoAgendaComponent,
      CostoComponent,
      InsumoUtensilioComponent,
      ModalAgregarInsumoComponent,
      ModalEditarInsumoComponent,
      ModalVerRecetaComponent,
      SalidasComponent,
      ComprasComponent,
      DesgloceComprasComponent,
      AgregarComprasComponent,
      DesgloseSalidaComponent,
      AgregarSalidaComponent,
      
      
      
      
      
         
      
    
      
      
  
    ],
    imports: [
      BrowserModule,
      FormsModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      AppRoutingModule, // Asegúrate de incluir el módulo de rutas
      MatProgressBarModule,
      MatSliderModule,
      MatOptionModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      BrowserAnimationsModule,
      RouterModule,
      HttpClientModule,
      MatTableModule,
      MatPaginatorModule,
      MatDialogModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatListModule,
      CommonModule,
      
    ],
    providers: [SesionService, CatalogosService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
