import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-doc-stationary-medical-report-history',
  templateUrl: './doc-stationary-medical-report-history.component.html',
  styleUrls: ['./doc-stationary-medical-report-history.component.css']
})
export class DocStationaryMedicalReportHistoryComponent implements OnInit {
  lbp: string = '';
  form: FormGroup;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  reports: any;

  patient: any;

  constructor(private formBuilder: FormBuilder,
              private toast: HotToastService,
              private patientService: PatientService,
              private route: ActivatedRoute) {

    this.form = this.formBuilder.group({
      dateFrom: [''],
      dateTo: ['']
    });

    this.route.params.subscribe((param) => {
      this.lbp = param.lbp;
      this.patientService.getPatientByLbp(this.lbp).subscribe({
        next: (res) => {
          this.patient = res;
        }
      })
    });

    this.search();
  }

  ngOnInit(): void {
  }

  search() {
    const value = this.form.value;
    this.patientService.getPatientMedicalReportHistory(this.lbp, value.dateFrom, value.dateTo, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.reports = (res as any).medicalReports;
        this.collectionSize = (res as any).count;
      }
    })
  }

}
