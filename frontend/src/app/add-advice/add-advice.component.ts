import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-advice',
  templateUrl: './add-advice.component.html',
  styleUrls: ['./add-advice.component.css']
})
export class AddAdviceComponent {
  form: FormGroup;
  message = '';
  message2 = '';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService , private router: Router) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      body: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  get myValid() {
    return this.form.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      image: file
    });
  }

  submit() {
    this.message = '';
    this.message2 = '';

    if (this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('body', this.form.get('body')?.value);
      formData.append('image', this.form.get('image')?.value);

      this.apiService.insert_advice(formData).subscribe({
        next: (res: any) => {
          if (res.message === 'Operation Successful') {
            this.message = "Operation Successful";
            this.router.navigate(['/get_advices']);
          } else {
            this.message2 = res.message;
          }
        },
        error: (err) => {
          this.message2 = 'An error occurred. Please try again.';
        }
      });
    }
  }

  onClear() {
    this.form.reset();
  }
}
