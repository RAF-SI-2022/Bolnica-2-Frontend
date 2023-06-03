import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-doc-stationary-discharge-history',
  templateUrl: './doc-stationary-discharge-history.component.html',
  styleUrls: ['./doc-stationary-discharge-history.component.css']
})
export class DocStationaryDischargeHistoryComponent implements OnInit {

  lbp: string = '';
  form: FormGroup;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  discharges: any;
  currentDischarge: any;

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
    this.patientService.getDischargeHistory(this.lbp, value.dateFrom, value.dateTo, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.discharges = (res as any).discharges;
        this.collectionSize = (res as any).count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
    this.currentDischarge = undefined;
  }

  selectCurrentDischarge(discharge: any) {
    this.currentDischarge = discharge;
  }

  print(): void {
    window.print();
  }

}
