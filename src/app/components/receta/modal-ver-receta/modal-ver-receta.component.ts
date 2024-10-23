import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { receta } from 'src/app/models/receta.interface';

@Component({
  selector: 'app-modal-ver-receta',
  templateUrl: './modal-ver-receta.component.html',
  styleUrls: ['./modal-ver-receta.component.css']
})
export class ModalVerRecetaComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalVerRecetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { receta: receta }
  ) {}

  onSave(): void {
    this.dialogRef.close(this.data.receta);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
