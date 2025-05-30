// interfaces/cursos.interfaces.ts

export interface Cards {
    subtitulo: string;
    imagen: string;
  }
  
  export interface Cursos {
    imagen: string;
    informacionDelCurso: string;
    fullname: string;
  }
  
  // Actualizar la interfaz Datum para coincidir con el endpoint
  export interface Datum {
    id: string;
    fullname: string;
    descripcion: string;
    url_video: string;
    url_imagen_course: string;  // Esta es la propiedad que faltaba
    id_moodle: string;
    obligatorio: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    
    // Propiedades adicionales que puedas estar usando en el componente
    imagen?: string;  // Para compatibilidad hacia atrás
    informacionDelCurso?: string;  // Para compatibilidad hacia atrás
  }
  
  export interface ModalDescripcionCurso {
    icono: string;
    imagen: string;
    informacionCurso: string;
    name: string;
    fullname: string;
    colorFondo: string;
  }
  
  export interface ModalDetalleCursos {
    abrir: boolean;
    dato: ModalDescripcionCurso;
  }
  
  export interface Nodos {
    name: string;
    nameColorLetra: string;
    icono: string;
    colorFondo: string;
    iconoPrevious: string;
    iconoNext: string;
    dataCarousel: Datum[];
  }
  
  export interface Unificacion {
    // Define las propiedades según necesites
  }
  
  // Interfaz para la respuesta del API
  export interface ApiResponse {
    status: string;
    data: Datum[];
  }

  /** cursos*/
export interface CursoNodo {

    status: string;
    data: Datum[];
}
export interface CursoInduccion {

    status: string;
    data: Datum[];
}

export interface CursoComunidad {

    status: string;
    data: Datum[];
}

export interface CursoPronfundizacion {
    
    status: string;
    data: Datum[];
}