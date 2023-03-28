import { Component, OnInit } from '@angular/core';
import { ScheduledAppointmentService } from 'src/app/service/scheduled-appointment.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { PatientResponse, SchedluedAppointmentsResponse } from 'src/app/dto/response/scheduled-appointment-response';

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
    tests = ["1","2","Doktor Pera","4"]
    selectedValue = "";
    ime="";
    prezime="";
    patientRows:Array<string[]> = [];
    paginatedPatients:Array<string[]>=[];

    constructor(private scheduledAppointmentService:ScheduledAppointmentService,private toast: HotToastService,protected authService: AuthService,private modalService: NgbModal) { }

    ngOnInit(): void {
      let permisions = this.authService.hasEitherPermission(['ROLE_DR_SPEC_ODELJENJA', 'ROLE_DR_SPEC', 'ROLE_DR_SPEC_POV']);
      if(permisions) this.getScheduledAppointmentsForDoctor(this.currentDate);
      else this.getScheduledAppointmentsForNurse(this.currentDate)
    }

    getScheduledAppointmentsForDoctor(currDate:string){
      this.scheduledAppointmentService.getScheduledAppointments(currDate).subscribe({
        next: (res) => {
          const response = res as SchedluedAppointmentsResponse;
          console.log(response)
          const PATIENT_STATUS = 'patientArrivalStatus'
          const LBP = 'lbp'
          let patientArivalsArray = Object.values(response)
          for(let i=0;i<patientArivalsArray.length;i++)
          {
            let patientArivalProperty = patientArivalsArray[i][PATIENT_STATUS];
            let patientLbp = patientArivalsArray[i][LBP]
            this.scheduledAppointmentService.getPatientByLbp(patientLbp).subscribe({
              next: (res) => {
                const response = res as PatientResponse;
                let singlePatientResponse:string[]=[];
                let age = this.calculateAge(this.currentDate,response['birthDate'])
                singlePatientResponse.push(response['firstName'],response['lastName'],age,response['gender'].notation)
                singlePatientResponse.push(patientArivalProperty[PATIENT_STATUS])
                this.patientRows.push(singlePatientResponse);
              },
              error: (e) => {
                this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
              }
            });
          }
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
      this.paginatedPatients=this.patientRows;
      this.collectionSize=this.patientRows.length
    }
    getScheduledAppointmentsForNurse(currDate:string){
      this.scheduledAppointmentService.getScheduledAppointments(currDate).subscribe({
        next: (res) => {
          const response = res as SchedluedAppointmentsResponse;
          const PATIENT_STATUS = 'patientArrivalStatus'
          const LBP = 'lbp'
          let patientArivalsArray = Object.values(response)
          for(let i=0;i<patientArivalsArray.length;i++)
          {
            let patientArivalProperty = patientArivalsArray[i][PATIENT_STATUS];
            let patientLbp = patientArivalsArray[i][LBP]
            this.scheduledAppointmentService.getPatientByLbp(patientLbp).subscribe({
              next: (res) => {
                const response = res as PatientResponse;
                let singlePatientResponse:string[]=[];
                let age = this.calculateAge(this.currentDate,response['birthDate'])
                singlePatientResponse.push(response['firstName'],response['lastName'],age,response['gender'].notation)
                singlePatientResponse.push(patientArivalProperty[PATIENT_STATUS])
                this.patientRows.push(singlePatientResponse);
              },
              error: (e) => {
                this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
              }
            });
          }
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
      this.paginatedPatients=this.patientRows;
      this.collectionSize=this.patientRows.length
    }

    doctorChoose(event:Event){
      console.log(event)
    }

    selectedPatient(ime:string,prezime:string){
      this.modalService.open(NgbdModalConfirm).result.then((data) => {
        this.buttonManager(false);
        this.ime=ime;
        this.prezime=prezime;
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
