import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { EmployeesService } from '../service/employee.service';

@Component({
  selector: 'app-admin-edit-employee',
  templateUrl: './admin-edit-employee.component.html',
  styleUrls: ['./admin-edit-employee.component.css']
})
export class AdminEditEmployeeComponent implements OnInit {
  adminEditEmployeeForm: FormGroup;

  submitted = false;
  username = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private emloyeesService: EmployeesService,
              private toast: HotToastService,
              private datePipe: DatePipe) {
    this.adminEditEmployeeForm = this.formBuilder.group({
      ime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pol: ['', Validators.required],
      prezime: ['', Validators.required],
      datumrodjenja: ['', Validators.required],
      jmbg: ['', Validators.required],
      adresastanovanja: ['', Validators.required],
      mestostanovanja: ['', Validators.required],
      kontakttel: [''],
      privilegije: new FormArray([], Validators.required),
      titula: ['', Validators.required],
      odeljenje: ['', Validators.required],
      zanimanje: ['', Validators.required]
    });
  }

  get privilegijeFormArray(): FormArray {
    return this.adminEditEmployeeForm.controls.privilegije as FormArray;
  }

  ngOnInit(): void {
    this.emloyeesService.getEmployeeByLbz(this.route.snapshot.paramMap.get('lbz')!).subscribe({
      next: (res) => {
        this.adminEditEmployeeForm.get('ime')?.setValue(res.firstName);
        this.adminEditEmployeeForm.get('prezime')?.setValue(res.lastName);
        this.adminEditEmployeeForm.get('email')?.setValue(res.email);
        this.adminEditEmployeeForm.get('pol')?.setValue(res.gender);
        this.adminEditEmployeeForm.get('datumrodjenja')?.setValue(this.datePipe.transform(res.dateOfBirth, 'yyyy-MM-dd'));
        this.adminEditEmployeeForm.get('jmbg')?.setValue(res.jmbg);
        this.adminEditEmployeeForm.get('adresastanovanja')?.setValue(res.residentalAddress);
        this.adminEditEmployeeForm.get('mestostanovanja')?.setValue(res.placeOfLiving);
        this.adminEditEmployeeForm.get('kontakttel')?.setValue(res.phone);
        res.permissions.forEach(permission => {
          this.privilegijeFormArray.push(new FormControl(permission));
        });
        this.adminEditEmployeeForm.get('titula')?.setValue(res.title.notation);
        this.adminEditEmployeeForm.get('odeljenje')?.setValue(res.department.id);
        this.adminEditEmployeeForm.get('zanimanje')?.setValue(res.profession.notation);
        this.username = res.username;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage);
      }
    });
  }

  onPrivilegijeCheckboxChange(event: any) {
    const selectedPrivileges = (this.adminEditEmployeeForm.controls['privilegije'] as FormArray);
    if (event.target.checked) {
      selectedPrivileges.push(new FormControl(event.target.value));
    } else {
      const index = selectedPrivileges.controls.findIndex(x => x.value === event.target.value);
      selectedPrivileges.removeAt(index);
    }
  }

  editEmployee(): void {
    this.submitted = true;

    if (this.adminEditEmployeeForm.invalid) {
      return;
    }

    const val = this.adminEditEmployeeForm.value;

    this.emloyeesService.updateEmployee(this.route.snapshot.paramMap.get('lbz')!, {
      firstName: val.ime,
      lastName: val.prezime,
      dateOfBirth: val.datumrodjenja,
      gender: val.pol,
      jmbg: val.jmbg,
      residentialAddress: val.adresastanovanja,
      placeOfLiving: val.mestostanovanja,
      phone: val.kontakttel,
      email: val.email,
      title: val.titula,
      profession: val.zanimanje,
      username: this.username,
      oldPassword: null,
      newPassword: null,
      departmentId: val.odeljenje
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/search-employees']).then(() => {
          this.toast.success('Uspešno ste ažurirali zaposlenog');
        })
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage);
      }
    })
  }
}
