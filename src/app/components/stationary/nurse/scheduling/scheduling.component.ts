import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LabService } from "../../../../service/lab.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PatientService } from "../../../../service/patient.service";
import { ScheduleAppointmentRequest } from "../../../../dto/request/patient.request";
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  schedulingAppointmentForm: FormGroup;
  submitted: boolean = false;
  model: any;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private modalService: NgbModal,
              private toaster: HotToastService,
              private router: Router) {
    this.schedulingAppointmentForm = this.formBuilder.group({
      lbp: ['', Validators.required],
      dateAndTime: ['', Validators.required],
      napomena: ['']
    });
  }

  ngOnInit(): void { }

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

  schedule(): void {
    this.submitted = true;

    if (this.schedulingAppointmentForm.invalid) {
      return;
    }

    const value = this.schedulingAppointmentForm.value;

    this.modalService.open(NgbdModalConfirm).result.then((data) => {
      this.patientService.createAppointment({
        lbp: value.lbp.lbp,
        receiptDate: value.dateAndTime,
        note: value.napomena
      }).subscribe({
        next: (res) => {
          this.router.navigate(['/appointment-scheduling']).then(() => {
            this.toaster.success('Uspešno ste zakazali prijem')
          })
        },
        error: (e) => {
          this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
    })
  }


}

@Component({
  selector: 'ngbd-modal-confirm',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Zakazivanje termina</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da zakazete termin?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-success" (click)="modal.close('Ok click')">Zakaži</button>
		</div>
	`,
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
