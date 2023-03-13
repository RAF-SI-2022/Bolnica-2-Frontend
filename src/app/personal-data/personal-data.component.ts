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
  updateEmployeeForm: FormGroup;

  
  constructor(private router: Router,private httpClient:HttpClient,private formBuilder: FormBuilder,private employeesService: EmployeesService) {
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


    this.updateEmployeeForm = this.formBuilder.group({
      firstName: [this.userData.firstName, [Validators.required,Validators.minLength(5),Validators.maxLength(30)]],
      /*lastName: [this.userData.lastName, Validators.required],
      dateOfBirth: [this.userData.dateOfBirth],
      gender:[this.userData.gender , Validators.required],
      jmbg:[this.userData.jmbg , Validators.required],
      residentialAddress:[this.userData.residentialAddress , Validators.required],
      placeOfLiving:[this.userData.placeOfLiving, Validators.required],
      phone:[this.userData.phone],
      email:[this.userData.email ,[Validators.required, Validators.email]],
      title:[this.userData.title,[Validators.required]],
      profession:[this.userData.profession,[Validators.required]],
      username:[this.userData.username ,[Validators.required]],
      departmentId:[this.userData.departmentId ,[Validators.required]],
      oldPassword:[this.userData.oldPassword],
      newPassword:[this.userData.newPassword],*/
    });

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
 
  
    if (this.updateEmployeeForm.invalid) {
      alert("Nesto nije dobro");
      return;
    }
    if(this.userData.newPassword !== this.newPasswordConfirm){
      alert("Lozinke se ne poklapaju");
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
      data=>console.log(data)
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

}

