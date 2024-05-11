import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {

  id!: number;
  ticket!: Ticket;

  constructor(public ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['ticketId'];
    this.ticketService.getTicket(this.id)
      .subscribe((data: Ticket) => {
        this.ticket = data;
      });
  }
}
