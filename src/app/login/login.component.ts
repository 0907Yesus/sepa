
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
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() loginSuccess = new EventEmitter<any>();
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
    // Remove the Observable subscription
  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
