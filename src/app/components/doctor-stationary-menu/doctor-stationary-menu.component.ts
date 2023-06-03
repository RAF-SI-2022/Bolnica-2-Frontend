import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-stationary-menu',
  templateUrl: './doctor-stationary-menu.component.html',
  styleUrls: ['./doctor-stationary-menu.component.css']
})
export class DoctorStationaryMenuComponent implements OnInit {
  lbp: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.lbp = params.lbp;
    })
  }

  ngOnInit(): void {
  }

}
