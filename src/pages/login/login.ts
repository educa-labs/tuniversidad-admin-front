import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// Importar paginas
import { HomePage } from '../home/home';
// Import providers
import { AuthProvider } from '../../providers/auth/auth';

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
        public auth: AuthProvider,
        public storage: Storage) {

            this.storage.get('user').then((val) => {
                // Si está 'user' guardado en el storage
                if (val != null) {
                    // Setear el usuario actual con el valor que está guardado
                    this.auth.setUserInfo(val);    
                    // Convertir la pagina root en la página de inicio
                    this.nav.setRoot(HomePage);
                    // Habilitar el menú principal
                    this.menuCtrl.enable(true);
                }            
            });
            // Deshabilitar el menu dentro del login
            this.menuCtrl.enable(false);
    }

     public login() {
         /* login: funcion para hacer login dentro de la plataforma. Llama a la funcion
         del provider auth. Si pasa el observer setea a la pagina home como root. */
         this.auth.login(this.credenciales)
             .subscribe(allowed => {
                 if (allowed) {
                     // Setear el usuario actual
                    this.storage.set('user', this.auth.get_usuario_actual_info());
                    console.log('Se seteo el usuario', this.storage.get('user'));
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
