import { Component, OnInit } from '@angular/core';
import { pedido } from 'src/app/models/pedido.interface';
import { CotizacionPedidosService } from 'src/services/cotizacion-pedidos.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFinPedidoAgendaComponent } from './modal-fin-pedido-agenda/modal-fin-pedido-agenda.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  pedidos: pedido[] = []; 
  calendar: { day: number, clientNames?: { name: string, pedido: pedido }[] }[][] = []; 
  month: number = new Date().getMonth(); // Mes actual
  year: number = new Date().getFullYear(); // Año actual

  constructor(public dialog: MatDialog, private service: CotizacionPedidosService) {}

  ngOnInit(): void {
    this.service.pedidos().subscribe((pedido: pedido[]) => {
      this.pedidos = pedido;
      console.log('Pedidos cargados:', this.pedidos); // Verifica los pedidos
      this.generateCalendar();
    });
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[monthIndex];
  }
  
  generateCalendar(): void {
    const date = new Date(this.year, this.month, 1);
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    const firstDay = date.getDay();
  
    this.calendar = [];
    let week: { day: number, clientNames?: { name: string, pedido: pedido }[] }[] = [];
  
    // Rellenar la primera semana con días vacíos si es necesario
    for (let i = 0; i < firstDay; i++) {
      week.push({ day: 0 });
    }
  
    // Rellenar los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const matchingPedidos = this.pedidos.filter(p => {
        if (p.fecha && p.hora) {
          // Crear el objeto Date combinando la fecha y la hora
          const pedidoDate = new Date(`${p.fecha}T${p.hora}`);
          return pedidoDate.getFullYear() === this.year && pedidoDate.getMonth() === this.month && pedidoDate.getDate() === day;
        }
        return false;
      });
  
      // Almacenar los pedidos coincidentes
      if (matchingPedidos.length > 0) {
        week.push({
          day,
          clientNames: matchingPedidos.map(p => ({
            name: p.nombre || 'Sin Nombre',
            pedido: p
          }))
        });
      } else {
        week.push({ day });
      }
  
      // Agrupar en semanas
      if (week.length === 7) {
        this.calendar.push(week);
        week = [];
      }
    }
  
    // Añadir la última semana si quedó incompleta
    if (week.length > 0) {
      this.calendar.push(week);
    }
  
    console.log('Calendario generado:', this.calendar);
  }
  
  

  // Método para ir al mes anterior
  previousMonth(): void {
    if (this.month === 0) {
      this.year--;
      this.month = 11; // Diciembre
    } else {
      this.month--;
    }
    this.generateCalendar();
  }

  // Método para ir al mes siguiente
  nextMonth(): void {
    if (this.month === 11) {
      this.year++;
      this.month = 0; // Enero
    } else {
      this.month++;
    }
    this.generateCalendar();
  }

  openModal(pedido: pedido): void {
    const dialogRef = this.dialog.open(ModalFinPedidoAgendaComponent, {
      width: '600px',
      maxHeight: '80vh', 
      data: pedido
    });
    console.log(pedido);
  }
}
