import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {

    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);

      this.mensaje('Guardado en favoritos');
    } else {
      this.mensaje('Ya existe en favoritos');
    }


  }

  async cargarFavoritos() {

    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }
    // this.storage.get('favoritos')
    //   .then( favoritos => {
    //     console.log('fav' , favoritos);
    //   });
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);

    this.mensaje('Eliminado de favoritos');
  }

  async mensaje(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
