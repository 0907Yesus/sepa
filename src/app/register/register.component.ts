import { Component, EventEmitter, inject, Input, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule, FormGroup, FormsModule, Validators, FormBuilder, PatternValidator, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
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
import { Password, PasswordModule } from 'primeng/password';
import { LoginComponent } from "../login/login.component";
import { TooltipModule } from "primeng/tooltip";
import { Register } from "../interfaces/usuarios.interfaces";
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
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
    FormsModule,
    FloatLabelModule,
    IftaLabelModule,
    PasswordModule,
    ReactiveFormsModule,
    TooltipModule,
  ]
})

export class RegisterComponent implements OnInit {
  @Input() showRegister: Observable<boolean>;
  mostrarModalRegistro: boolean = true;
  
   fb=inject(FormBuilder);
   

  registerForm= this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^[^,\s]+@[^,\s]+\.[^,\s]+$/)]),
    emailRepetir: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(10) ,Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    passwordRepetir: new FormControl('', Validators.required),
  },{
    validators:[
      passwordNoMatch('password','passwordRepetir'),
      emailNoMatch('email', 'emailRepetir')
    ]
  }
);
  serviceMain: any;
  
 
  constructor(private formBuilder: FormBuilder, private loginComponent: LoginComponent) {
    this.mostrarModalRegistro = false;
    this.showRegister = new Observable<boolean>();
  }


  ngOnInit(): void {

    this.showRegister.subscribe(modal => {
      this.mostrarModalRegistro = modal;
    })
  }
  
  clickLogin(): void {
    this.mostrarModalRegistro = false;
    this.loginComponent.mostrarLogin = true;
  }
  register(){
    const register: Register = { email: '', password: '',emailRepetir:'',passwordRepetir:'' };
        console.log(this.registerForm.value);
      
        if (this.registerForm.valid) {
          register.email = this.registerForm.controls['email'].value;
          register.password = this.registerForm.controls['password'].value;
          register.emailRepetir = this.registerForm.controls['emailRepetir'].value;
          register.passwordRepetir = this.registerForm.controls['passwordRepetir'].value;
          this.serviceMain.postRegister(register).subscribe((data: any) => {
            console.log('Configuración actualizada:', data);
          });
        }
}

}
  export const passwordNoMatch = (firstControl:string,secondControl:string):ValidatorFn=>{
    return   (formGroup:AbstractControl):ValidationErrors| null=>{
        const passwordControl=formGroup.get(firstControl);
        const passwordRepetirControl=formGroup.get(secondControl);
        return passwordControl?.value===passwordRepetirControl?.value? null :{passwordNoMatch:true} 
      }
  }

  export const emailNoMatch = (firstEmailControl:string,secondEmailControl:string):ValidatorFn=>{
    return   (formGroup:AbstractControl):ValidationErrors| null=>{
        const emailControl=formGroup.get(firstEmailControl);
        const emailRepetirControl=formGroup.get(secondEmailControl);
        return emailControl?.value===emailRepetirControl?.value? null :{emailNoMatch:true}
      }
    }


