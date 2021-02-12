import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string ='mFO9ptgmFzlLmRaj2EBo42V501PFcKPT';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public results: Gif[] = [];

  get historial() {
    // this._historial = this._historial.splice(0, 10);
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  //async buscarGifs(query: string = '') {
  buscarGifs(query: string = '') {
    
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( (resp ) => {
        // console.log(resp.data);
        this.results = resp.data;

        localStorage.setItem('results', JSON.stringify(this.results));
      });
  
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=mFO9ptgmFzlLmRaj2EBo42V501PFcKPT&q=dragon ball z&limit=10')
    //   .then( resp => {
    //     resp.json().then(data => console.log(data));
    //   });

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=mFO9ptgmFzlLmRaj2EBo42V501PFcKPT&q=dragon ball z&limit=10');
    // const data = await resp.json();
    // console.log(data);

    

  }
  

}
