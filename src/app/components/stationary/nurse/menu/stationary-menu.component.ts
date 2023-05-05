import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-stationary-menu',
  templateUrl: './stationary-menu.component.html',
  styleUrls: ['./stationary-menu.component.css']
})
export class StationaryMenuComponent implements OnInit {

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
  }

}
