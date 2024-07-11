import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  form: FormGroup;
  message = '';
  message2 = '';
  categoryId: number;
  image: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: [null, Validators.required]
    });

    this.categoryId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.apiService.getCategoryById(this.categoryId).subscribe(
      (category) => {
        this.form.patchValue({
          name: category.name,
        });
      },
      (error) => {
        console.error('Error fetching category', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        image: file
      });
      this.image = file;
    }
  }

  get myValid() {
    return this.form.controls;
  }

  updateCategory() {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    if (this.image) {
      formData.append('image', this.image, this.image.name); // Ensure to append file name
    }

    this.apiService.updateCategory(this.categoryId, formData).subscribe(
      (response) => {
        this.message = 'Category updated successfully';
        this.router.navigate(['/get-categories']);
      },
      (error) => {
        this.message2 = 'Error updating category';
        console.error('Error updating category', error);
      }
    );
  }
}
