import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.css']
})
export class UpdateExerciseComponent implements OnInit {
  form: FormGroup;
  message = '';
  message2 = '';
  exerciseId!: number; // Initialize or indicate it will be assigned in ngOnInit

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      body: ['', Validators.required],
      video: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.exerciseId = +params['id']; // Get exercise ID from route parameter
      this.fetchExercise(this.exerciseId);
    });
  }

  fetchExercise(id: number) {
    this.apiService.getExerciseById(id).subscribe(
      (exercise: any) => {
        // Set form values with fetched exercise data
        this.form.patchValue({
          title: exercise.title,
          body: exercise.body,
          video: exercise.video
        });
      },
      (error: any) => { // Specify error type
        console.error('Error fetching exercise:', error);
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
      this.apiService.updateExercise(this.exerciseId, this.form.value).subscribe({
        next: (res: any) => {
          if (res.message === 'Exercise updated successfully') {
            this.message = 'Operation Successful';
            this.router.navigate(['/get_exercises']);
          } else {
            this.message2 = res.message;
          }
        },
        error: (err: any) => { // Specify error type
          this.message2 = 'An error occurred. Please try again.';
        }
      });
    }
  }

  onClear() {
    this.form.reset();
  }
}
