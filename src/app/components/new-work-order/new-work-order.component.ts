import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  data:any = [];
  LBPForm: FormGroup;
  paginatedRefferals: UnprocessedReferral[] = [];


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private employeesService: EmployeesService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private healthService: HealthRecordService) {
    let routeParam=this.route.snapshot.queryParamMap.get('lbp');
    
    this.LBPForm = this.formBuilder.group({
      LBP: [routeParam,Validators.required],
    });
    
    this.data = [
      { id: 1, name: 'John', date: null, strings: ['1', '2', '3'] },
      { id: 2, name: 'Jane', date: null, strings: ['4', '5', '6','9','7','11'] },
      { id: 3, name: 'Bob', date: null, strings: [] }
    ];
    
    const datee = new Date(2000,1,1,1,1,1);
    const dateee = new Date();

    

    this.data[0].date=datee;
    this.data[1].date=dateee;
    this.data[2].date=dateee;
   }

  ngOnInit(): void {
    this.refreshEmployees();
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
    console.log(currentDate)
    
    this.healthService.getUnprocessedReferrals(
      lbp
    ).subscribe({
      next: (res) => {
        
        const response :UnprocessedReferral[] = res;
        if (response.length) 
          this.paginatedRefferals = response;
        else
          this.toast.error('Nema laboratorijskih uputa');//promeni
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  checkIfValidDate(dateCreated: Date):boolean{
    const thirtyDaysInMilliseconds = 2592000000;
    const currentDate = new Date(); 

    console.log(currentDate.getTime() - dateCreated.getTime())
    if ((currentDate.getTime() - dateCreated.getTime()) > thirtyDaysInMilliseconds)
      return true;
    else
      return false;
  }
  makeWorkOrder(date:Date){

  }

}
