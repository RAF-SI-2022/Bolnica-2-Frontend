import { Component, OnInit } from '@angular/core';
import { ScheduledAppointmentService } from 'src/app/service/scheduled-appointment.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { DoctorsResponse } from 'src/app/dto/response/scheduled-appointment-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduled-appointments',
  templateUrl: './scheduled-appointments.component.html',
  styleUrls: ['./scheduled-appointments.component.css']
})
export class ScheduledAppointmentsComponent implements OnInit {
    page = 1;
    pageSize = 5;
    collectionSize = 0;
    currentDate = new Date(Date.now()).toLocaleString().split(',')[0];

    doctors:Array<DoctorsResponse> = []

    selectedValue='';
    ime="";
    prezime="";
    lbp = '';

    doctorName='';
    doctorLastName='';
    doctorLbz = '';

    schedMedExamsList: any;

    schedMedExams:Array<string[]> = [];
    schedMedEx:string[] = [];

    constructor(private scheduledAppointmentService:ScheduledAppointmentService,private toast: HotToastService,protected authService: AuthService,private modalService: NgbModal, private router: Router) {
      let permisions = this.authService.hasEitherPermission(['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV']);
      if(permisions) this.getScheduledAppointmentsForDoctor();
      else this.toast.info('Odaberite lekara');
    }

    ngOnInit(): void {
      this.scheduledAppointmentService.getDoctors().subscribe({
        next:(res)=>{
          const response = res as DoctorsResponse
            console.log(response)
            this.doctors = Object.values(response)
        },
        error:(e)=>{
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });

    }

    getScheduledAppointmentsForDoctor(){
      this.schedMedEx=[];
      this.schedMedExams=[];
      this.scheduledAppointmentService.getScheduledAppointments(this.currentDate,this.page-1,this.pageSize).subscribe({
        next: (res) => {
          this.schedMedExamsList = res.schedMedExamResponseList;
          this.collectionSize = res.count;
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
    }
    getScheduledAppointmentsForNurse(){
      this.schedMedEx=[]; // Single exam
      this.schedMedExams=[]; // List of exams
      this.scheduledAppointmentService.getScheduledAppointmentsByLbz(this.currentDate,this.doctorLbz,this.page-1,this.pageSize).subscribe({
        next: (res) => {
          this.schedMedExamsList = res.schedMedExamResponseList;
          this.collectionSize = res.count;
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
    }

    doctorChoose(doctor:DoctorsResponse){
      this.doctorName=doctor.firstName;
      this.doctorLastName=doctor.lastName;
      this.doctorLbz = doctor.lbz;
      this.getScheduledAppointmentsForNurse()
    }

    selectedPatient(ime:string,prezime:string, lbp: string){
      this.modalService.open(NgbdModalConfirm).result.then((data) => {
        this.buttonManager(false);
        this.ime=ime;
        this.prezime=prezime;
        console.log(lbp);
        this.lbp = lbp;
      }, (dismiss) => {
        this.buttonManager(true);
      });
    }

    buttonManager(state:boolean){
      (<HTMLInputElement> document.getElementById("karton")).disabled = state ;
      (<HTMLInputElement> document.getElementById("pregled")).disabled = state ;
    }
    onKartonClick(): void {
      localStorage.setItem('patientLBP', this.lbp);
      this.router.navigate(['/health-record', this.lbp]);
    }

    onPregledClick(): void {
      this.router.navigate(['/specialist-doctor-examination'], {
        queryParams: {
          lbp: this.lbp
        }
      });
    }
}

@Component({
	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Pregled pacijenta</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da pregledate pacijenta </strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-primary" (click)="modal.close('Ok click')">Pregledaj</button>
		</div>
	`,
})
export class NgbdModalConfirm {
    constructor(public modal: NgbActiveModal) {
    }
}
