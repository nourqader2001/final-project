import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  message: string = '';
  message2: string = '';
  categories: any[] = [];
  selectedFile: File | null = null; // To hold the selected file

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService, 
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      calories: [''],
      category: ['', Validators.required],
      image: ['']
    });
  }

  get myValid() {
    return this.form.controls;
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories: ', error);
      }
    );
  }

  // Method to handle file input change
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submit() {
    this.message = '';
    this.message2 = '';

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price);
    formData.append('calories', this.form.value.calories);
    formData.append('category_id', this.form.value.category);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.apiService.createProduct(formData).subscribe({
      next: (res: any) => {
        if (res.message === 'Operation Successful') {
          this.message = "Product updated successfully";
          this.router.navigate(["/get-products"]);
        } else {
          this.message2 = res.message;
        }
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
        this.message2 = 'Error occurred while registering. Please try again later.';
      }
    });
  }
}
