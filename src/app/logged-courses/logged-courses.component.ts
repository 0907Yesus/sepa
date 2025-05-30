import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ServiceMain } from '../services/service.service';

interface MiCurso {
  id_usuario: string;
  id_curso: string;
  fullname: string;
  descripcion: string;
  url_imagen_course: string;
}

interface MisCursosResponse {
  status: string;
  data: MiCurso[];
}

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './logged-courses.component.html',
  styleUrl: './logged-courses.component.css'
})
export class LoggedCoursesComponent implements OnInit {
  @Input() userId?: string;
  
  misCursos: MiCurso[] = [];
  loading: boolean = false;
  error: string = '';
  
  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private serviceMain: ServiceMain) {}

  ngOnInit(): void {
    if (this.userId) {
      this.cargarMisCursos();
    }
  }

  cargarMisCursos(): void {
    if (!this.userId) return;
    
    this.loading = true;
    this.error = '';
    
    this.serviceMain.getAllVacantesidUserLider(this.userId).subscribe({
      next: (response: MisCursosResponse) => {
        if (response.status === 'success') {
          this.misCursos = response.data;
        } else {
          this.error = 'Error al cargar los cursos';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar mis cursos:', err);
        this.error = 'Error al cargar los cursos';
        this.loading = false;
      }
    });
  }

  verMasInformacion(curso: MiCurso): void {
    // Aquí puedes abrir un modal o navegar a otra página con los detalles
    console.log('Ver más información del curso:', curso);
    // Ejemplo: this.router.navigate(['/curso', curso.id_curso]);
  }

  accederCurso(curso: MiCurso): void {
    // Aquí puedes redirigir al usuario al curso
    console.log('Acceder al curso:', curso);
    // Ejemplo: window.open(`/curso/${curso.id_curso}`, '_blank');
  }
}