import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-advices',
  templateUrl: './get-advices.component.html',
  styleUrls: ['./get-advices.component.css']
})
export class GetAdvicesComponent implements OnInit {
  advices: any[] = [];
  message = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAdvices();
  }

  fetchAdvices() {
    this.apiService.get_advices().subscribe({
      next: (data: any[]) => {
        this.advices = data;
      },
      error: (err) => {
        this.message = 'An error occurred while fetching advices.';
      }
    });
  }

  editAdvice(adviceId: number) {
    this.router.navigate(['/update_advice', adviceId]);
  }

  deleteAdvice(adviceId: number) {
    if (confirm('Are you sure you want to delete this advice?')) {
      this.apiService.deleteAdvice(adviceId).subscribe({
        next: () => {
          this.advices = this.advices.filter(advice => advice.id !== adviceId);
        },
        error: (err) => {
          this.message = 'An error occurred while deleting advice.';
        }
      });
    }
  }
}
