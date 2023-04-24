import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HEALTH_RECORD_ENDPOINT } from '../app.constants';
import {IssuedResultsRequest} from "../dto/request/issued-results.request";
import {MedicalHistory} from "../dto/response/health-record.response";

@Injectable({
  providedIn: 'root'
})
export class IssueResultsService {

  constructor(private httpClient: HttpClient) {}
  getIssuedResults(issuedResultRequest: IssuedResultsRequest, page: number, size: number) {
    return this.httpClient.get<MedicalHistory>(HEALTH_RECORD_ENDPOINT + `/nestaRuta`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }


}
