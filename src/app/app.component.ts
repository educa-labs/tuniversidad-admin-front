import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Importar paginas
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { LoginPage } from '../pages/login/login';
import { UniversidadesPage } from '../pages/universidades/universidades';
 
@Component({
    templateUrl: 'app.html'
})

export class MyApp {

    @ViewChild(Nav) nav: Nav;
    // Pagina Root
    rootPage:any = LoginPage;
    // Paginas del menu
    paginas: any;
    // Opciones del menu
    opciones: any;

    constructor(
        platform: Platform, 
        statusBar: StatusBar, 
        splashScreen: SplashScreen) {

            // Configurar las paginas del menu
            this.paginas = [
                { titulo: 'Universidades', component: UniversidadesPage, icon: 'paper' }
            ]
            // Cuando está lista la plataforma
            platform.ready().then(() => {
                statusBar.styleDefault();
                splashScreen.hide();
            });
    }

    abrir_pagina(page) {
        /* abrir_pagina: Al apretar un item del menu se abre una pagina. Setea la pagina
        root a la del componente clickeado */
        this.nav.setRoot(page.component)
    }
}

