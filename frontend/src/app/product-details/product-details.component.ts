import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product: any = null; // Initialize product as null
  // product: any = {};
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['productId'];
      this.loadProductDetails(this.productId);
    });
  }

  loadProductDetails(productId: number) {
    this.apiService.getProductById(productId).subscribe(
      (data: any) => {
        this.product = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching product details: ', error);
        this.isLoading = false;
      }
    );
  }


  addToCart(productId: number): void {
    const cartItem = {
      product_id: productId,
      quantity: 1, // Default quantity, adjust as needed
      price: this.product.price, // Use the price from the product details
      // image: this.product.image,
      // name: this.product.name,
    };
  
    console.log('Adding to cart:', cartItem);
  
    this.apiService.addToCart(cartItem).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        this.router.navigate(['/cart']); // Navigate to the cart page after adding the product
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        if (error.status === 422) {
          console.error('Validation error:', error.error);
        }
      }
    );
  }
  
  
  // goToCart(): void {
  //   this.router.navigate(['/cart']);
  // }
}
