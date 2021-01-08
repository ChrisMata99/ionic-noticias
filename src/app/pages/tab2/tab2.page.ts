import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  // La opcion del curso
  // @ViewChild(IonSegment) segment: IonSegment;
  // La opción facíl
  opcion = '';

  estado = false;

  categorias = [
    'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
  ];

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    // this.segment.value = this.categorias[0];
    this.opcion = this.categorias[0];
    this.cargarNoticias(this.opcion);
  }

  cambioCategoria(event) {
    this.noticias = [];
    this.opcion = event.detail.value;
    this.cargarNoticias(this.opcion);
  }


  cargarNoticias(categoria: string, event?) {
    this.noticiasService.getTopHeadlinesCategoria(categoria)
      .subscribe(resp => {
        // console.log(resp);
        if (resp.articles.length === 0) {
          // event.target.disabled = true;
          this.estado = true;
          event.target.complete();
          return;
        } else {
          this.estado = false;
        }

        this.noticias.push(...resp.articles);

        if (event) {
          event.target.complete();
        }
      });
  }

  loadData(event) {
    this.cargarNoticias(this.opcion, event);
  }

}
