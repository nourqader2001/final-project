import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.apiService.getCartItems().subscribe(
      (data: any[]) => {
        this.cartItems = data;
      },
      (error) => {
        console.error('Error fetching cart items: ', error);
      }
    );
  }

  removeFromCart(id: number) {
    this.apiService.removeFromCart(id).subscribe(
      (response) => {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
      },
      (error) => {
        console.error('Error removing item from cart: ', error);
      }
    );
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity < 1) return;
    this.apiService.updateQuantity(id, quantity).subscribe(
      (response) => {
        const item = this.cartItems.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      },
      (error) => {
        console.error('Error updating quantity: ', error);
      }
    );
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
