import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import jwt_decode,{ JwtPayload } from "jwt-decode";
import { EMPLOYEE_ENDPOINT } from '../app.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeResponse } from '../dto/response/employee.response';
import { UpdateEmployeeRequest } from '../dto/request/update.employee.request';
import { EmployeesService } from '../service/employee.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  uneditedUserData!:EmployeeResponse;
  userData:UpdateEmployeeRequest;
  isInEditMode:boolean;
  newPasswordConfirm:string;

  
  constructor(private router: Router,private httpClient:HttpClient,private employeesService: EmployeesService) {
    this.isInEditMode=false;
    this.newPasswordConfirm='';
    this.userData= {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      jmbg: '',
      residentialAddress: '',
      placeOfLiving: '',
      phone: '',
      email: '',
      title: '',
      profession: '',
      username: '',
      oldPassword: '',
      newPassword: '',
      departmentId: 0}


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
      this.uneditedUserData=data;
      this.userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        jmbg: data.jmbg,
        residentialAddress: data.residentalAddress,
        placeOfLiving: data.placeOfLiving,
        phone: data.phone,
        email: data.email,
        title: data.title.notation,
        profession: data.profession.notation,
        username: data.username,
        oldPassword: "",
        newPassword: "",
        departmentId: data.department.id
      };
    });

  }
 
  
  editEmployee(){
 
  
    //provera da li su uslovi zadovoljeni da bi se poslao zahtev
    if (!this.isFirstNameCorrect() ) {
      return;
    }
    if (!this.userData.jmbg || !this.userData.residentialAddress || !this.userData.placeOfLiving || !this.userData.departmentId) {
      return;
    }
    if (!this.userData.email ||  !this.userData.title || !this.userData.profession || !this.userData.username) {
      return;
    }
    if(!this.userData.lastName || !this.userData.dateOfBirth ||!this.userData.gender  ){
      return;
    }
    if(!this.userData.oldPassword || !this.userData.newPassword ){
      return;
    }

    if(this.userData.newPassword !== this.newPasswordConfirm){
      return;
    }

      /*this.employeesService.updateEmployee(this.userData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.log(e);
        }
      })*/

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


    return this.httpClient.put<EmployeeResponse>(EMPLOYEE_ENDPOINT+'/'+lbz, this.userData, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).subscribe(
      data=>{console.log(data)
        window.location.reload()}
      );
      

  }
  catch{}
  return;
  }

  setProfession(profession:string): void {
    this.userData.profession=profession;
  }
  setTitle(title:string): void {
    this.userData.title=title;
  }
  setGender(gender:string): void {
    this.userData.gender=gender;
  }
  isFirstNameCorrect():boolean{
    if (!this.userData.firstName) 
      return false;

    if (!this.userData.firstName.match(/^[a-z0-9]+$/i) )
      return false;

    if (this.userData.firstName.length<5 || this.userData.firstName.length>30) {
      console.log((this.userData.firstName.length<5) +" " +(this.userData.firstName.length>30))
      return false;
    }
    
    else
      return true;

  }

}

