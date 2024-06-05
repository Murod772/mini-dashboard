import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TicketService } from '../../services/ticket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'createdDate', 'actions'];
  tickets: any[] = [];

  constructor(private store: Store, private ticketsService: TicketService, private router: Router, private route: ActivatedRoute,) {}

  ngOnInit() {
    this.ticketsService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  navigateToDetail(ticketId: string) {
    this.router.navigate(['/ticket', ticketId]);
  }
}
