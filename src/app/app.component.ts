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
import { AuthService } from './services/auth.service';

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
export class AppComponent implements OnInit {

  items: MenuItem[];
  mostrarModalLogin: EventEmitter<boolean>;
  title = 'plataforma-SEPA';
  logged = false;
  nombre: string | null = '';

  constructor(
    private serviceMain: ServiceMain,
    private registerComponent: RegisterComponent,
    private authService: AuthService
  ){
    this.items = [{label:'ejemplo'}];
    this.mostrarModalLogin = new EventEmitter(false);
  }

  ngOnInit():void {
    // Verificar estado inicial
    const savedEmail = localStorage.getItem('email');
    const savedNombre = localStorage.getItem('nombre');
    
    if (savedEmail && savedNombre) {
      this.logged = true;
      this.nombre = savedNombre;
      this.authService.login({ email: savedEmail, nombre: savedNombre });
    }
  }

  logout(): void {
    localStorage.clear();
    this.logged = false;
    this.nombre = null;
    this.authService.logout();
  }

  showLogin = false;

  clickLogin(): void {
    if (this.logged) {
      this.logout();
    } else {
      this.showLogin = true;
    }
  }

  onLoginSuccess(event: any): void {
    this.logged = true;
    this.nombre = event.nombres + ' ' + event.apellidos;
    this.showLogin = false;
  }
}