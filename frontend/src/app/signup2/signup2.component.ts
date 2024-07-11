import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css']
})
export class Signup2Component implements OnInit {
  user: any = {};

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      if (!this.user.id) {
        console.error('User ID is missing.');
        this.router.navigate(['/signup']);
      }
    } else {
      console.error('No user data found in local storage.');
      this.router.navigate(['/signup']);
    }
  }

  onSubmit() {
    if (this.user.id) {
      this.apiService.updateUser(this.user.id, this.user).subscribe(
        response => {
          console.log('User updated:', response);
          localStorage.setItem('user', JSON.stringify(response)); // Update local storage
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('User ID is undefined.');
    }
  }
}