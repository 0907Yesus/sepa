
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Dialog, DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Observable } from 'rxjs';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { RegisterComponent } from '../register/register.component';
import { ServiceMain } from '../services/service.service';
import { TooltipModule } from 'primeng/tooltip';
import { Login, RespuestaLogin } from '../interfaces/usuarios.interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToolbarModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    DialogModule,
    Dialog,
    InputTextModule,
    FloatLabelModule,
    IftaLabelModule,
    PasswordModule,
    RegisterComponent,
    TooltipModule,
  ]
})
export class LoginComponent implements OnInit {
  @Input() showLogin!: Observable<boolean>;
  @Output() goToCourse = new EventEmitter<void>();
  @Output() mostrarModalRegistro = new EventEmitter<boolean>();
  
  mostrarLogin: boolean = false;
  loginForm: FormGroup;
  hidePassword: boolean = true;
  passwordFocused: boolean = false;
  openCourse: boolean = false; // Agregar esta propiedad

  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor(private serviceMain: ServiceMain) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      pass: ['', [
        Validators.required, 
        Validators.minLength(10),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,15}$/)
      ]],
    });
  }

  ngOnInit(): void {
    this.showLogin?.subscribe(modal => {
      this.mostrarLogin = modal;
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  logear() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      
      this.serviceMain.postLogin(formValues.email, formValues.pass).subscribe({
        next: (response) => {
          if(response.status === 'success') { 
            Swal.fire({
              title: 'Login exitoso',
              text: `Bienvenido ${response.data.nombres} ${response.data.apellidos}`,
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                // Mejor manejo de localStorage
                try {
                  localStorage.setItem('nombre', response.data.nombres + ' ' + response.data.apellidos);
                  localStorage.setItem('email', response.data.correo);
                  localStorage.setItem('role', response.data.id_rol.toString());
                  localStorage.setItem('id_usuario', response.data.registrado.toString());
                } catch (error) {
                  console.error('Error saving to localStorage:', error);
                }
                
                if(this.openCourse) {
                  this.goToCourse.emit();
                }
                this.closeModal();
                // Usar Router en lugar de location.reload()
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/current-route']);
                });
              }
            });
          } else if(response.messages === 'Contraseña incorrecta'){
            Swal.fire({
              title: 'Error',
              text: `Contraseña incorrecta por favor valida que sea la misma contraseña institucional.`,
              icon: 'error',
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: `Por favor registrese e ingrese a Moodle con sus credenciales primero para poder loguearse en la plataforma de Certificaciones.`,
              icon: 'error',
            });
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error durante el login',
            icon: 'error',
          });
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      this.loginForm.markAllAsTouched();
    }
  }

  closeModal(): void {
    this.mostrarLogin = false;
  }

  clickRegister(): void {
    this.mostrarLogin = false;
    this.mostrarModalRegistro.emit(true);
  }
}
