import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-covid-testing-menu',
  templateUrl: './covid-testing-menu.component.html',
  styleUrls: ['./covid-testing-menu.component.css']
})
export class CovidTestingMenuComponent implements OnInit {

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
  }

}
