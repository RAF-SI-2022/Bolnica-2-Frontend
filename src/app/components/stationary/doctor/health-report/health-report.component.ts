import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';
import { LabService } from 'src/app/service/lab.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-health-report',
  templateUrl: './health-report.component.html',
  styleUrls: ['./health-report.component.css']
})
export class HealthReportComponent implements OnInit {

  healthListForm: FormGroup;
  healthListFormSubmitted: boolean = false;
  lbp: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private labService: LabService,
    private toast: HotToastService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    protected authService: AuthService) {
    let lbp=this.route.snapshot.queryParamMap.get('lbp');
    if(!lbp)
      console.log("Neispravan lbp")
      this.healthListForm = this.formBuilder.group({
        report: ['', Validators.required],
        diagnosis: [''],
        recommendedTherapy:[''],
        advice:[''],
        confidential:['']
      });
    }

  ngOnInit(): void {
  }

  sendHealthReport(){
    this.healthListFormSubmitted=true;
    if(this.healthListForm.invalid)
      return;

    this.modalService.open(NgbdModalConfirm).result.then(data => {
      /*this.labService.createReferral(createReferralRequest).subscribe({
        next: (res) => {
          this.router.navigate(['/search-patients']).then(() => {
            this.toast.success('Uspešno ste kreirali uput');
          })
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });*/
      console.log("aaaaa");
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
				<strong>Da li ste sigurni da želite da napravite zdravstveni izveštaj?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-primary" (click)="modal.close('Ok click')" data-testid="confirm-submit-referral">Napravi</button>
		</div>
	`,
})
export class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}
}


