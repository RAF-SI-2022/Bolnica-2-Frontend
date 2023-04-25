import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { SearchBiochemResponse } from 'src/app/dto/response/search-biochem-response';
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

  orderList:Array<string[]>=[];

  orders:Array<string[]> = [];
  order_single:string[] = [];

  constructor(private toast: HotToastService,protected authService: AuthService,private searchBiochemService:SearchBiochemService) { }

  ngOnInit(): void {
  }

  search(){
    let currentDate = new Date(Date.now()).toLocaleString().split(',')[0];
      if(this.lbp=='' && this.startDate=='' && this.endDate=='' && this.status=='') this.toast.info('Pretraga po tekucem datumu '+currentDate )
      if( this.startDate!=='' && this.endDate=='' ||
          this.startDate=='' && this.endDate!==''
       ) this.toast.warning("Odaberite oba datuma pretrage!") 
        else{
          const dateStart:Date=new Date(this.startDate);
          const dateEnd:Date=new Date(this.endDate);
          if(dateStart>dateEnd) this.toast.error("Pocetni datum ne moze biti veci od krajnjeg!")
          else{
            this.order_single=[];
            this.orders=[];
            this.searchBiochemService.search(this.page,this.pageSize,this.startDate,this.endDate,this.lbp,this.status).subscribe({
              next:(res)=>{
                const response = res as SearchBiochemResponse
                console.log(response)
                const ordersArray = Object.values(response['orderList'])
                for(let i=0;i<ordersArray.length;i++)  {
                  this.order_single.push(ordersArray[i].id.toString())
                  this.order_single.push(parseDate(ordersArray[i].creationTime))
                  this.order_single.push(ordersArray[i].lbp)
                  this.order_single.push(ordersArray[i].status.notation)
                  this.order_single.push(ordersArray[i].lbzTechnician)
                  console.log(this.order_single)
                  this.orders.push(this.order_single);
                }
                  this.orderList=this.orders;
                  this.collectionSize=response.count;
              },
              error:(e)=>{
                this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
              }
            });
          }
        }
    }
  }
  

function parseDate(creationTime: Date): string {
  console.log(creationTime.toLocaleDateString);
  let date =creationTime.toLocaleString().split(',')[0];
  let dateSplit = date.split('T');
  let timeSplit = dateSplit[1].split('.');
  return dateSplit[0]+" "+timeSplit[0];
}

