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
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
// Importar guards
import { AuthGuard } from './_guards/index';
// Importar services
import { AuthService, DataUsuariosService } from './_services/index';
// Importar angular material
import { MdMenuModule, MdIconModule, MdToolbarModule, 
    MdInputModule, MdButtonModule, MdCardModule, MdTableModule, MdListModule,
    MdGridListModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const rutasApp: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsuariosComponent, canActivate: [AuthGuard] },
    { path: 'users/:id', component: DetalleUsuarioComponent },
    // Error 404 lleva home
    { path: '**', redirectTo: '/users' }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UsuariosComponent,
        DetalleUsuarioComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        MdMenuModule, 
        MdToolbarModule,
        MdCardModule,
        MdTableModule,
        MdButtonModule,
        MdGridListModule,
        MdListModule,
        MdInputModule,
        MdIconModule,
        BrowserAnimationsModule,
        CdkTableModule,
        RouterModule.forRoot(rutasApp)
    ],
    providers: [
        AuthGuard,
        AuthService,
        DataUsuariosService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }