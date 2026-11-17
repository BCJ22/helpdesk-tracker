import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { NewTicket, Status, Ticket } from './ticket.model';
@Service()
export class TicketApi {
 private readonly http = inject(HttpClient);
 private readonly baseUrl = 'http://localhost:8080/api/tickets';
 list(status?: Status): Observable<Ticket[]> {
 let params = new HttpParams();
 if (status) {
 params = params.set('status', status);
 }
 return this.http.get<Ticket[]>(this.baseUrl, { params });
 }
 create(ticket: NewTicket): Observable<Ticket> {
 return this.http.post<Ticket>(this.baseUrl, ticket);
 }
 update(ticket: Ticket): Observable<Ticket> {
 return this.http.put<Ticket>(`${this.baseUrl}/${ticket.id}`, ticket);
 }
 delete(id: number): Observable<void> {
 return this.http.delete<void>(`${this.baseUrl}/${id}`);
 }
}
