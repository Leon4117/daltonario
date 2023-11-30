import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];
  public actualPalabra: string = '';

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'Q8b3LSIao7dtrL2OldM5V1x3AHDmAaeT';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagsHistory.unshift( tag );
    this._tagsHistory = this.tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }


  searchTag( tag: string ):void {
    if ( tag.length === 0 ) return;
    this.actualPalabra = tag;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '4' ) //Solo aparecen 4 Gifs
      .set('q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

        this.gifList = resp.data;
        // console.log({ gifs: this.gifList });

      });
  }


  private valorCompartido = new BehaviorSubject<string>('');

  enviarValor(valor: string): void {
    this.valorCompartido.next(valor);
  }

  obtenerValor(): Observable<string> {
    return this.valorCompartido.asObservable();
  }
}
