import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',

})

export class SearchBoxComponent  {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  palabra = '';
  definicion = '';
  traduccionPalabra = '';

  constructor( private gifsService: GifsService, private openaiService: OpenAIService ) { }


  // searchTag( newTag: string ) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.palabra = this.gifsService.actualPalabra;
    this.tagInput.nativeElement.value = '';

  }

  generateImage() {
    const prompt = 'Dame la definición y la traducción en ingles de: ' + this.tagInput.nativeElement.value;
    this.openaiService.generateCompletion(prompt).subscribe((data) => {
      console.log(data)
      //this.result = data.toString();
    });
  }

    ngOnInit(): void {
      // Suscribirse al observable para recibir actualizaciones
      this.gifsService.obtenerValor().subscribe((valor) => {
      this.palabra = valor;
    });
  }
}
