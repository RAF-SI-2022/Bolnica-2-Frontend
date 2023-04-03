import { Component, OnInit } from '@angular/core';
import { ScheduledAppointmentService } from 'src/app/service/scheduled-appointment.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { DoctorsResponse, SchedluedAppointmentsResponse } from 'src/app/dto/response/scheduled-appointment-response';
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

    schedMedExamsList:Array<string[]>=[];

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
          const response = res as SchedluedAppointmentsResponse
          const patientArivalsArray = Object.values(response['schedMedExamResponseList'])
          const patients = Object.values(patientArivalsArray);
          const PATIENT_STATUS = 'patientArrivalStatus';
          const PATIENT_RESPONSE = 'patientResponse';

          for(let i=0;i<patientArivalsArray.length;i++)  {
            let age = this.calculateAge(this.currentDate,patients[i][PATIENT_RESPONSE].birthDate)
            this.schedMedEx.push(patients[i][PATIENT_RESPONSE].firstName)
            this.schedMedEx.push(patients[i][PATIENT_RESPONSE].lastName)
            this.schedMedEx.push(age)
            this.schedMedEx.push(patients[i][PATIENT_RESPONSE].gender.notation)
            this.schedMedEx.push(patients[i][PATIENT_STATUS].patientArrivalStatus)
            this.schedMedEx.push(patients[i][PATIENT_RESPONSE].lbp)
            this.schedMedExams.push(this.schedMedEx);
          }
          this.schedMedExamsList = this.schedMedExams;
          console.log(this.schedMedExamsList);
          this.collectionSize=response.count;
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
          const response = res as SchedluedAppointmentsResponse
          const patientArivalsArray = Object.values(response['schedMedExamResponseList'])
          const patients = Object.values(patientArivalsArray);
          const PATIENT_STATUS = 'patientArrivalStatus';
          const PATIENT_RESPONSE = 'patientResponse';

          for(let i=0;i<patientArivalsArray.length;i++)  {
            let age = this.calculateAge(this.currentDate,patients[i][PATIENT_RESPONSE].birthDate)
            this.schedMedEx.push(patients[i][PATIENT_RESPONSE].firstName)
            this.schedMedEx.push(patients[i][PATIENT_RESPONSE].lastName)
            this.schedMedEx.push(age)
            this.schedMedEx.push(patients[i][PATIENT_RESPONSE].gender.notation)
            this.schedMedEx.push(patients[i][PATIENT_STATUS].patientArrivalStatus)
            this.schedMedExams.push(this.schedMedEx); // make an exam row and add to list
          }
          this.schedMedExamsList = this.schedMedExams;
          this.collectionSize=response.count;
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
        this.lbp = lbp;
      }, (dismiss) => {
        this.buttonManager(true);
      });
    }

    buttonManager(state:boolean){
      (<HTMLInputElement> document.getElementById("karton")).disabled = state ;
      (<HTMLInputElement> document.getElementById("pregled")).disabled = state ;
    }

    calculateAge(currentDate:string,birthDate:Date){
        let birthDateString =birthDate.toLocaleString().split(',')[0]

        let currentDateSplited = currentDate.split('/');
        let birthDateSplit = birthDateString.split('T');
        let birthDateConverted = birthDateSplit[0].split('-');

        let currentYear = currentDateSplited[2];
        let curentMonth = currentDateSplited[0];
        let curentDay = currentDateSplited[1];

        let birthYear = birthDateConverted[0];
        let birthMonth = birthDateConverted[1];
        let birthDay =birthDateConverted[2];

        let age = parseInt(currentYear) - parseInt(birthYear)+1;

        if(curentMonth>birthMonth && curentDay>birthDay) age++;

      return age.toString()+' godina';
    }

    onKartonClick(): void {
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
