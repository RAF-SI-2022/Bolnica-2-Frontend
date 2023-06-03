import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-doc-patient-condition-history',
  templateUrl: './doc-patient-condition-history.component.html',
  styleUrls: ['./doc-patient-condition-history.component.css']
})
export class DocPatientConditionHistoryComponent implements OnInit {
  form: FormGroup;
  conditions: any;

  lbp: string = '';

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  patient: any;

  constructor(private formBuilder: FormBuilder,
              private toast: HotToastService,
              private route: ActivatedRoute,
              private patientService: PatientService) {
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
    this.patientService.getPatientConditionByLbp(this.lbp, value.dateFrom, value.dateTo, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.conditions = (res as any).patientConditionList;
        this.collectionSize = (res as any).count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }
}
