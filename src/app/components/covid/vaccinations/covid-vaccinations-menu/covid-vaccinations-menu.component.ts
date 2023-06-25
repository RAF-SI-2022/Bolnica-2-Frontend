import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-covid-vaccinations-menu',
  templateUrl: './covid-vaccinations-menu.component.html',
  styleUrls: ['./covid-vaccinations-menu.component.css']
})
export class CovidVaccinationsMenuComponent implements OnInit {

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
  }

}
