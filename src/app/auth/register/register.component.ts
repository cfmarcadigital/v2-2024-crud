import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formRegister !: FormGroup;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(8)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.min(8)]),
    });
  }

  get f() {
    return this.formRegister.controls;
  }

  registerUser() {
    this.authService.registerUser(this.formRegister.value)
      .subscribe(res => {
        this.router.navigateByUrl('ticket/index');
      })
  }

}
