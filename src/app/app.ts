import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('MesProduits');

  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired())
      this.router.navigate(['/login']);
    // let isloggedin: string;
    // let loggedUser:string;
    // isloggedin = localStorage.getItem('isloggedIn') !;
    // loggedUser = localStorage.getItem('loggedUser') !;
    // if (isloggedin!="true" || !loggedUser)
    // this.router.navigate(['/login']);
    // else
    // this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }

  onLogout() {
    this.authService.logout();
  }
}
