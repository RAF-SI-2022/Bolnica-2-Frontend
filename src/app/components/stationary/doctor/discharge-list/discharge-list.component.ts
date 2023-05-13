import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { C, aN, co } from '@fullcalendar/core/internal-common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { LabService } from 'src/app/service/lab.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-discharge-list',
  templateUrl: './discharge-list.component.html',
  styleUrls: ['./discharge-list.component.css']
})
export class DischargeListComponent implements OnInit {

  dischargeListForm: FormGroup;
  dischargeListFormSubmitted: boolean = false;
  lbp: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private labService: LabService,
    private toast: HotToastService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) {
    let lbp=this.route.snapshot.queryParamMap.get('lbp');
    if(!lbp)
      console.log("Neispravan lbp")
    
      this.dischargeListForm = this.formBuilder.group({
        anamensa: ['', Validators.required],
        conclusion: ['', Validators.required],
        diagnosis:[''],
        analasis:[''],
        courseOfDisease:[''],
        therapy:['']
      });
    }

  ngOnInit(): void {
  }

  sendDischargeList(){
    this.dischargeListFormSubmitted = true;

    if(this.dischargeListForm.invalid)
      return;

    

      let pbo: string;
      const pboFromStorage = localStorage.getItem('pbo');
      if (pboFromStorage !== null) 
        pbo = pboFromStorage;
      else 
        pbo=''
      
   /* let anamesa:any=this.dischargeListForm.get('anamensa');
    let conclusion:any=this.dischargeListForm.get('conclusion');
    let diagnosis:any=this.dischargeListForm.get('diagnosis');
    let analasis:any=this.dischargeListForm.get('analasis');
    let courseOfDisease:any=this.dischargeListForm.get('courseOfDisease');
    let therapy:any=this.dischargeListForm.get('therapy');

    this.modalService.open(NgbdModalConfirm).result.then(data => {
      this.patientService.makeDischargeList(anamesa.value,conclusion.value,diagnosis.value,analasis.value,courseOfDisease.value,therapy.value,pbo).subscribe({
        next: (res) => {
            this.toast.success('Uspešno ste napravili otpusnu listu');
          
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Pravljenje otpusne liste nije uspelo');
        }
      });
     
    },(dismiss) => {

    });*/
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
				<strong>Da li ste sigurni da želite da napravite otpusnu listu?</strong>
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
