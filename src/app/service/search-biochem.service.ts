import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchBioChemRequest } from '../dto/request/search-biochem-request';
import { BIOCHEM_ENDPOINT, LAB_URL } from '../app.constants';
import { SearchBiochemResponse } from '../dto/response/search-biochem-response';

@Injectable({
  providedIn: 'root'
})
export class SearchBiochemService {

  constructor(private httpClient: HttpClient) { }

  search(page: number, size: number, startDate: string, endDate: string, lbp: string, stat: string) {
    let token = localStorage.getItem('token')
    let authHeader = 'Bearer ' + token;
    return this.httpClient.post<SearchBiochemResponse>(BIOCHEM_ENDPOINT + "/historyForLab?page=" + page + "&size=" + size, {
      startDate: startDate,
      endDate: endDate,
      lbp: lbp,
      orderStatus: stat
    }, {
      headers: {
        'Authorization': authHeader
      }
    });
  }

  getOrderResult(orderId: number) {
    return this.httpClient.get(LAB_URL + `/order/results/${orderId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  saveResult(orderId: number, parameterId: number, result: string) {
    return this.httpClient.put(LAB_URL + '/order/saveResult', {
      orderId: orderId,
      parameterId: parameterId,
      result: result
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  verifyResults(orderId: number) {
    return this.httpClient.post(LAB_URL + `/order/verify/${orderId}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

}
