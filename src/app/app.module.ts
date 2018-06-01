import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
// Importar paginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { LoginPage } from '../pages/login/login';
import { UniversidadesPage } from '../pages/universidades/universidades';
import { NewsListPage } from '../pages/news-list/news-list'
import { DetalleUniversidadPage } from '../pages/detalle-universidad/detalle-universidad';
import { AgregarUniversidadPage } from '../pages/agregar-universidad/agregar-universidad';
import { DetalleCarreraPage } from '../pages/detalle-carrera/detalle-carrera';
import { AgregarCarreraPage } from '../pages/agregar-carrera/agregar-carrera';
import { DetalleCampusPage} from  '../pages/detalle-campus/detalle-campus';
import { AgregarCampusPage} from '../pages/agregar-campus/agregar-campus'
import { NewsCreatePage} from '../pages/news-create/news-create'
import { NewsShowPage } from '../pages/news-show/news-show'
// importar providers
import { AuthProvider } from '../providers/auth/auth';
import { DataUsuariosProvider } from '../providers/data-usuarios/data-usuarios';
import { DataUniversidadesProvider } from '../providers/data-universidades/data-universidades';
import { DataCarrerasProvider } from '../providers/data-carreras/data-carreras';
import { DataAreasProvider } from '../providers/data-areas/data-areas';
import { CampusProvider } from '../providers/campus/campus';
import { NewsProvider } from '../providers/news/news';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        UsuariosPage,
        LoginPage,
        UniversidadesPage,
        DetalleUniversidadPage,
        DetalleCarreraPage,
        AgregarCarreraPage,
        AgregarUniversidadPage,
        DetalleCampusPage,
        AgregarCampusPage,
        NewsListPage,
        NewsCreatePage,
        NewsShowPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        UsuariosPage,
        LoginPage,
        UniversidadesPage,
        DetalleUniversidadPage,
        DetalleCarreraPage,
        AgregarCarreraPage,
        AgregarUniversidadPage,
        DetalleCampusPage,
        AgregarCampusPage,
        NewsListPage,
        NewsCreatePage,
        NewsShowPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider,
        DataUsuariosProvider,
        DataUniversidadesProvider,
        DataCarrerasProvider,
        DataAreasProvider,
        CampusProvider,
        NewsProvider,
    ]
})
export class AppModule {}
