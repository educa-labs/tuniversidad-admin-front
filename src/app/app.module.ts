import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Importar componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
// Importar guards
import { AuthGuard } from './_guards/index';
// Importar services
import { AuthService } from './_services/index';
// Importar angular material
import { MdMenuModule, MdIconModule, MdToolbarModule } from '@angular/material';

const rutasApp: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsuariosComponent, canActivate: [AuthGuard] },
    // Error 404 lleva home
    { path: '**', redirectTo: '/users' }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UsuariosComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        MdMenuModule, 
        MdToolbarModule,
        MdIconModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(rutasApp)
    ],
    providers: [
        AuthGuard,
        AuthService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }