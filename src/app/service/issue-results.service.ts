import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HEALTH_RECORD_ENDPOINT } from '../app.constants';
import {MedicalHistory} from "../dto/response/health-record.response";

@Injectable({
  providedIn: 'root'
})
export class IssueResultsService {

  constructor(private httpClient: HttpClient) {}


}
