import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-register-visit',
  templateUrl: './register-visit.component.html',
  styleUrls: ['./register-visit.component.css']
})
export class RegisterVisitComponent implements OnInit {
  lbp: string = '';

  form: FormGroup;

  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private toast: HotToastService,
              private router: Router,
              private route: ActivatedRoute,
              private patientService: PatientService) {

    this.route.params.subscribe((params) => {
      this.lbp = params.lbp;
    });

    this.form = this.formBuilder.group({
      visitorFirstName: ['', Validators.required],
      visitorLastName: ['', Validators.required],
      jmbgVisitor: ['', Validators.required],
      note: [''],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    this.patientService.registerStationaryVisit(this.lbp, value.visitorFirstName, value.visitorLastName, value.jmbgVisitor, value.note).subscribe({
      next: (res) => {
        this.router.navigate(['/nurse-stationary-menu', this.lbp]).then(() => {
          this.toast.success('Uspešno ste zakazali posetu');
        })
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva');
      }
    })
  }

}
