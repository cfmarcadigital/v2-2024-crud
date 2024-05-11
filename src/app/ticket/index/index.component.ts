import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  tickets: Ticket[] = [];

  constructor(public ticketService: TicketService) { }

  ngOnInit(): void {
    this.getTickets()
  }

  getTickets() {
    this.ticketService.getTickets()
      .subscribe((data: Ticket[]) => {
        this.tickets = data;
        console.log(this.tickets);
      })
  }

  deleteTicket(id: number) {
    this.ticketService.deleteTicket(id)
      .subscribe(res => {
        this.getTickets();
      })
  }
}
