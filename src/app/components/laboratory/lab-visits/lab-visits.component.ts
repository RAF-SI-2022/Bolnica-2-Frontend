import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-lab-visits',
  templateUrl: './lab-visits.component.html',
  styleUrls: ['./lab-visits.component.css']
})
export class LabVisitsComponent implements OnInit {

  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
  }

}
