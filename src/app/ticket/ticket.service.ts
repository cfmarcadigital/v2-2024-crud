import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'http://localhost:3000/tickets';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getTickets(): Observable<any> {
    return this.httpClient.get(this.apiUrl, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  createTicket(ticket: Ticket): Observable<any> {
    return this.httpClient.post(this.apiUrl, JSON.stringify(ticket), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getTicket(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/' + id)
      .pipe(catchError(this.errorHandler));
  }

  updateTicket(id: number, ticket: Ticket): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/' + id, JSON.stringify(ticket), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  deleteTicket(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error code: ${error.status}\nMessage: ${error.message}';
    }
    return throwError(() => errorMessage);
  }
}
