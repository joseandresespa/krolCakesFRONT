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
