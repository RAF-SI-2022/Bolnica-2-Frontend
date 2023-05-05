import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Referral } from 'src/app/dto/response/referral.response';
import { LabService } from 'src/app/service/lab.service';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ReferralResponse } from 'src/app/dto/response/laboratory.response';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { PatientService } from 'src/app/service/patient.service';
import { DepartmentResponse } from 'src/app/dto/response/department.response';
import { ScheduledAppointmentService } from 'src/app/service/scheduled-appointment.service';
import { DoctorsResponse, PatientResponse } from 'src/app/dto/response/scheduled-appointment-response';


@Component({
  selector: 'app-referral-history',
  templateUrl: './referral-history.component.html',
  styleUrls: ['./referral-history.component.css']
})
export class ReferralHistoryComponent implements OnInit {
  searchReferralForm: FormGroup;
  referrals: ReferralResponse[] = [];
  departments: DepartmentResponse[] = [];
  doctors: DoctorsResponse[] = [];
  patient: any;

  currentReferral: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  dateError: boolean = false;

  constructor(protected authService: AuthService,
              private labService: LabService,
              private route: ActivatedRoute,
              private toast: HotToastService,
              private schedMedService: ScheduledAppointmentService,
              private patientService: PatientService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) {
    this.searchReferralForm = this.formBuilder.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.patientService.getAllDepartments().subscribe({
      next: (res) => {
        this.departments = res;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });

    this.schedMedService.getDoctors().subscribe({
      next: (res) => {
        this.doctors = res as any;
      }
    })

    this.route.params.subscribe(params => {
      this.patientService.getPatientByLbp(params.lbp).subscribe({
        next: (res) => {
          this.patient = res;
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      })

      this.labService.getReferralHistory(params.lbp, '', '', this.page - 1, this.pageSize).subscribe({
        next: (res) => {
          this.referrals = res.referrals;
          this.collectionSize = res.count;
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
    });
  }

  search(): void {
    if ((this.searchReferralForm.get('startDate')?.value === '' && this.searchReferralForm.get('endDate')?.value !== '') || (this.searchReferralForm.get('startDate')?.value !== '' && this.searchReferralForm.get('endDate')?.value === '')) {
      this.dateError = true;
      return;
    }

    const value = this.searchReferralForm.value;
    console.log(value);

    this.labService.getReferralHistory(this.patient.lbp, value.startDate, value.endDate, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.referrals = res.referrals;
        this.collectionSize = res.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  getDepartmentByPbo(pbo: string): string {
    return this.departments.find(department => department.pbo === pbo)?.name!;
  }

  getDoctorByLbz(lbz: string): string {
    return this.doctors.find(doctor => doctor.lbz === lbz)?.firstName! + ' ' + this.doctors.find(doctor => doctor.lbz === lbz)?.lastName!
  }

  selectCurrentReferral(referral: ReferralResponse) {
    this.currentReferral = referral;
  }

  print(): void {
    window.print();
  }

  isReferralDeleteable(referralLbz: string): boolean {
    return localStorage.getItem('lbz')! !== referralLbz;
  }

  deleteReferral(id: number) {
    this.modalService.open(NgbdModalConfirm).result.then(data => {
      this.labService.deleteReferral(id).subscribe({
        next: (res) => {
          this.toast.success('Uspešno ste obrisali uput');
          this.search();
          this.currentReferral = undefined;
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
			<h4 class="modal-title" id="modal-title">Potvrdite brisanje uputa</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da obrišete uput?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Obriši</button>
		</div>
	`,
})
export class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}
}
