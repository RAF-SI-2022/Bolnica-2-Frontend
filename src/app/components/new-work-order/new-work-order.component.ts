import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { UnprocessedReferral } from 'src/app/dto/response/unprocessed.refferal';
import { EmployeesService } from 'src/app/service/employee.service';
import { HealthRecordService } from 'src/app/service/health-record.service';

@Component({
  selector: 'app-new-work-order',
  templateUrl: './new-work-order.component.html',
  styleUrls: ['./new-work-order.component.css']
})
export class NewWorkOrderComponent implements OnInit {
  LBPForm: FormGroup;

  lbp: string = '';

  referrals: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private employeesService: EmployeesService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private healthService: HealthRecordService,
    private modalService: NgbModal) {
    let routeParam=this.route.snapshot.queryParamMap.get('lbp');

    this.LBPForm = this.formBuilder.group({
      LBP: [routeParam,Validators.required],
    });

    this.route.params.subscribe(param => {
      this.lbp = param.lbp;
      this.LBPForm.get('LBP')?.setValue(this.lbp);
    })
   }

  ngOnInit(): void {
    if (this.lbp !== '' && this.lbp !== undefined) this.refreshEmployees();
  }

  search(): void {
    this.refreshEmployees();
  }

  refreshEmployees(): void {

    const val = this.LBPForm.value;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;

    let lbp
    if(!val.LBP)
      lbp= localStorage.getItem('patientLBP')
    else
      lbp=val.LBP
    if(!lbp)
      lbp=''

    this.healthService.getUnprocessedReferrals(
      lbp
    ).subscribe({
      next: (res) => {

        const response :UnprocessedReferral[] = res;
        if (response.length)
          this.referrals = res;
        else
          this.toast.error('Nema laboratorijskih uputa');
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  makeWorkOrder(orderId:number){
    this.modalService.open(NgbdModalConfirm).result.then((data) => {
      this.healthService.createWorkOrder(orderId).subscribe({
        next: () => {
          this.toast.success('Uspešno ste kreirali radni nalog');
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      })
    }, (dismiss) => {

    });
  }

}
@Component({
	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Pravljenje radnog naloga</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da napravite radni nalog?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-primary" (click)="modal.close('Ok click')">Napravi</button>
		</div>
	`,
})
export class NgbdModalConfirm {
    constructor(public modal: NgbActiveModal) {
    }
}