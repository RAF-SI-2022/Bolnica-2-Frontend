import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';
import { SearchBiochemService } from 'src/app/service/search-biochem.service';

@Component({
  selector: 'app-daily-biochem-acc',
  templateUrl: './daily-biochem-acc.component.html',
  styleUrls: ['./daily-biochem-acc.component.css']
})
export class DailyBiochemAccComponent implements OnInit {
  accs: any;
  selectedAcc: any;
  results: any;

  currentDate = new Date();

  constructor(private biochemService: SearchBiochemService,
              private toaster: HotToastService,
              private router: Router,
              protected authService: AuthService) {
    this.biochemService.search(0, 100, '', '', '', 'Neobrađen').subscribe({
      next: (res) => {
        this.accs = (res as any).orderList;
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  ngOnInit(): void {
  }

  selectAcc(acc: any) {
    this.selectedAcc = acc;
    this.biochemService.getOrderResult(acc.id).subscribe({
      next: (res) => {
        this.results = (res as any).results;
        for (let i = 0; i < this.results.length; i++) {
          this.results[i].editMode = true;
        }
      }
    })
  }

  toggleEditMode(i: number) {
    this.results[i].editMode = true;
  }

  saveResult(result: any) {
    if (result.result === null) {
      this.toaster.error('Unesite rezultat');
      return;
    }

    this.biochemService.saveResult(this.selectedAcc.id, result.parameter.id, result.result).subscribe({
      next: (res) => {
        this.toaster.success('Uspešno sačuvan rezultat');
        result.editMode = false;
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  verifyResults() {
    for (let result of this.results) {
      if (result.result === null) {
        this.toaster.error('Sačuvajte sve rezultate');
        return;
      }
    }
    this.biochemService.verifyResults(this.selectedAcc.id).subscribe({
      next: (res) => {
        this.router.navigate(['/search-biochem-acc']).then(() => {
          this.toaster.success('Uspešno ste verifikovali rezultat');
        })
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

}
