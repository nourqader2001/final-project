import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  imagePath='http://localhost/final_project/backend/storage/app/public/';
  url:string = 'http://localhost:8000';

  constructor(private http:HttpClient) { }
  
  getAllCategories() {
    return this.http.get<any[]>(`${this.url}/api/categories`);
  }

  
    // Function to get a category by ID
    // getCategoryById(categoryId: number): Observable<any> {
    //   return this.http.get<any>(`${this.url}/api/categories/${categoryId}`);
    // }
  

  createCategory(categoryData: any) {
    return this.http.post<any>(`${this.url}/api/categories`, categoryData);
  }

  // updateCategory(id: number, categoryData: any) {
  //   return this.http.put<any>(`${this.url}/api/category/${id}`, categoryData);
  // }
    // Function to update a category
    updateCategory(categoryId: number, formData: FormData): Observable<any> {
      return this.http.post<any>(`${this.url}/api/categories/${categoryId}`, formData);
    }
  
    getCategoryById(categoryId: number): Observable<any> {
      return this.http.get<any>(`${this.url}/api/categories/${categoryId}`);
    }

    
  deleteCategory(id: number) {
    return this.http.delete<any>(`${this.url}/api/category/${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.url}/api/users/${id}`, user);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.url}/api/users`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/api/login`, { email, password });
  }

  insert_advice(adviceData: FormData): Observable<any> {
    return this.http.post(`${this.url}/api/advices`, adviceData);
  }

  insert_exercise(exerciseData: any): Observable<any> {
    return this.http.post(`${this.url}/api/exercises`, exerciseData);
  }
  

  getExercises(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/exercises`);
  }

  getExerciseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/exercises/${id}`);
  }

  // Update an existing exercise
  updateExercise(exerciseId: number, exerciseData: any): Observable<any> {
    return this.http.put<any>(`${this.url}/api/exercises/${exerciseId}`, exerciseData);
  }

  // Delete an exercise
  deleteExercise(exerciseId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/exercises/${exerciseId}`);
  }

  get_advices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/advices`);
  }

  getAdviceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/api/advices/${id}`);
  }

  updateAdvice(adviceId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}/api/advices/${adviceId}`, formData);
  }
  
  

  deleteAdvice(adviceId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/advices/${adviceId}`);
  }

  // updateAdvice(adviceId: number, adviceData: any): Observable<any> {
  //   return this.http.put<any>(`${this.url}/api/advices/${adviceId}`, adviceData);
  // }

  createProduct(productData: any) {
    return this.http.post<any>(`${this.url}/api/products`, productData);
  }

  getProducts() {
    return this.http.get<any[]>(`${this.url}/api/products`);
  }
  updateProduct(productId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}/api/products/${productId}`, formData);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/products/${productId}`);
  }


  // getProductsByCategory(categoryId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.url}/products?category_id=${categoryId}`);
  // }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/categories/${categoryId}/products`);
  }

  getProductById(productId: number): Observable<any> {
    const url = `${this.url}/api/products/${productId}`;
    return this.http.get(url);
}


   // Cart functions

   getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/cart`);
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/api/cart/${id}`);
  }
  

  updateQuantity(id: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.url}/api/cart/${id}`, { quantity });
  }
  

  // addToCart(cartItem: { product_id: number; quantity: number; price: number }): Observable<any> {
  //   const url = `${this.url}/api/cart/add`;
  //   return this.http.post<any>(url, cartItem);
  // }

  addToCart(cartItem: { product_id: number; quantity: number; price: number }): Observable<any> {
    return this.http.post<any>(`${this.url}/api/cart`, cartItem);
  }
  


}
