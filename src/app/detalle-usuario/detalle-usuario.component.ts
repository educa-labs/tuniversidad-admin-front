import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
// Importar providers
import { DataUsuariosService } from '../_services/index';

@Component({
    selector: 'app-detalle-usuario',
    templateUrl: './detalle-usuario.component.html',
    styleUrls: ['./detalle-usuario.component.css']
})

export class DetalleUsuarioComponent implements OnInit {
    /* DetalleUsuarioComponent: componente para el detalle del usuario. Se implementa
    que al iniciar se busca el id seleccionado y después se consulta por la información. */

    id_seleccionado: any;
    data_recibida: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private data: DataUsuariosService) { }

    ngOnInit() {
        /* ngOnInit: Funcion que para cuándo se ingresa a la vista busque
        el ID actual y toda la información del usuario. */
        this.route.params.subscribe(params => {
            // Buscar el id recién seleccionado
           this.id_seleccionado = +params['id'];
           console.log('Id seleccionado: ',this.id_seleccionado);
           // Llamar a la funcion para consultar información
           this.consultar_informacion(this.id_seleccionado);
        });
    }

    consultar_informacion(id) {
        /* consultar_informacion: recibe un id y token. Llama a la función del
        service data y guarda lo recibido */
        this.data.detalle_usuario(id, 'fqH6AyiyhQMeqKM8MjMC')
            .then(data => {
                // Guardar toda la información del usuarios
                this.data_recibida = data;
                console.log('Data recibida: ', this.data_recibida);
            })
    }
}