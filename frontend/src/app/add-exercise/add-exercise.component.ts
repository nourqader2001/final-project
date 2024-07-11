import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent {
  form: FormGroup;
  message = '';
  message2 = '';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      body: ['', Validators.required],
      video: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)]]
    });
  }

  get myValid() {
    return this.form.controls;
  }

  submit() {
    this.message = '';
    this.message2 = '';

    if (this.form.valid) {
      this.apiService.insert_exercise(this.form.value).subscribe({
        next: (res: any) => {
          if (res.message === 'Exercise created successfully') {
            this.message = "Operation Successful";
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
