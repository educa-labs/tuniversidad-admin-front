import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
// Importar paginas
import { HomePage } from '../home/home';
// Import providers
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})

export class LoginPage {
    /* Login: pagina de login del administrador. El usuario ingresa las credenciales
    y solo entra a la siguiente pagina si es administrador */

    credenciales: any = {email: '', password: ''};

    constructor(
        public nav: NavController, 
        public navParams: NavParams,
        public loading: LoadingController,
        public menuCtrl: MenuController,
        public auth: AuthProvider) {

            // Deshabilitar el menu dentro del login
            this.menuCtrl.enable(false);
    }

     public login() {
         /* login: funcion para hacer login dentro de la plataforma. Llama a la funcion
         del provider auth. Si pasa el observer setea a la pagina home como root. */
         this.auth.login(this.credenciales)
             .subscribe(allowed => {
                 if (allowed) {
                     // Setear la pagina de inicio como root
                     this.nav.setRoot(HomePage);
                     // Habilitar el menu
                     this.menuCtrl.enable(true);
                 }
                 // Si no tiene acceso ese usuario
                 else {
                     alert('Acceso denegado');
                 }
             }, error => {
                 alert(error);
             })
     }

}
