import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ListasService } from '../../services/listas.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() _terminada = true;

  @ViewChild( IonList ) lista: IonList;

  constructor(public listasService: ListasService,
              private router: Router,
              private alertController: AlertController) { }

  listaSeleccionada(lista: Lista) {
    if (this._terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista( lista: Lista) {
    this.listasService.borrarLista( lista );
  }

  async editarLista( lista: Lista) {
    const alert = await this.alertController.create({
      header: 'Modificar Lista',
      inputs: [
        {
          name         : 'titulo',
          type         : 'text',
          value        : lista.titulo,
          placeholder  : 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) { return; }

            lista.titulo = data.titulo;
            this.listasService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

  ngOnInit() {}

}
