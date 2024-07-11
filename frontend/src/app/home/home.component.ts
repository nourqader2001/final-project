import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  meals = [
    {
      title: 'Chicken & tzatziki wraps',
      image: 'assets/Chicken-and-tzatziki-wraps-fb41f04.jpg',
      description: 'Pile chunks of chicken with cucumber, tomatoes and tzatziki to make these easy wraps. They’re budget-friendly and take less than 30 minutes to make.',
      price: '$ 1.99'
    },
    {
      title: 'Creamy garlic pasta',
      image: 'assets/Creamy-garlic-pasta-d8623e7.jpg',
      description: 'This creamy tagliatelle recipe makes a comforting midweek meal. Any long pasta will work, so use whatever you have in the cupboard.',
      price: '$ 3.49'
    },
    {
      title: 'Chicken saag',
      image: 'assets/Chicken-saag-848fb2d.jpg',
      description: 'Create a low-fat version of chicken saag. This dish is not only full of flavour, but packs in three of your 5-a-day and can be frozen too for busy days.',
      price: '$ 3.35'
    }
  ];
}
