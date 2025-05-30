import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButton, SplitButtonModule } from 'primeng/splitbutton';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MenuItem } from 'primeng/api';
import { LoginComponent } from './login/login.component';
import { DialogModule } from 'primeng/dialog';
import { PanelMenu } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { ServiceMain } from './services/service.service';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports:[
    MainComponent,
    LoginComponent,
    CommonModule,
    ToolbarModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    DialogModule,
    PanelModule,
  ],
  providers:[RegisterComponent, LoginComponent]
})
export class AppComponent implements OnInit{

  items: MenuItem[];
  mostrarModalLogin: EventEmitter<boolean>;
  title = 'plataforma-SEPA';
  logged = false;
  nombre: string | null = '';

  constructor(private serviceMain: ServiceMain, private registerComponent: RegisterComponent){
    this.items = [{label:'ejemplo'}];
    this.mostrarModalLogin= new EventEmitter(false);
  }

  ngOnInit():void{
    this.checkLoginStatus();
  } 

  checkLoginStatus(): void {
    this.nombre = localStorage.getItem('nombre');
    const savedUsername = localStorage.getItem('email');
    if (savedUsername) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  clickLogin():void{
    if (this.logged) {
      // Cerrar sesión
      this.logout();
    } else {
      // Abrir modal de login
      this.mostrarModalLogin.emit(true);
    }
  }

  logout(): void {
    // Limpiar localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('nombre');
    // Puedes agregar más items del localStorage que necesites limpiar
    
    // Actualizar estado
    this.logged = false;
    this.nombre = null;
  }

  // Método para ser llamado desde el componente de login cuando se complete el login exitosamente
  onLoginSuccess(): void {
    this.checkLoginStatus();
    this.mostrarModalLogin.emit(false);
  }
}