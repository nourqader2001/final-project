import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})
export class GetProductComponent implements OnInit {

  products: any[] = [];
  categories: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.apiService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products: ', error);
      }
    );
  }

  loadCategories() {
    this.apiService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        this.mapCategoryNames();
      },
      (error) => {
        console.error('Error fetching categories: ', error);
      }
    );
  }

  mapCategoryNames() {
    this.products.forEach(product => {
      const category = this.categories.find(category => category.id === product.category_id);
      if (category) {
        product.categoryName = category.name;
      }
    });
  }

  updateProduct(productId: number) {
    this.router.navigate(['/update_product', productId]);
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId);
        },
        error: (err: any) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }
}
