import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchBioChemResponse_Lbp_Status,SearchBioChemResponse_Lbp } from '../dto/response/search-biochem-response';
import { BIOCHEM_ENDPOINT } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class SearchBiochemService {

  constructor(private httpClient: HttpClient) { }

  searchByLbpAndStatus(lbp:string,status:string,page:number,size:number,todaysDate:string) {
    let token = localStorage.getItem('token')
    let authHeader = 'Bearer ' + token;
    return this.httpClient.post<SearchBioChemResponse_Lbp_Status>(BIOCHEM_ENDPOINT+"/historyForLab?page="+page+"&size="+size,{
      startDate:todaysDate,
      endDate:todaysDate,
      lbp:lbp,
      orderStatus:status
    },{
      headers: {
          'Authorization': authHeader
      }
  });
  }
  searchByLbp(lbp:string,page:number,size:number,todaysDate:Date) {
    let token = localStorage.getItem('token')
    let authHeader = 'Bearer ' + token;
    return this.httpClient.post<SearchBioChemResponse_Lbp>(BIOCHEM_ENDPOINT+"/historyForLab?page="+page+"&size="+size,{
      startDate:todaysDate,
      endDate:todaysDate,
      lbp:lbp
    },{
      headers: {
          'Authorization': authHeader
      }
  });
  }

}
