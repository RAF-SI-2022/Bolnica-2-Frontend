import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../service/patient.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-referral',
  templateUrl: './new-referral.component.html',
  styleUrls: ['./new-referral.component.css']
})
export class NewReferralComponent implements OnInit {
  patient: any;
  referralType = null;

  labForm: FormGroup;
  labFormSubmitted: boolean = false;

  diagForm: FormGroup;
  diagFormSubmitted: boolean = false;

  stacionarForm: FormGroup;
  stacionarFormSubmitted: boolean = false;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private toast: HotToastService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) {
    this.labForm = this.formBuilder.group({
      hospital: ['', Validators.required],
      labAnalysis: new FormArray([], [Validators.required]),
      labComment: ['']
    });
    this.diagForm = this.formBuilder.group({
      hospital: ['', Validators.required],
      mkb10: ['', Validators.required],
      reason: ['', Validators.required]
    });
    this.stacionarForm = this.formBuilder.group({
      hospital: ['', Validators.required],
      mkb10: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientService.getPatientByLbp(params.lbp).subscribe({
        next: (res) => {
          this.patient = res;
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      })
    });
  }

  onReferralTypeChange(event: any) {
    this.referralType = event.target.value;
  }

  onLabAnalysisCheckboxChange(event: any) {
    const selectedLabAnalysis = (this.labForm.controls['labAnalysis'] as FormArray);
    if (event.target.checked) {
      selectedLabAnalysis.push(new FormControl(event.target.value));
    } else {
      const index = selectedLabAnalysis.controls.findIndex(x => x.value === event.target.value);
      selectedLabAnalysis.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.referralType === 'Laboratorija') {
      this.labFormSubmitted = true;
      if (this.labForm.invalid) return;
    }
    if (this.referralType === 'Dijagnostika') {
      this.diagFormSubmitted = true;
      if (this.diagForm.invalid) return;
    }
    if (this.referralType === 'Stacionar') {
      this.stacionarFormSubmitted = true;
      if (this.stacionarForm.invalid) return;
    }

    this.modalService.open(NgbdModalConfirm).result.then(data => {
      console.log(data);
    });
  }

}

@Component({
	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Potvrdite slanje uputa</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da uputite pacijenta?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-primary" (click)="modal.close('Ok click')">Kreiraj uput</button>
		</div>
	`,
})
export class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}
}
