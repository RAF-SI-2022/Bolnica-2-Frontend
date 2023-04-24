import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { SearchBioChemResponse_Lbp_Status,SearchBioChemResponse_Lbp } from 'src/app/dto/response/search-biochem-response';
import { AuthService } from 'src/app/service/auth.service';
import { SearchBiochemService } from 'src/app/service/search-biochem.service';

@Component({
  selector: 'app-search-biochem-acc',
  templateUrl: './search-biochem-acc.component.html',
  styleUrls: ['./search-biochem-acc.component.css']
})
export class SearchBiochemAccComponent implements OnInit {

  page = 0;
  pageSize = 5;
  collectionSize = 0;

  lbp:string='';
  startDate:string='';
  endDate:string='';
  status:string='';

  constructor(private toast: HotToastService,protected authService: AuthService,private searchBiochemService:SearchBiochemService) { }

  ngOnInit(): void {
  }

  search(){
    let todaysDate=new Date().toJSON();
    //default
    if(this.startDate=='' && this.endDate=='' && this.status=='' && this.lbp=='') this.toast.info("Izvrsena pretraga po tekucem datumu.")
    //search by lbp and status
    else if(this.lbp!=='' && this.status!==''){
      this.searchBiochemService.searchByLbpAndStatus(this.lbp,this.status,this.page,this.pageSize,todaysDate).subscribe({
        next:(res)=>{
          const response = res as SearchBioChemResponse_Lbp_Status
            console.log(response)
        },
        error:(e)=>{
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
    }
    //search by lbp
    else if(this.lbp !=='' && this.status==''){
      let todaysDate=new Date();
      this.searchBiochemService.searchByLbp(this.lbp,this.page,this.pageSize,todaysDate).subscribe({
        next:(res)=>{
          const response = res as SearchBioChemResponse_Lbp
            console.log(response)
        },
        error:(e)=>{
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
    }
    //search by status
    else if(this.lbp=='' && this.status!==''){
      this.toast.info("Pretraga trenutno nije moguca. Pokusajte da dodate i lbp")
    }
    else{
      if( this.startDate!=='' && this.endDate=='' ||
          this.startDate=='' && this.endDate=='' ||
          this.startDate=='' && this.endDate!==''
       ) this.toast.warning("Odaberite oba datuma pretrage!") 
        else{
          const dateStart:Date=new Date(this.startDate);
          const dateEnd:Date=new Date(this.endDate);
          if(dateStart>dateEnd) this.toast.error("Pocetni datum ne moze biti veci od krajnjeg!")
          else console.log('search by date')
        }
    }
  }

}
