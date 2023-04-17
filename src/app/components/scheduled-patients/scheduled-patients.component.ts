import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointedPatient, AppointedPatients } from 'src/app/dto/response/appointed.patient';
import { EmployeesService } from 'src/app/service/employee.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ScheduledAppointmentService } from 'src/app/service/scheduled-appointment.service';

@Component({
  selector: 'app-scheduled-patients',
  templateUrl: './scheduled-patients.component.html',
  styleUrls: ['./scheduled-patients.component.css']
})
export class ScheduledPatientsComponent implements OnInit {
  LBPForm: FormGroup;
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  paginatedSchedules: AppointedPatient[] = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private employeesService: EmployeesService,
    private toast: HotToastService,
    private scheduledAppointmentService:ScheduledAppointmentService
    ) {
      this.LBPForm = this.formBuilder.group({
        LBP: ['',Validators.required],
      });
     }

  ngOnInit(): void {
    this.refreshEmployees();
  }

  changeExaminationStatus(status:string,lbp :  string,appointmentDate : Date):void{

    //promeni
    /*const year= appointmentDate.getFullYear().toString();
    const month= appointmentDate.getMonth().toString();
    const day=appointmentDate.getDate().toString();*/

    this.scheduledAppointmentService.changeExaminationStatus(status,
      lbp,''/*+year+"-"+month+"-"+day*/
    ).subscribe({
      next: (res) => {
        this.toast.success('Uspešno ste otkazali pregled');
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  search(): void {
    this.refreshEmployees();
  }

  refreshEmployees(): void {
    const val = this.LBPForm.value;
    /*const year= new Date().getFullYear().toString();
    const month= new Date().getMonth().toString();
    const day=new Date().getDate().toString();
    
    console.log("DATUM"+ year+"-"+month+"-"+day)*/
    let lbp 
    if(!val.LBP)
      lbp= localStorage.getItem('patientLBP')
    else
      lbp=val.LBP

    this.scheduledAppointmentService.getScheduledLabAppointments(
      lbp,''/*year+"-"+month+"-"+day*/
    ).subscribe({
      next: (res) => {
        const response = res as AppointedPatients;
        this.paginatedSchedules = response.userList;
        this.collectionSize = response.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  makeWorkOrder(status:string,lbp :  string,appointmentDate : Date){
    this.scheduledAppointmentService.changeExaminationStatus(status,
      lbp,''/*+year+"-"+month+"-"+day*/
    ).subscribe({
      next: (res) => {
        this.router.navigate(['/new-work-order'], { queryParams: { lbp } });
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

}
