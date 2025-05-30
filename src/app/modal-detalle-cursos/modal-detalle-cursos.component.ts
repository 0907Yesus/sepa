import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { Observable } from 'rxjs';
import {  ModalDescripcionCurso, ModalDetalleCursos} from '../interfaces/cursos.interfaces';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-detalle-cursos',
  imports: [
    DialogModule,
    Dialog,
   ButtonModule,
   CommonModule,
  ],
  templateUrl: './modal-detalle-cursos.component.html',
  styleUrl: './modal-detalle-cursos.component.css',
  standalone: true,
})
export class ModalDetalleCursosComponent implements OnInit, OnChanges {
  visible: boolean = false;
  curso: ModalDescripcionCurso;
  //@Input() showCursos!: Observable<ModalDetalleCursos>;
  @Input() showCursos: boolean = false;
  @Input() cursoData?: ModalDescripcionCurso;


constructor() {
  this.curso = {} as ModalDescripcionCurso;
}

ngOnInit(): void {
  // Ya no necesitas subscribe porque showCursos es un boolean
  this.visible = this.showCursos;
  if (this.cursoData) {
    this.curso = this.cursoData;
  }
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['showCursos']) {
    this.visible = changes['showCursos'].currentValue;
  }
  
  if (changes['cursoData'] && changes['cursoData'].currentValue) {
    this.curso = changes['cursoData'].currentValue;
  }
}

closeModal(): void {
  this.visible = false;
}

}




