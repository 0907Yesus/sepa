import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import {  CursoComunidad, CursoInduccion, CursoNodo, CursoPronfundizacion, } from '../interfaces/cursos.interfaces';
import { LoginComponent } from '../login/login.component';
import { Login, Register, RespuestaLogin } from '../interfaces/usuarios.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServiceMain {
 
  private apiUrl = 'https://campusvirtual.areandina.edu.co/sepa-back'; 
  private apiRegisterUrl='';

  private http: HttpClient = inject(HttpClient);
  endpoint: any;

  postLogin(email: string, pass : string): Observable<RespuestaLogin>{
    return this.http.post<RespuestaLogin>(`${this.apiUrl}/login`, { email, pass });
  }
  postRegister(register: Register): Observable<any> {
      return this.http.post<any>(this.apiRegisterUrl, register);
    }

  public getDataCursoNodo():Observable<CursoNodo >{
    return this.http.get<CursoNodo>(`${this.apiUrl}/cursos/nodos`)
  }

    public getDataCursoInduccion():Observable<CursoInduccion >{
    return this.http.get<CursoInduccion>(`${this.apiUrl}/cursos/induccion`)
  }
   public getDataCursoComunidad():Observable<CursoComunidad >{
    return this.http.get<CursoComunidad>(`${this.apiUrl}/cursos/comunidad`)
  }
   public getDataCursoPronfundizacion():Observable<CursoPronfundizacion >{
    return this.http.get<CursoPronfundizacion>(`${this.apiUrl}/cursos/profundizacion`)
  }

  getAllVacantesidUserLider($id : any): Observable<any> {
    const Vacantes = `${this.apiUrl}/enrollment/${$id}`;
    return this.http.get<any>(Vacantes);
  }
  

  openCloseLogin: EventEmitter<boolean>;
  openCloseRegister: EventEmitter<boolean>;

  constructor() { 
    this.openCloseLogin = new EventEmitter<boolean>(false);
    this.openCloseRegister = new EventEmitter<boolean>(false);
   }

}
