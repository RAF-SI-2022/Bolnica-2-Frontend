import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-nurse-stationary-menu',
  templateUrl: './nurse-stationary-menu.component.html',
  styleUrls: ['./nurse-stationary-menu.component.css']
})
export class NurseStationaryMenuComponent implements OnInit {
  lbp: string = '';

  patient: any;

  constructor(private route: ActivatedRoute, private patientService: PatientService) {
    this.route.params.subscribe((params) => {
      this.lbp = params.lbp;
      this.patientService.getPatientByLbp(this.lbp).subscribe({
        next: (res) => {
          this.patient = res;
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
