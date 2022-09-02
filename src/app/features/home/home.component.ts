import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public places = [
    {
      name: 'lausanne',
      icon: './assets/Icons/lausanne.jpg',
      dist: '1 heure de route',
    },
    {
      name: 'paris',
      icon: './assets/Icons/paris.webp',
      dist: '1 heure de route',
    },
    {
      name: 'sydney',
      icon: './assets/Icons/sydney.webp',
      dist: '1 heure de route',
    },
    {
      name: 'barcelona',
      icon: './assets/Icons/barcelona.webp',
      dist: '1 heure de route',
    },
  ];

  items = [
    {
      name: 'Escapades en pleine nature',
      icon: './assets/Icons/home-001.webp',
    },
    { name: 'Logements uniques', icon: './assets/Icons/home-002.webp' },
    { name: 'Logements entiers', icon: './assets/Icons/home-003.webp' },
    {
      name: 'Animaux de companie acceptés',
      icon: './assets/Icons/home-004.webp',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
