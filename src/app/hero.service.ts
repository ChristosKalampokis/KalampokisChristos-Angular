import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from
  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  //getHeroes(): Observable<Hero[]> {


  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_ =>
      this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero
    id=${id}`)));
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',
          [])));

  }
  //const heroes = of(HEROES);

  private heroesUrl = 'api/heroes'; // URL to web api

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** * Handle Http operation that failed. * Let the app continue. * @param
  operation - name of the operation that failed * @param result - optional
  value to return as the observable result */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // log to console instead // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero,
      this.httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero')));
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero,
      this.httpOptions).pipe(
        tap((newHero: Hero) => this.log(`added hero w/
  id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero')));
  }


  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero')));
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


}



//getHero(id: number): Observable < Hero > {

//  this.messageService.add(`HeroService: fetched
//   hero id = ${id}`);
// const hero = HEROES.find(hero => hero.id === id);
// if(hero) {
//   return of(hero);
// } else {
//   throw new Error(`Hero with id = ${id} not found`);
// }
//}
//}

