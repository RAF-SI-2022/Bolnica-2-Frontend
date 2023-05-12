import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {LabService} from "../../../../service/lab.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PatientService} from "../../../../service/patient.service";
import {ScheduleAppointmentRequest} from "../../../../dto/request/patient.request";

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  schedulingAppointmentForm: FormGroup;
  dataError: boolean = false;
  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private modalService: NgbModal) {
    this.schedulingAppointmentForm = this.formBuilder.group({
      lbp: ['', Validators.required],
      dateAndTime: ['', Validators.required],
      napomena: ['']
    });
  }

  ngOnInit(): void {}

  schedule(): void {
    this.dataError = false;
    if (this.schedulingAppointmentForm.get('lbp')?.value === '' || this.schedulingAppointmentForm.get('dateAndTime')?.value === '') {
      this.dataError = true;
      return;
    }
    const val = this.schedulingAppointmentForm.value;
    this.modalService.open(NgbdModalConfirm).result.then((data) => {
      this.patientService.createAppointment({
        lbp: val.lbp,
        receiptDate: val.dateAndTime,
        note: val.napomena
      }).subscribe({
        next: (res) => {
          console.log(res);
          this.modalService.open(NgbdModalSuccess).result.then((data) => {
          })
        }
      });
    }, (dismiss) => {
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
  constructor(public modal: NgbActiveModal) {}
}

@Component({

  selector: 'ngbd-modal-success',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Uspešno ste zakazali termin</h4>
		</div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="modal.close('Ok click')">Ok</button>
    </div>
	`,
})

export class NgbdModalSuccess {
  constructor(public modal: NgbActiveModal) {}
}
