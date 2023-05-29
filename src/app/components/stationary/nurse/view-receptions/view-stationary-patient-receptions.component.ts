import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { PatientService } from 'src/app/service/patient.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-view-stationary-patient-receptions',
  templateUrl: './view-stationary-patient-receptions.component.html',
  styleUrls: ['./view-stationary-patient-receptions.component.css']
})
export class ViewStationaryPatientReceptionsComponent implements OnInit {
  patientForm: FormGroup;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  model: any;

  appointments: any;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private toaster: HotToastService,
              private modalService: NgbModal) {
    this.patientForm = this.formBuilder.group({
      patient: [{}]
    });
  }

  ngOnInit(): void {
    const value = this.patientForm.value;
    this.getAppointments('');
  }

  searchPatients = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap((term) =>
        this.patientService.searchPatients({
          firstName: term,
          lastName: '',
          jmbg: '',
          lbp: ''
        }).pipe(map(response => response.patients))
      )
    );

  formatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  inputFormatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  search() {
    const value = this.patientForm.value;
    if (value.patient === undefined || value.patient.lbp === undefined) {
      this.getAppointments('');
    } else {
      this.getAppointments(value.patient.lbp);
    }
  }

  onCancel(id: number) {
    this.modalService.open(NgbdModalConfirm).result.then(() => {
      this.patientService.changeAppointmentStatus(id, 'Otkazan').subscribe({
        next: (res) => {
          this.toaster.success('Uspešno ste oktazali zakan prijem');
          this.search();
        }
      })
    })
  }

  onPrijem() {

  }

  getAppointments(lbp: string) {
    this.patientService.getAppointmentsForToday(lbp, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.appointments = (res as any).appointments;
        this.collectionSize = (res as any).count;
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }
}

@Component({
	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Zakazan prijem</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da otkažete zakazan prijem?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Obriši</button>
		</div>
	`,
})
class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}
}
