import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-covid-hospital-menu',
  templateUrl: './covid-hospital-menu.component.html',
  styleUrls: ['./covid-hospital-menu.component.css']
})
export class CovidHospitalMenuComponent implements OnInit {

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
  }

}
