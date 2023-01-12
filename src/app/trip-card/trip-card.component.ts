import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() title: string;
  @Input() description: string;


}
