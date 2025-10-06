import { AuthService } from './../services/auth-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err!: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router)  {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onRegister() {
    this.user.username = this.myForm.value['username'];
    this.user.email = this.myForm.value['email'];
    this.user.password = this.myForm.value['password'];
    this.confirmPassword = this.myForm.value['confirmPassword'];
    console.log(this.user);
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this. authService.setRegistredUser(this.user);
        // alert('veillez confirmer votre email');
        this.router.navigate(["/verifEmail"]);
      },
      error: (err: any) => {
        if ((err.status = 400)) {
          this.err = err.error.message;
        }
      },
    });
    
    // return false
  }

}
