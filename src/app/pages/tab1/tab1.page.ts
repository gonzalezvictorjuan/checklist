import { Component } from '@angular/core';
import { ListasService } from '../../services/listas.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from "../modal/modal.page";
import { ModalOptions, OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public listasService: ListasService,
               private router: Router,
               private alertController: AlertController,
               public modalCtrl: ModalController){
  //Agrego el router de angular para navegar en las pestañas

  }

  name: string = "";

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps : {
        custom : this.name
      }
    });

    await modal.present();
  }







  async agregarLista() { //el async transforma el metodo/function a una promesa
    //redireccion a la parte de agregar 
    //this.router.navigateByUrl('/tabs/tab1/agregar');


    const alert =  await this.alertController.create({
      header   :  'Nueva Lista',
      inputs   :  [
        {
          name         :  'titulo',
          type         :  'text',
          placeholder  :  'Nombre de la lista'
        }
      ],
      buttons  :  [
        {
          text   :  'Cancelar',
          role   :  'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            if ( data.titulo.length === 0) { return; }

            const listaId = this.listasService.crearLista(data.titulo);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);

          }
        }
      ]
    });

    alert.present();
  }

}
