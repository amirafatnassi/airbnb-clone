import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public places = [
    { name: 'zurich', icon: './assests/icons/zurich.webp', dist: '3,5 heures de route' },
    { name: 'genève', icon: './assests/icons/geneva.webp', dist: '15 minutes de route' },
    { name: 'montreux', icon: './assests/icons/lugano.webp', dist: '2 heures de route' },
    { name: 'lausanne', icon: './assests/icons/lausanne.webp', dist: '1 heure de route' },
  ];

  items = [
    { name: 'Escapades en pleine nature', icon: './assets/icons/home-001.webp' },
    { name: 'Logements uniques', icon: './assets/icons/home-002.webp' },
    { name: 'Logements entiers', icon: './assets/icons/home-003.webp' },
    { name: 'Animaux de companie acceptés', icon: './assets/icons/home-004.webp' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
