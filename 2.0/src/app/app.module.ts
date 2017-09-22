import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
// Importar paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { LoginPage } from '../pages/login/login';
import { UniversidadesPage } from '../pages/universidades/universidades';
import { DetalleUniversidadPage } from '../pages/detalle-universidad/detalle-universidad';
import { DetalleCarreraPage } from '../pages/detalle-carrera/detalle-carrera';
// importar providers
import { AuthProvider } from '../providers/auth/auth';
import { DataUsuariosProvider } from '../providers/data-usuarios/data-usuarios';
import { DataUniversidadesProvider } from '../providers/data-universidades/data-universidades';
import { DataCarrerasProvider } from '../providers/data-carreras/data-carreras';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        UsuariosPage,
        LoginPage,
        UniversidadesPage,
        DetalleUniversidadPage,
        DetalleCarreraPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        UsuariosPage,
        LoginPage,
        UniversidadesPage,
        DetalleUniversidadPage,
        DetalleCarreraPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider,
        DataUsuariosProvider,
        DataUniversidadesProvider,
        DataCarrerasProvider
    ]
})
export class AppModule {}
