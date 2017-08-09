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
import { UsuariosComponent, DialogUsuarios } from './usuarios/usuarios.component';
import { DetalleUsuarioComponent, DialogDetalleUsuarios } from './detalle-usuario/detalle-usuario.component';
import { UniversidadesComponent } from './universidades/universidades.component';
// Importar guards
import { AuthGuard } from './_guards/index';
// Importar services
import { AuthService, DataUsuariosService } from './_services/index';
// Importar angular material
import { MdMenuModule, MdIconModule, MdToolbarModule, 
    MdInputModule, MdButtonModule, MdCardModule, MdTableModule, MdListModule,
    MdGridListModule, MdSidenavModule, MdTabsModule, MdDialogModule, MdProgressSpinnerModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const rutasApp: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsuariosComponent, canActivate: [AuthGuard] },
    { path: 'users/:id', component: DetalleUsuarioComponent },
    { path: 'universidades', component: UniversidadesComponent, canActivate: [AuthGuard] },
    // Error 404 lleva home
    { path: '**', redirectTo: '/users' }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UsuariosComponent,
        DetalleUsuarioComponent,
        UniversidadesComponent,
        DialogUsuarios,
        DialogDetalleUsuarios
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        MdMenuModule, 
        MdToolbarModule,
        MdTabsModule,
        MdDialogModule,
        MdProgressSpinnerModule,
        MdCardModule,
        MdSidenavModule,
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
    bootstrap: [AppComponent],
    entryComponents: [
        DialogUsuarios, 
        DialogDetalleUsuarios
    ]
})

export class AppModule { }