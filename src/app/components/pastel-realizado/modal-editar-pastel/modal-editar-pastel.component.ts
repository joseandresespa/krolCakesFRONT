import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pastelrealizado } from 'src/app/models/pastelrealizado.interface';
@Component({
  selector: 'app-modal-editar-pastel',
  templateUrl: './modal-editar-pastel.component.html',
  styleUrls: ['./modal-editar-pastel.component.css']
})
export class ModalEditarPastelComponent implements OnInit {

  pastel: pastelrealizado;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { pastel: pastelrealizado }) { 
    this.pastel = data.pastel; 
  }

  ngOnInit(): void {
    
  }

}
