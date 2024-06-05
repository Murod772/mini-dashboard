import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tickets`);
  }

  getTicket(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tickets/${id}`);
  }

  updateTicket(ticket: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tickets/${ticket.id}`, ticket);
  }
}
