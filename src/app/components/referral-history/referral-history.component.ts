import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Referral } from 'src/app/dto/response/referral.response';



@Component({
  selector: 'app-referral-history',
  templateUrl: './referral-history.component.html',
  styleUrls: ['./referral-history.component.css']
})
export class ReferralHistoryComponent implements OnInit {

  searchReferralForm: FormGroup;
  referrals: Referral[] = [];
  selectedReferral: Referral;
  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(protected authService: AuthService,
    private formBuilder: FormBuilder,
    ) {
      this.searchReferralForm = this.formBuilder.group({
        id: [''],
        type: [''],
        lbz: [''],
        creationTime: [''],
        pboReferredFrom: [''],
        pboReferredTo: [''],
        includeDeleted: [false]
      });
        this.selectedReferral = this.referrals[0];
        this.refreshReferrals();
     }

  ngOnInit(): void {
  }

  search(): void {
  }

  refreshReferrals(): void {
  }

  deleteReferral(id:number) {
  }

  showDetails(referral: Referral) {
      this.selectedReferral = referral;
    }
}
