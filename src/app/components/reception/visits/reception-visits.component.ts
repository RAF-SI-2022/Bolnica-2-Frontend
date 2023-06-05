import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';
import { PatientResponse, SearchPatientsResponse } from 'src/app/dto/response/patient.response';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-reception-visits',
  templateUrl: './reception-visits.component.html',
  styleUrls: ['./reception-visits.component.css']
})
export class ReceptionVisitsComponent implements OnInit {

  searchVisitsForm: FormGroup;
  page = 1;
  pageSize = 5;
  collectionSize = 0;

  visits: any;

  constructor(protected authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private patientsService: PatientService,
    private toast: HotToastService,
    private modalService: NgbModal) {
    this.searchVisitsForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    jmbg: [''],
    lbp: [''],
    includeDeleted: [false]
  });
    this.refreshVisits();
  }

  ngOnInit(): void {
  }

  search(): void {
    const val = this.searchVisitsForm.value;
    this.refreshVisits();
  }

  refreshVisits(): void {

    const val = this.searchVisitsForm.value;
    this.patientsService.getHospitalisedPatientsByPbb({
      firstName: val.firstName,
      lastName: val.lastName,
      jmbg: val.jmbg,
      lbp: val.lbp,
      page: this.page - 1,
      size: this.pageSize
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.visits = (res as any).list;
        this.collectionSize = (res as any).count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

}
