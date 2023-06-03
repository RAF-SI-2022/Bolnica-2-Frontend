import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nurse-stationary-menu',
  templateUrl: './nurse-stationary-menu.component.html',
  styleUrls: ['./nurse-stationary-menu.component.css']
})
export class NurseStationaryMenuComponent implements OnInit {
  lbp: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.lbp = params.lbp;
    })
  }

  ngOnInit(): void {
  }

}
