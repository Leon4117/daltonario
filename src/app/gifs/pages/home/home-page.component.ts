import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { OpenAIService } from '../../services/openai.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor( private gifsService: GifsService, private openaiService: OpenAIService) {}

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

}
