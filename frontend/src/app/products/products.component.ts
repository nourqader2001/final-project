import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categoryId!: number;
  products: any[] = [];
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryIdParam = params.get('categoryId');
      if (categoryIdParam) {
        this.categoryId = +categoryIdParam;
        this.loadProductsByCategory(this.categoryId);
      } else {
        console.error('Category ID parameter is missing.');
        // Handle error or redirect as appropriate
      }
    });
  }

  loadProductsByCategory(categoryId: number) {
    this.apiService.getProductsByCategory(categoryId).subscribe(
      (data: any[]) => {
        this.products = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products by category: ', error);
        this.isLoading = false;
      }
    );
  }
}
