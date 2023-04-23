import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointedPatient } from 'src/app/dto/response/appointed.patient';
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

  changeExaminationStatus(id:number,status:string):void{

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;

    this.scheduledAppointmentService.changeExaminationStatus(id,status,
      
    ).subscribe({
      next: (res) => {
        this.toast.success('Uspešno ste otkazali pregled');
        this.refreshEmployees();
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
    
    
    this.scheduledAppointmentService.getScheduledLabAppointments(
      lbp,currentDate
    ).subscribe({
      next: (res) => {
        
        const response :AppointedPatient[] = res;
        if (response.length) 
          this.paginatedSchedules = response;
        else{
          this.toast.error('Nema zakazanih pregleda');
        }
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        this.paginatedSchedules=[];
      }
    });
  }

  makeWorkOrder(id:number,status:string,lbp :  string){

    this.scheduledAppointmentService.changeExaminationStatus(id,status,
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
