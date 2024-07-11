import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url:string = 'http://localhost:8000';
  constructor(private http:HttpClient) { }
  
  getAllCategories() {
    return this.http.get<any[]>(`${this.url}/api/categories`);
  }

  getCategoryById(id: number) {
    return this.http.get<any>(`${this.url}/api/categories/${id}`);
  }

  createCategory(categoryData: any) {
    return this.http.post<any>(`${this.url}/api/categories`, categoryData);
  }

  updateCategory(id: number, categoryData: any) {
    return this.http.put<any>(`${this.url}/api/category/${id}`, categoryData);
  }

  deleteCategory(id: number) {
    return this.http.delete<any>(`${this.url}/api/category/${id}`);
  }
}
