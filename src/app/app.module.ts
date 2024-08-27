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







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CotizarComponent,
    MisionComponent,
    QsComponent,
    ContactoComponent,
   
    
    
 
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
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
