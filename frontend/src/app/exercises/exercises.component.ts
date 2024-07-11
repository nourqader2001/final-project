import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-types-of-exercises',
  templateUrl: 'exercises.component.html',
  styleUrls: ['exercises.component.css']
})
export class ExercisesComponent {
    exercises: any[] = [];

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchExercises();
  }

  fetchExercises() {
    this.apiService.getExercises().subscribe(
      (data: any[]) => {
        this.exercises = data.map(exercise => {
          return {
            ...exercise,
            videoSrc: this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${exercise.video}`)
          };
        });
      },
      (error) => {
        console.error('Error fetching exercises:', error);
      }
    );
  }
}
