import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-doctor-stationary-menu',
  templateUrl: './doctor-stationary-menu.component.html',
  styleUrls: ['./doctor-stationary-menu.component.css']
})
export class DoctorStationaryMenuComponent implements OnInit {
  lbp: string = '';

  patient: any;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService) {
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
