import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, startWith, map } from 'rxjs';
import { SearchEmployeeResponse, SearchEmployeesResponseV2 } from '../dto/response/employee.response';
import { EmployeesService } from '../service/employee.service';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.css']
})
export class SearchEmployeesComponent implements OnInit {
  searchEmployeesForm: FormGroup;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  employees: SearchEmployeeResponse[] = [];
  paginatedEmployees: SearchEmployeeResponse[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private employeesService: EmployeesService,
              private toast: HotToastService,
              private modalService: NgbModal) {
    this.searchEmployeesForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      departmentName: [''],
      hospitalName: [''],
      includeDeleted: [false]
    });
    this.refreshEmployees();
  }

  ngOnInit(): void {

  }

  search(): void {
    const val = this.searchEmployeesForm.value;
    this.refreshEmployees();
  }

  refreshEmployees(): void {
    const val = this.searchEmployeesForm.value;
    this.employeesService.searchEmployees({
      firstName: val.firstName,
      lastName: val.lastName,
      departmentName: val.departmentName,
      hospitalName: val.hospitalName,
      includeDeleted: val.includeDeleted,
      page: this.page - 1,
      size: this.pageSize
    }).subscribe({
      next: (res) => {
        const response = res as SearchEmployeesResponseV2;
        console.log(response);
        this.paginatedEmployees = response.userList;
        this.collectionSize = response.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  deleteEmployee(id: number) {
    this.modalService.open(NgbdModalConfirm).result.then((data) => {
      this.employeesService.deleteEmployee(id).subscribe({
        next: (res) => {
          this.toast.success('Korisnik uspešno obrisan');
          this.refreshEmployees();
        },
        error: (e) => {
          console.log(e)
          this.toast.error(e.error.errorMessage);
        }
      });
    }, (dismiss) => {
    });
  }
}

@Component({
	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Brisanje zaposlenog</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da obrišete ovog zaposlenog?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Obriši</button>
		</div>
	`,
})
export class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}
}
