import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup;
  message = '';
  message2 = '';
  image: File | null = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      image: [null, Validators.required]
    });
  }

  ngOnInit() {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
      this.form.patchValue({
        image: file
      });
    }
  }

  get myValid() {
    return this.form.controls;
  }

  addCategory() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      if (this.image) {
        formData.append('image', this.image);
      }

      this.apiService.createCategory(formData).subscribe(response => {
        console.log('Category added successfully', response);
        if(response['message'] === 'Category created successfully') {
          this.message = "Operation Successful";
        } else {
          this.message2 = response['message'];
        }
      }, error => {
        console.error('Error adding category', error);
        this.message2 = 'Error adding category';
      });
    } else {
      this.message2 = 'Form is not valid';
    }
  }
}
