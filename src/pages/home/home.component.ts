import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  message: string;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.message = this.homeService.getData();
  }
}
