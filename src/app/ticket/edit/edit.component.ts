import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  id!: number;
  ticket!: Ticket;
  formTicket !: FormGroup;

  constructor(public ticketService: TicketService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['ticketId'];
    this.ticketService.getTicket(this.id)
    .subscribe((data: Ticket) => {
      this.ticket = data;
    });

    this.formTicket = new FormGroup({
      code: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.formTicket.controls;
  }

  updateTicket() {
    this.ticketService.updateTicket(this.id, this.formTicket.value)
      .subscribe(res => {
        this.router.navigateByUrl('ticket/index');
      })
  }
}
