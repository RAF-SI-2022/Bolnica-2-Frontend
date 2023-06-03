import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PatientService } from "../../../../service/patient.service";
import { DatePipe } from "@angular/common";
import { AuthService } from "../../../../service/auth.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbdModalConfirm } from "../scheduling/scheduling.component";
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {

  stationaryAppointmentsForm: FormGroup;

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  loopClass: any[] = [];
  date: any;
  status: any;
  note: any;
  firstName: any;
  lastName: any;
  address: any;
  dateOfBirth: any;
  notation: any;
  appointmentId: any;

  model: any;

  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
    private datepipes: DatePipe,
    protected authService: AuthService,
    private modalService: NgbModal,
    private toaster: HotToastService) {
    this.stationaryAppointmentsForm = this.formBuilder.group({
      patient: [''],
      dateAndTime: ['']
    });
  }

  ngOnInit(): void {
    this.search();
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
    this.loopClass = [];
    const val = this.stationaryAppointmentsForm.value;
    let lbp: string = '';
    if (val.patient === undefined || val.patient.lbp === undefined) {
      lbp = '';
    } else {
      lbp = val.patient.lbp;
    }
    this.patientService.getAppointments(lbp, val.dateAndTime, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.collectionSize = res.count;
        for (let i = 0; i < res.count; i++) {
          let dateMod = this.datepipes.transform(res.appointments[i].receiptDate, 'yyyy-MM-dd')!;
          this.date = dateMod;
          this.firstName = res.appointments[i].patient.firstName;
          this.lastName = res.appointments[i].patient.lastName;
          this.address = res.appointments[i].patient.address;
          let dateOfB = this.datepipes.transform(res.appointments[i].patient.birthDate, 'yyyy-MM-dd')!;
          this.dateOfBirth = dateOfB;
          this.note = res.appointments[i].note;
          this.notation = res.appointments[i].status.notation;
          this.appointmentId = res.appointments[i].id;
          let elem = {
            appointmentId: this.appointmentId,
            date: this.date,
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            dateOfBirth: this.dateOfBirth,
            note: this.note,
            notation: this.notation
          }
          this.loopClass.push(elem);
          console.log(elem);
        }
      }
    });
  }

  cancelAppointment(appointmentId: any, notation: string) {
    notation = 'Otkazan';
    this.modalService.open(NgbdModalCancel).result.then((data) => {
      this.patientService.cancelAppointment(appointmentId, notation).subscribe({
        next: (res) => {
          this.search();
          this.toaster.success('Uspešno ste otkazali termin.');
        },
        error: (e) => {
          this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      })
    }, (dismiss) => {
    })
  }

}


@Component({

  selector: 'ngbd-modal-cancle',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Otkazivanje termina</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da otkažete termin?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Ne</button>
			<button type="button" class="btn btn-success" (click)="modal.close('Ok click')">Da</button>
		</div>
	`,
})

export class NgbdModalCancel {
  constructor(public modal: NgbActiveModal) { }
}
