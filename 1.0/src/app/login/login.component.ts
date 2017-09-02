import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Importar providers
import { AuthService } from '../_services/index';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    credenciales: any = {};
    data_recibida: any;

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
        /* ngOnInit: se ejecuta cuando se abre esta parte. Se llama a la 
        funcion del service que borra el usuario actual. */
        console.log('Se abrió el login');
        // Resetear el login 
        this.auth.logout();
    }

    login() {
        /* login: funcion para hacer login. Manda las credenciales a la funcion
        login del service. */
        this.auth.login(this.credenciales.email, this.credenciales.password)
            .subscribe (
                data => {
                    console.log('Data recibida', data);
                    this.data_recibida = data;
                    this.router.navigate(['/users']);
                },
                error => {
                    console.log('Error recibido', error);
                    this.data_recibida = error.json()['error'];
                })
    }
}