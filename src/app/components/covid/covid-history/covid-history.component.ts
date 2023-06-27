import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-covid-history',
  templateUrl: './covid-history.component.html',
  styleUrls: ['./covid-history.component.css']
})
export class CovidHistoryComponent implements OnInit {
  tests: any;
  vaccinations: any;

  lbp: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private patientService: PatientService) {

    this.route.params.subscribe((params) => {
      this.lbp = params.lbp;

      this.patientService.getCovidTestHistory(this.lbp).subscribe({
        next: (res) => {
          this.tests = res;
        }
      })

      this.patientService.getCovidVaccinationHistory(this.lbp).subscribe({
        next: (res) => {
          this.vaccinations = res;
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
