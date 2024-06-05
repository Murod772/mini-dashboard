import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss'
})
export class TicketDetailComponent implements OnInit{
  ticketForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private ticketsService: TicketService,
    private fb: FormBuilder
  ) {
    this.ticketForm = this.fb.group({
      id: [''],
      title: [''],
      createdDate: ['']
    });
  }

  ngOnInit() {
    const ticketID = this.route.snapshot.paramMap.get('ticketID');
    if (ticketID) {
      this.ticketsService.getTicket(ticketID).subscribe(ticket => {
        this.ticketForm.patchValue(ticket);
      });
    } else {
      console.error('Ticket ID is null');
    }
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const updatedTicket = this.ticketForm.value;
      this.ticketsService.updateTicket(updatedTicket).subscribe(
        response => {
          console.log('Ticket updated successfully', response);
          // Optionally navigate back to the ticket list or show a success message
        },
        error => {
          console.error('Error updating ticket', error);
          // Optionally show an error message
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
