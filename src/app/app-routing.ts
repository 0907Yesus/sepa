import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';




export const routes: Routes = [
    {
        path:'',
        component: MainComponent
    },
    {
        path:'',
        component: LoginComponent
    },
    {
        path:'**',
        component: MainComponent
    },
    
      
];
@NgModule({
    declarations:[
    
    ],
  
    imports: [RouterModule.forRoot(routes)],
            
    exports: [RouterModule]
  })
  export class AppRoutingModule { }