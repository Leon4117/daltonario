import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    ><br>
    <h1>{{text}}</h1>
    <h5>{{result}}</h5>
  `
})

export class SearchBoxComponent  {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  text = '';
  result = '';

  constructor( private gifsService: GifsService, private openaiService: OpenAIService ) { }


  // searchTag( newTag: string ) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.text = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

  }

  generateImage() {
    const prompt = 'Dame la definición y la traducción en ingles de: ' + this.tagInput.nativeElement.value;
    this.openaiService.generateCompletion(prompt).subscribe((data) => {
      console.log(data)
      this.result = data.toString();
    });
  }

}
