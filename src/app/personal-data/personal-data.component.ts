import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeesService } from '../service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../service/auth.service';
import { BooleanDaNePipe } from '../pipe/boolean.pipe';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {
  personalDataForm: FormGroup;

  isInEditMode:boolean;
  newPasswordConfirm:string;

  submitted = false;
  passwordsDontMatch = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private booleanDaNePipe: BooleanDaNePipe,
              private toast: HotToastService,
              private employeesService: EmployeesService,
              protected authService: AuthService) {
    this.isInEditMode=false;
    this.newPasswordConfirm='';

    this.personalDataForm = formBuilder.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z0-9]+')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      pol: ['', Validators.required],
      datumrodjenja: ['', Validators.required],
      jmbg: ['', Validators.required],
      adresastanovanja: ['', Validators.required],
      mestostanovanja: ['', Validators.required],
      kontakttel: [''],
      titula: ['', Validators.required],
      odeljenje: ['', Validators.required],
      zanimanje: ['', Validators.required],
      lbz: [{value: '', disabled: true}],
      obrisan: [{value: '', disabled: true}],
      staraLozinka: ['', [
        Validators.required
      ]],
      novaLozinka: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9_.-]+')
      ]],
      ponovnaLozinka: ['', [
        Validators.required
      ]]
    });
    this.personalDataForm.disable();
 }

  ngOnInit(): void {
    this.employeesService.getEmployeeByLbz(localStorage.getItem('lbz')!).subscribe({
      next: (res) => {
        console.log('getEmployeeByLBZ', res);
        this.personalDataForm.get('ime')?.setValue(res.firstName);
        this.personalDataForm.get('prezime')?.setValue(res.lastName);
        this.personalDataForm.get('username')?.setValue(res.username);
        this.personalDataForm.get('email')?.setValue(res.email);
        this.personalDataForm.get('pol')?.setValue(res.gender);
        this.personalDataForm.get('datumrodjenja')?.setValue(this.datePipe.transform(res.dateOfBirth, 'yyyy-MM-dd'));
        this.personalDataForm.get('jmbg')?.setValue(res.jmbg);
        this.personalDataForm.get('adresastanovanja')?.setValue(res.residentalAddress);
        this.personalDataForm.get('mestostanovanja')?.setValue(res.placeOfLiving);
        this.personalDataForm.get('kontakttel')?.setValue(res.phone);
        this.personalDataForm.get('lbz')?.setValue(res.lbz);
        this.personalDataForm.get('obrisan')?.setValue(this.booleanDaNePipe.transform(res.deleted));
        this.personalDataForm.get('titula')?.setValue(res.title.notation);
        this.personalDataForm.get('odeljenje')?.setValue(res.department.id);
        this.personalDataForm.get('zanimanje')?.setValue(res.profession.notation);
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  edit(): void {
    if (this.authService.hasPermission('ROLE_ADMIN')) {
      this.personalDataForm.enable();
      this.personalDataForm.get('lbz')?.disable();
      this.personalDataForm.get('obrisan')?.disable();
      this.isInEditMode = true;
    } else {
      this.personalDataForm.get('kontakttel')?.enable();
      this.personalDataForm.get('staraLozinka')?.enable();
      this.personalDataForm.get('novaLozinka')?.enable();
      this.personalDataForm.get('ponovnaLozinka')?.enable();
      this.isInEditMode = true;
    }
  }

  save(): void {
    this.submitted = true;

    const val = this.personalDataForm.value;

    if (this.personalDataForm.get('staraLozinka')?.value == '' && this.personalDataForm.get('novaLozinka')?.value == '' && this.personalDataForm.get('ponovnaLozinka')?.value == '') {
      console.log('before', this.personalDataForm.get('staraLozinka'));
      this.personalDataForm.get('staraLozinka')?.setValue(null);
      this.personalDataForm.get('novaLozinka')?.setValue(null);
      this.personalDataForm.get('ponovnaLozinka')?.setValue(null);
      this.personalDataForm.get('staraLozinka')?.setErrors(null);
      this.personalDataForm.get('novaLozinka')?.setErrors(null);
      this.personalDataForm.get('ponovnaLozinka')?.setErrors(null);
      console.log('after', this.personalDataForm.get('staraLozinka'));

      if (this.personalDataForm.invalid) {
        return;
      }

      this.sendUpdateEmployeeRequest();
      return;
    }

    if (this.personalDataForm.invalid) {
      return;
    }

    if (val.novaLozinka != val.ponovnaLozinka) {
      this.passwordsDontMatch = true;
      return;
    }

    this.sendUpdateEmployeeRequest();
  }

  sendUpdateEmployeeRequest(): void {
    this.employeesService.updateEmployee(localStorage.getItem('lbz')!, {
      firstName: this.personalDataForm.get('ime')?.value,
      lastName: this.personalDataForm.get('prezime')?.value,
      dateOfBirth: this.personalDataForm.get('datumrodjenja')?.value,
      gender: this.personalDataForm.get('pol')?.value,
      jmbg: this.personalDataForm.get('jmbg')?.value,
      residentialAddress: this.personalDataForm.get('adresastanovanja')?.value,
      placeOfLiving: this.personalDataForm.get('mestostanovanja')?.value,
      phone: this.personalDataForm.get('kontakttel')?.value,
      email: this.personalDataForm.get('email')?.value,
      title: this.personalDataForm.get('titula')?.value,
      profession: this.personalDataForm.get('zanimanje')?.value,
      username: this.personalDataForm.get('username')?.value,
      oldPassword: this.personalDataForm.get('staraLozinka')?.value,
      newPassword: this.personalDataForm.get('novaLozinka')?.value,
      departmentId: this.personalDataForm.get('odeljenje')?.value
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/']).then(() => {
          this.toast.success('Uspešno ste ažurirali vaše podatke');
        })
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage);
      }
    });
  }

}

