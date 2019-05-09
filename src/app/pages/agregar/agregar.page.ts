import { Component, OnInit } from '@angular/core';
import { ListasService } from '../../services/listas.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(  private listasService: ListasService,
                private route: ActivatedRoute) {

    const listaId = this.route.snapshot.paramMap.get('listaId');

    this.lista = this.listasService.obtenerLista( listaId );

  }

  ngOnInit() {
  }

  agregarItem() {
    if ( this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = '';
    this.listasService.guardarStorage();
  }

  cambioCheck( item: ListaItem ) {
    const pendientes = this.lista.items
                           .filter( itemData => !itemData.completado)
                           .length;

    if ( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.listasService.guardarStorage();
  }

  eliminarItem( i: number ) {
    this.lista.items.splice( i, 1);
    this.listasService.guardarStorage();
  }


}
