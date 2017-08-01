import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
// Importar componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const rutasApp: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UsuariosComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
        RouterModule.forRoot(rutasApp)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
