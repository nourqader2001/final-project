import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-advices',
  templateUrl: './advices.component.html',
  styleUrls: ['./advices.component.css']
})
export class AdvicesComponent implements OnInit {
  advices: any[] = [];
  message: string = '';
  tips: any[] = [];

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchAdvices();
  }

  fetchAdvices() {
    this.apiService.get_advices().subscribe(
      (data: any[]) => {
        console.log('Fetched Advices:', data); // Log data here
        this.tips = data;
      },
      (error) => {
        console.error('Error fetching advices:', error);
        this.message = 'An error occurred while fetching advices.';
      }
    );
  }
  

  // sanitizeImageUrl(imagePath: string): SafeResourceUrl {
  //   const imageUrl = `http://localhost/final_project/backend/storage/app/public/${imagePath}`;
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  // }
}
