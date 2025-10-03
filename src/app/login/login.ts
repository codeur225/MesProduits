import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login implements OnInit {
  user = new User();
  erreur: boolean = false;
  err: number = 0;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
      },
    });
  }
}
