import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-exercises',
  templateUrl: './get-exercises.component.html',
  styleUrls: ['./get-exercises.component.css']
})
export class GetExercisesComponent implements OnInit {
  exercises: any[] = [];

  constructor(private apiService: ApiService , private router: Router) { }

  ngOnInit(): void {
    this.fetchExercises();
  }

  fetchExercises() {
    this.apiService.getExercises().subscribe(
      (data: any[]) => {
        this.exercises = data.map(exercise => {
          return {
            ...exercise,
            video: this.getVideoUrl(exercise.video)
          };
        });
      },
      (error) => {
        console.error('Error fetching exercises:', error);
      }
    );
  }

  getVideoUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  editExercise(exerciseId: number) {
    this.router.navigate(['/update_exercise', exerciseId]);
    // Example: Navigate to edit component or show edit modal
    console.log('Edit exercise with ID:', exerciseId);
  }

  deleteExercise(exerciseId: number) {
    this.apiService.deleteExercise(exerciseId).subscribe(
      () => {
        console.log('Exercise deleted successfully');
        // Optionally, refresh exercises list after deletion
        this.fetchExercises();
      },
      (error) => {
        console.error('Error deleting exercise:', error);
      }
    );
  }
}
