import { Component, EventEmitter, HostListener, Input, NgModule, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { Card, CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Cards, Cursos, Datum, ModalDescripcionCurso, ModalDetalleCursos, Nodos, Unificacion } from '../interfaces/cursos.interfaces';
import { ModalDetalleCursosComponent } from '../modal-detalle-cursos/modal-detalle-cursos.component';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
/*import "primeicons/primeicons.css";*/
import { SplitterModule } from 'primeng/splitter';
import { ServiceMain } from '../services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { LoggedCoursesComponent } from '../logged-courses/logged-courses.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [
    PanelModule,
    CardModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    CommonModule,
    ModalDetalleCursosComponent,
    SelectModule,
    FormsModule,
    SplitterModule,
    LoggedCoursesComponent,
  ],
  providers: [ServiceMain]
})
export class MainComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  
  cards: Cards[];
  nodos: Nodos[];
  nodosAuxiliarInfo: Nodos[];
  nodosSelector: Nodos[];
  mostrarModalDetallCursos: boolean = false;
  descripcionCurso: ModalDescripcionCurso;
  seleccionarCurso: Nodos | undefined;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  unificacion: any;

  cursoNodo: Datum[] = [];
  cursoInduccion: Datum[] = [];
  cursoComunidad: Datum[] = [];
  cursoProfundizacion: Datum[] = [];

  constructor(private serviceMain: ServiceMain) {
    this.cards = [];
    this.nodos = [];
    this.nodosSelector = [];
    this.nodosAuxiliarInfo = [];
    this.responsiveOptions = [];
    this.descripcionCurso = {} as ModalDescripcionCurso;
    this.unificacion = {} as Unificacion;
    this.initializeData();
  }

  clickModalCursos(nodo: any, curso: any, unificacion: any):void {
    this.descripcionCurso = {
      icono: nodo.icono,
      imagen: curso.url_imagen_course, // Usar la URL de imagen del endpoint
      informacionCurso: curso.descripcion, // Usar la descripción del endpoint
      name: nodo.name,
      fullname: curso.fullname,
      colorFondo: nodo.colorFondo
    }
    this.mostrarModalDetallCursos = true;
    console.log('Modal abierto para:', curso.fullname);
  }

  ngOnInit() {
    this.generacionCards(),
    this.subcursos();
    console.log('Usuario logueado:', this.isLoggedIn);
  }

  generarCards(): void {
    this.generacionNodos();
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1280px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '375px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '412px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.setValoresDesplegable();
  }

  subcursos(): void {
    forkJoin({
      cursoNodo: this.serviceMain.getDataCursoNodo(),
      cursoInduccion: this.serviceMain.getDataCursoInduccion(),
      cursoComunidad: this.serviceMain.getDataCursoComunidad(),
      cursoProfundizacion: this.serviceMain.getDataCursoPronfundizacion()
    }).subscribe(({ cursoNodo, cursoInduccion, cursoComunidad, cursoProfundizacion }) => {

      this.cursoNodo = cursoNodo.data;
      this.cursoInduccion = cursoInduccion.data;
      this.cursoComunidad = cursoComunidad.data;
      this.cursoProfundizacion = cursoProfundizacion.data;

      // Ya no necesitas mapear las imágenes ni la información, 
      // usa los datos directamente del endpoint
      
      this.generarCards();
    });
  }

  generacionCards(): void {
    this.cards = [
      {
        subtitulo: "Nodos del Sello",
        imagen: "/assets/img/sepa_img_trasp/SEPA_C1.png",
      },
      {
        subtitulo: "Inducción Institucional",
        imagen: "/assets/img/sepa_img_trasp/SEPA_C2.png",
      },
      {
        subtitulo: "Comunidad Areandina",
        imagen: "/assets/img/sepa_img_trasp/SEPA_C3.png",
      },
      {
        subtitulo: "Profundización por Áreas",
        imagen: "/assets/img/sepa_img_trasp/SEPA_C4.png",
      }
    ];
  }

  generacionNodos(): void {
    this.nodos = [
      {
        name: "Nodos del Sello",
        nameColorLetra: "color:rgb(244, 247, 248)",
        icono: "/assets/img/iconos_sepa/SEPA_ICO_NODOS.png",
        colorFondo: "background-color: rgb(30, 173, 225)",
        iconoPrevious: "/assets/img/iconos_sepa/SEPA_BTN_ANTERIOR_AZUL.png",
        iconoNext: "/assets/img/iconos_sepa/SEPA_BTN_SIGUIENTE.png",
        dataCarousel: this.cursoNodo
      },
      {
        name: "Inducción Institucional",
        nameColorLetra: "color:rgb(244, 247, 248)",
        icono: "/assets/img/iconos_sepa/SEPA_ICO_INDUCCION.png",
        colorFondo: "background-color: rgb(195, 37, 134)",
        iconoPrevious: "/assets/img/iconos_sepa/SEPA_BTN_ANTERIOR_MAGENTA.png",
        iconoNext: "/assets/img/iconos_sepa/SEPA_BTN_SIGUIENTE.png",
        dataCarousel: this.cursoInduccion
      },
      {
        name: "Comunidad Areandina",
        nameColorLetra: "color:rgb(244, 247, 248)",
        icono: "/assets/img/iconos_sepa/SEPA_ICO_COMUNIDAD.png",
        colorFondo: "background-color: rgb(214, 160, 23)",
        iconoPrevious: "/assets/img/iconos_sepa/SEPA_BTN_ANTERIOR_A.png",
        iconoNext: "/assets/img/iconos_sepa/SEPA_BTN_SIGUIENTE.png",
        dataCarousel: this.cursoComunidad
      },
      {
        name: "Profundización por Áreas",
        nameColorLetra: "color:rgb(244, 247, 248)",
        icono: "/assets/img/iconos_sepa/SEPA_ICO_PROFUNDIZACION.png",
        colorFondo: "background-color: rgb(128, 190, 86)",
        iconoPrevious: "/assets/img/iconos_sepa/SEPA_BTN_ANTERIOR_VERDE.png",
        iconoNext: "/assets/img/iconos_sepa/SEPA_BTN_SIGUIENTE.png",
        dataCarousel: this.cursoProfundizacion
      },
    ];
    this.nodosAuxiliarInfo = this.nodos;
  }

  setValoresDesplegable(): void {
    this.nodosSelector = [...this.nodos];
    if (this.nodosSelector.length > 0) {
      let todos: Nodos = {} as Nodos;
      todos.name = 'Todos los cursos';
      this.nodosSelector.unshift(todos);
      this.seleccionarCurso = todos;
    }
  }

  cambioSelectorNodo(): void {
    if (this.seleccionarCurso?.name == 'Todos los cursos') {
      this.nodos = this.nodosAuxiliarInfo;
    } else if (this.seleccionarCurso) {
      this.nodos = [this.seleccionarCurso];
    }
  }

  private initializeData(): void {
    // Inicializar datos de ejemplo - reemplaza con tu lógica real
    this.cards = [
      // Tus datos de cards existentes
    ];
    
    this.nodos = [
      // Tus datos de nodos existentes
    ];
    
    this.nodosSelector = [
      // Tus datos del selector existentes
    ];
  }
}