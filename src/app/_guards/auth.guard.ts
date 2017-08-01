import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    /* AuthGuard: guard que revisa la autentificación del usuario. Retorna true
    solamente si el usuario actual está seteado */

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /* canActivate: funcion para ver si se puede avanzar o no. Revisa si 
        hay un usuario seteado de forma local y retorna un boolean */
        if (localStorage.getItem('currentUser')) {
            // Si está iniciado sesión retorna true
            return true;
        } 
        // Si no está iniciado sesión se lleva a login
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}