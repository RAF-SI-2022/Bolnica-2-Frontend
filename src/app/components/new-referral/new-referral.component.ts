import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from 'src/app/service/patient.service';
import { HospitalResponse, HospitalsByDepartmentResponse } from 'src/app/dto/response/hospital.response';
import { LabService } from 'src/app/service/lab.service';
import { CreateReferralRequest } from 'src/app/dto/request/laboratory.request';

@Component({
  selector: 'app-new-referral',
  templateUrl: './new-referral.component.html',
  styleUrls: ['./new-referral.component.css']
})
export class NewReferralComponent implements OnInit {
  patient: any;
  referralType = null;

  hospitalsWithLab: HospitalsByDepartmentResponse[] = [];
  hospitalsWithDiag: HospitalsByDepartmentResponse[] = [];
  hospitalsWithStacionar: HospitalsByDepartmentResponse[] = [];

  labForm: FormGroup;
  labFormSubmitted: boolean = false;

  diagForm: FormGroup;
  diagFormSubmitted: boolean = false;

  stacionarForm: FormGroup;
  stacionarFormSubmitted: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private patientService: PatientService,
              private labService: LabService,
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
    this.patientService.getHospitalsWithDepartment('Laboratorija').subscribe({
      next: (res) => {
        this.hospitalsWithLab = res;
      }
    });
    this.patientService.getHospitalsWithDepartment('Dijagnostika').subscribe({
      next: (res) => {
        this.hospitalsWithDiag = res;
      }
    });
    this.patientService.getHospitalsWithDepartment('Stacionar').subscribe({
      next: (res) => {
        this.hospitalsWithStacionar = res;
      }
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
    const labFormValue = this.labForm.value;
    const diagFormValue = this.diagForm.value;
    const stacionarFormValue = this.stacionarForm.value;

    let pboReferredTo = '';
    let mkb10 = '';
    let reason = '';
    let labAnalysis = [];
    let comment = '';
    if (this.referralType === 'Laboratorija') {
      this.labFormSubmitted = true;
      if (this.labForm.invalid) return;
      this.hospitalsWithLab.forEach(hospitalWithLab => {
        if (hospitalWithLab.hospitalResponse.fullName === labFormValue.hospital) {
          pboReferredTo = hospitalWithLab.pbo;
        }
      });
      labAnalysis = labFormValue.labAnalysis;
      comment = labFormValue.labComment;
    }
    if (this.referralType === 'Dijagnostika') {
      this.diagFormSubmitted = true;
      if (this.diagForm.invalid) return;
      this.hospitalsWithDiag.forEach(hospitalWithDiag => {
        console.log(hospitalWithDiag);
        if (hospitalWithDiag.hospitalResponse.fullName === diagFormValue.hospital) {
          pboReferredTo = hospitalWithDiag.pbo;
        }
      });
      mkb10 = diagFormValue.mkb10;
      reason = diagFormValue.reason;
    }
    if (this.referralType === 'Stacionar') {
      this.stacionarFormSubmitted = true;
      if (this.stacionarForm.invalid) return;
      this.hospitalsWithStacionar.forEach(hospitalWithStacionar => {
        if (hospitalWithStacionar.hospitalResponse.fullName === stacionarFormValue.hospital) {
          pboReferredTo = hospitalWithStacionar.pbo;
        }
      });
      mkb10 = stacionarFormValue.mkb10;
    }

    const createReferralRequest: CreateReferralRequest = {
      type: this.referralType!,
      lbz: localStorage.getItem('lbz')!,
      pboReferredFrom: localStorage.getItem('pbo')!,
      pboReferredTo: pboReferredTo,
      lbp: this.patient.lbp,
      creationTime: new Date().toISOString(),
      requiredAnalysis: labAnalysis.toString(),
      comment: comment,
      referralDiagnosis: mkb10,
      referralReason: reason
    }

    this.modalService.open(NgbdModalConfirm).result.then(data => {
      this.labService.createReferral(createReferralRequest).subscribe({
        next: (res) => {
          this.router.navigate(['/search-patients']).then(() => {
            this.toast.success('Uspešno ste kreirali uput');
          })
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
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
