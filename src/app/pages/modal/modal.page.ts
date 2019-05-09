import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  titulo: String = '';
  constructor( private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  
  async closeModal() {
    console.log("close");
    this.modalCtrl.dismiss();
  }
}
