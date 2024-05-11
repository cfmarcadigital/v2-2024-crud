import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formLogin !: FormGroup;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(8)]),
    });
  }

  get f() {
    return this.formLogin.controls;
  }

  loginUser() {
    this.authService.loginUser(this.formLogin.value.email, this.formLogin.value.password)
      .subscribe(res => {
        this.router.navigateByUrl('ticket/index');
      })
  }

}
