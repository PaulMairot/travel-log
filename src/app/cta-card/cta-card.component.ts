import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cta-card',
  templateUrl: './cta-card.component.html',
  styleUrls: ['./cta-card.component.scss'],
})
export class CtaCardComponent implements OnInit {

  constructor(private router: Router) { }

  navigateToPage(page) {
    this.router.navigateByUrl(`/${page}`)
  }

  ngOnInit() {}

  @Input() title: string;
  @Input() img: string;
  @Input() toPage: string;

}
