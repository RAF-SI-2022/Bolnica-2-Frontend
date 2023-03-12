import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jwt_decode,{ JwtPayload } from "jwt-decode";
import { EMPLOYEE_ENDPOINT } from '../app.constants';
import { FormBuilder } from '@angular/forms';
import { EmployeeResponse } from '../dto/response/employee.response';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  userData!:EmployeeResponse;
  isInEditMode:boolean;
  newPassword:string;
  newPasswordConfirm:string;
  //newemployeeForm: FormGroup;
  
  constructor(private router: Router,private httpClient:HttpClient,private formBuilder: FormBuilder) {
    this.isInEditMode=false;
    this.newPassword="";
    this.newPasswordConfirm="";
   }


  ngOnInit(): void {
    const token=localStorage.getItem('token');
    if(token==null)
      return;

    let lbz="";
    try{
      let decodedHeader = jwt_decode<JwtPayload>(token);

      if(decodedHeader.sub==null)
        return;
      else
        lbz=decodedHeader.sub;
      
    }
    catch{}

    
    this.httpClient.get(EMPLOYEE_ENDPOINT+'/'+lbz, { headers: { Authorization: `Bearer ${token}` }} )
    .subscribe((data: any) => {
      this.userData=data;
      console.log(data);
      
    });
  }

  editEmployee():void{

  }

}

