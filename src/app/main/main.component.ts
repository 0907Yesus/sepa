import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin, Subscription } from 'rxjs';

import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { SplitterModule } from 'primeng/splitter';

import { Cards, Cursos, Datum, ModalDescripcionCurso, ModalDetalleCursos, Nodos, Unificacion } from '../interfaces/cursos.interfaces';
import { ModalDetalleCursosComponent } from '../modal-detalle-cursos/modal-detalle-cursos.component';
import { LoggedCoursesComponent } from '../logged-courses/logged-courses.component';
import { ServiceMain } from '../services/service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PanelModule,
    CardModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    SelectModule,
    SplitterModule,
    ModalDetalleCursosComponent,
    LoggedCoursesComponent,
  ],
  providers: [ServiceMain],
})
export class MainComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  currentUser: any = null;
  private authSubscription?: Subscription;

  cards: Cards[] = [];
  nodos: Nodos[] = [];
  nodosAuxiliarInfo: Nodos[] = [];
  nodosSelector: Nodos[] = [];
  seleccionarCurso: Nodos | undefined;
  mostrarModalDetallCursos: boolean = false;
  descripcionCurso: ModalDescripcionCurso = {} as ModalDescripcionCurso;
  unificacion: Unificacion = {} as Unificacion;

  cursoNodo: Datum[] = [];
  cursoInduccion: Datum[] = [];
  cursoComunidad: Datum[] = [];
  cursoProfundizacion: Datum[] = [];

  responsiveOptions: any[] = [];

  constructor(
    private serviceMain: ServiceMain,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.currentUser = this.authService.currentUser;

    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.subcursos();
      }
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.generacionCards();
    this.subcursos();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  // Métodos de cursos y estructura
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

      this.generarCards();
    });
  }

  generarCards(): void {
    this.generacionNodos();
    this.setValoresDesplegable();
    this.responsiveOptions = [
      { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
      { breakpoint: '1280px', numVisible: 3, numScroll: 1 },
      { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
      { breakpoint: '768px', numVisible: 1, numScroll: 1 },
      { breakpoint: '575px', numVisible: 1, numScroll: 1 },
      { breakpoint: '375px', numVisible: 1, numScroll: 1 },
      { breakpoint: '412px', numVisible: 1, numScroll: 1 },
    ];
  }

  generacionCards(): void {
    this.cards = [
      { subtitulo: "Nodos del Sello", imagen: "/assets/img/sepa_img_trasp/SEPA_C1.png" },
      { subtitulo: "Inducción Institucional", imagen: "/assets/img/sepa_img_trasp/SEPA_C2.png" },
      { subtitulo: "Comunidad Areandina", imagen: "/assets/img/sepa_img_trasp/SEPA_C3.png" },
      { subtitulo: "Profundización por Áreas", imagen: "/assets/img/sepa_img_trasp/SEPA_C4.png" },
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
      }
    ];
    this.nodosAuxiliarInfo = this.nodos;
  }

  setValoresDesplegable(): void {
    this.nodosSelector = [...this.nodos];
    const todos: Nodos = { name: 'Todos los cursos' } as Nodos;
    this.nodosSelector.unshift(todos);
    this.seleccionarCurso = todos;
  }

  cambioSelectorNodo(): void {
    if (this.seleccionarCurso?.name === 'Todos los cursos') {
      this.nodos = this.nodosAuxiliarInfo;
    } else if (this.seleccionarCurso) {
      this.nodos = [this.seleccionarCurso];
    }
  }

  clickModalCursos(nodo: any, curso: any, unificacion: any): void {
    this.descripcionCurso = {
      icono: nodo.icono,
      imagen: curso.url_imagen_course,
      informacionCurso: curso.descripcion,
      name: nodo.name,
      fullname: curso.fullname,
      colorFondo: nodo.colorFondo
    };
    
    // Asegurarse de que tenemos todos los datos necesarios
    if (this.descripcionCurso.imagen && this.descripcionCurso.informacionCurso) {
      this.mostrarModalDetallCursos = true;
    }
  }

  getUserId(): string {
    return this.authService.getUserId();
  }

  logout(): void {
    this.authService.logout();
  }
}
