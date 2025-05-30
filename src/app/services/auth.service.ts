// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);

  // Observables públicos
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Verificar si hay una sesión guardada al inicializar
    this.checkExistingSession();
  }

  // Verificar sesión existente
  private checkExistingSession(): void {
    const savedUser = localStorage.getItem('currentUser');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (savedUser && isLoggedIn) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  // Método para hacer login
  login(userData: any): void {
    // Guardar en localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userData.id || userData.userId);
    
    // Actualizar subjects
    this.currentUserSubject.next(userData);
    this.isLoggedInSubject.next(true);
  }

  // Método para hacer logout
  logout(): void {
    // Limpiar localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    
    // Actualizar subjects
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  // Getters
  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  get currentUser(): any {
    return this.currentUserSubject.value;
  }

  getUserId(): string {
    const user = this.currentUser;
    return user?.id || user?.userId || localStorage.getItem('userId') || '';
  }
}