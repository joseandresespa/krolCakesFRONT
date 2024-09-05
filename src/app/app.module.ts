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
      SisprincipalComponent
         
      
    
      
      
  
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
      ReactiveFormsModule
      
    ],
    providers: [SesionService, CatalogosService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
