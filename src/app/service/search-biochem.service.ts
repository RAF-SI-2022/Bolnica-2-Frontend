import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchBioChemRequest } from '../dto/request/search-biochem-request';
import { BIOCHEM_ENDPOINT } from '../app.constants';
import { SearchBiochemResponse } from '../dto/response/search-biochem-response';

@Injectable({
  providedIn: 'root'
})
export class SearchBiochemService {

  constructor(private httpClient: HttpClient) { }

  search(page: number, size: number,startDate:string,endDate:string,lbp:string,stat:string) {
    let token = localStorage.getItem('token')
    let authHeader = 'Bearer ' + token;
    return this.httpClient.post<SearchBiochemResponse>(BIOCHEM_ENDPOINT+"/historyForLab?page="+page+"&size="+size,{
      startDate:startDate,
      endDate:endDate,
      lbp:lbp,
      orderStatus:stat
    },{
      headers: {
          'Authorization': authHeader
      }
  });
  }
 
}
