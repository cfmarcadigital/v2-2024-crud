import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  formTicket !: FormGroup;

  constructor(public ticketService: TicketService, private router: Router) { }

  ngOnInit(): void {
    this.formTicket = new FormGroup({
      code: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.formTicket.controls;
  }

  createTicket() {
    this.ticketService.createTicket(this.formTicket.value)
      .subscribe(res => {
        this.router.navigateByUrl('ticket/index');
      })
  }
}
