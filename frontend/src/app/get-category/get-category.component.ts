import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-get-category',
  templateUrl: './get-category.component.html',
  styleUrls: ['./get-category.component.css']
})
export class GetCategoryComponent implements OnInit {
  categories: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.apiService.getAllCategories().subscribe(
      (data) => {
        for(let img of data){
          img.image = this.apiService.imagePath + img.image;
        }
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  updateCategory(category: any) {
    this.router.navigate(['/update_category', category.id]);
    // Implement the logic to update the category
    console.log('Update category:', category);
    // Navigate to the update category form or open a modal with the category data
  }

  // deleteCategory(categoryId: number) {
  //   this.apiService.deleteCategory(categoryId).subscribe(
  //     (response) => {
  //       console.log('Category deleted successfully', response);
  //       this.fetchCategories(); // Refresh the list after deletion
  //     },
  //     (error) => {
  //       console.error('Error deleting category', error);
  //     }
  //   );
  // }

  deleteCategory(categoryId: number) {
    if (window.confirm('Are you sure you want to delete this category?')) {
      this.apiService.deleteCategory(categoryId).subscribe(
        (response) => {
          console.log('Category deleted successfully', response);
          this.fetchCategories(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting category', error);
        }
      );
    }
  }
  
  

  getImageUrl(imagePath: string): string {
    return `http://localhost:8000/storage/${imagePath}`;
  }
}
