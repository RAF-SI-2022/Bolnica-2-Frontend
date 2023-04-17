import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { EmployeesService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-new-work-order',
  templateUrl: './new-work-order.component.html',
  styleUrls: ['./new-work-order.component.css']
})
export class NewWorkOrderComponent implements OnInit {

  lbp:string;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private employeesService: EmployeesService,
    private toast: HotToastService,
    private route: ActivatedRoute) {
    let routeParam=this.route.snapshot.queryParamMap.get('data');

    if(routeParam)
      this.lbp=routeParam;
    else
      this.lbp='';
   }

  ngOnInit(): void {
  }

}
