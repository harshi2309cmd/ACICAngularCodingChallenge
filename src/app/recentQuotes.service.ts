import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RecentQuotes } from './recentQuotes';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class RecentQuotesService {
    private recentQuotesUrl = 'api/recentQuotes';  // URL to web Quote api
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    /** GET recent quotes from the server */
    getRecentQuotes(): Observable<RecentQuotes[]> {
        return this.http.get<RecentQuotes[]>(this.recentQuotesUrl)
        .pipe(
             tap(_ => this.log('fetched recent quotes')),
            catchError(this.handleError<RecentQuotes[]>('getRecentQuotes', []))
        );
    }

    /** GET Quotes by its line of business by id. Will 404 if id not found */
   getQuotesByLineOfBusinessId(id: number): Observable<RecentQuotes[]> {
    const url = `${this.recentQuotesUrl}/?lineOfBusiness=${id}`;
    return this.http.get<RecentQuotes[]>(url).pipe(
      tap(_ => this.log(`fetched Quote for lineOfBusiness id=${id}`)),
      catchError(this.handleError<RecentQuotes[]>(`getQuotesByLineOfBusinessId id=${id}`))
    );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a recentQuotesService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RecentQuotesService: ${message}`);
  }

}