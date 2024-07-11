import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  form: FormGroup;
  message: string = '';
  message2: string = '';
  categories: any[] = [];
  selectedFile: File | null = null;
  productId: number;

  constructor(
    private route: ActivatedRoute,
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

    this.productId = this.route.snapshot.params['id'];
  }

  get myValid() {
    return this.form.controls;
  }

  ngOnInit() {
    this.loadCategories();
    this.loadProduct();
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

  loadProduct() {
    this.apiService.getProductById(this.productId).subscribe(
      (data: any) => {
        this.form.patchValue({
          name: data.name,
          description: data.description,
          price: data.price,
          calories: data.calories,
          category: data.category_id
        });
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

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

    this.apiService.updateProduct(this.productId, formData).subscribe({
      next: (res: any) => {
        if (res.message === 'Operation Successful') {
          this.message = "Operation Successful";
          this.router.navigate(["/get-products"]);
        } else {
          this.message2 = res.message;
        }
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
        this.message2 = 'Error occurred while updating. Please try again later.';
      }
    });
  }
}
