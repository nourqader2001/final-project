import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private router:Router , private authService:AuthService){
  }
  islogin() : boolean{
    return this.router.url == "/login";
  }
  issignup() : boolean{
    return this.router.url == "/signup";
  }
  issignup2() : boolean{
    return this.router.url == "/signup2";
  }
  isdashboard() : boolean{
    return this.router.url == "/dashboard";
  }
  isaddcategory() : boolean{
    return this.router.url == "/add-category";
  }
  isaddproduct() : boolean{
    return this.router.url == "/add-product";
  }
  isgetcategory() : boolean{
    return this.router.url == "/get-categories";
  }
  isgetproduct() : boolean{
    return this.router.url == "/get-products";
  }

  iswelcome() : boolean{
    return this.router.url == "/welcome";
  }

  isaddadvice() : boolean{
    return this.router.url == "/add_advice"
  }
  isaddexercise() : boolean{
    return this.router.url == "/add_exercise"
  }
  isgetadvices() : boolean{
    return this.router.url == "/get_advices"
  }
  isgetexercises() : boolean{
    return this.router.url == "/get_exercises"
  }

  // error
  isupdate_exercise() : boolean{
    return this.router.url == "/update_exercise"
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
