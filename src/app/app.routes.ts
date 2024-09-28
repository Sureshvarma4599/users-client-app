import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { MappingComponent } from './mapping/mapping.component';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    { path: 'create-user', component: CreateUserComponent },
    { path: 'create-role', component: CreateRoleComponent },
    { path: 'mapping', component: MappingComponent },
    { path: 'retrieve', component: RetrieveComponent },
    { path: '', redirectTo: '', pathMatch: 'full' } // 
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }