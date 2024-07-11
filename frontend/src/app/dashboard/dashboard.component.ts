import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router:Router , private authService:AuthService){
  }
  logout(): void {
    console.log('Attempting to log out');
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Logout failed', error);
        localStorage.removeItem('user_data_login');
        localStorage.removeItem('token');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      }
    });
  }
  

}
