import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-advice',
  templateUrl: './update-advice.component.html',
  styleUrls: ['./update-advice.component.css']
})
export class UpdateAdviceComponent implements OnInit {
  form: FormGroup;
  message = '';
  message2 = '';
  adviceId!: number;
  image: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      body: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.adviceId = +params['id'];
      this.fetchAdvice(this.adviceId);
    });
  }

  fetchAdvice(id: number) {
    this.apiService.getAdviceById(id).subscribe(
      (advice: any) => {
        this.form.patchValue({
          title: advice.title,
          body: advice.body
        });
      },
      (error: any) => {
        console.error('Error fetching advice:', error);
      }
    );
  }

  get myValid() {
    return this.form.controls;
  }

  submit() {
    this.message = '';
    this.message2 = '';

    if (this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.form.value.title);
      formData.append('body', this.form.value.body);
      if (this.image) {
        formData.append('image', this.image, this.image.name);
      }

      this.apiService.updateAdvice(this.adviceId, formData).subscribe({
        next: (res: any) => {
          if (res.message === 'Advice updated successfully') {
            this.message = 'Operation Successful';
            this.router.navigate(['/get_advices']);
          } else {
            this.message2 = res.message;
          }
        },
        error: (err: any) => {
          this.message2 = 'An error occurred. Please try again.';
        }
      });
    }
  }

  onClear() {
    this.form.reset();
    this.image = null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        image: file.name
      });
      this.image = file;
    }
  }
}
