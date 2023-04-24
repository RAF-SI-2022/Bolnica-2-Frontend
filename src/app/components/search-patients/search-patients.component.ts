import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';
import { PatientResponse, SearchPatientsResponse } from 'src/app/dto/response/patient.response';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-search-patients',
  templateUrl: './search-patients.component.html',
  styleUrls: ['./search-patients.component.css']
})

export class SearchPatientsComponent implements OnInit {

  searchPatientsForm: FormGroup;
  page = 1;
  pageSize = 5;
  collectionSize = 0;

  patients: PatientResponse[] = [];

  constructor(protected authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private patientsService: PatientService,
    private toast: HotToastService,
    private modalService: NgbModal) {
    this.searchPatientsForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    jmbg: [''],
    lbp: [''],
    includeDeleted: [false]
  });
    this.refreshPatients();
  }

  ngOnInit(): void {
  }

  search(): void {
    const val = this.searchPatientsForm.value;
    this.refreshPatients();
  }

  refreshPatients(): void {

    const val = this.searchPatientsForm.value;
    this.patientsService.searchPatients({
      firstName: val.firstName,
      lastName: val.lastName,
      jmbg: val.jmbg,
      lbp: val.lbp,
      includeDeleted: val.includeDeleted,
      page: this.page - 1,
      size: this.pageSize
    }).subscribe({
      next: (res) => {
        const response = res as SearchPatientsResponse;
        console.log(response);
        this.patients = response.patients;
        this.collectionSize = response.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  deletePatient(lbp: string) {

    this.modalService.open(NgbdModalConfirm).result.then((data) => {
      this.patientsService.deletePatient(lbp).subscribe({
        next: (res) => {
          this.toast.success('Pacijent uspešno obrisan');
          this.refreshPatients();
        },
        error: (e) => {
          console.log(e)
          this.toast.error(e.error.errorMessage);
        }
      });
    }, (dismiss) => {
    });
  }

  addPatientLbp(lbp: string) {
    localStorage.setItem('patientLBP', lbp);
  }

}

@Component({

	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Brisanje pacijenta</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da obrišete ovog pacijenta?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-danger" (click)="modal.close('Ok click')" data-testid="confirm-delete">Obriši</button>
		</div>
	`,
})

export class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}
}
