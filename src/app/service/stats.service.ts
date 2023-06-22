import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STATS_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(private httpClient: HttpClient) {
  }

  getWorldStats() {
    return this.httpClient.get(STATS_URL + '/stats/world');
  }

  getCases(name: string) {
    return this.httpClient.get(STATS_URL + '/stats/covid-cases', {
      params: {
        name: name
      }
    })
  }

  getDeaths(name: string) {
    return this.httpClient.get(STATS_URL + '/stats/covid-deaths', {
      params: {
        name: name
      }
    })
  }

  getTestsInProcessing() {
    return this.httpClient.get(STATS_URL + `/in-processing`);
  }

  processTest(id: number, result: boolean) {
    return this.httpClient.post(STATS_URL + `/process/${id}`, { result });
  }
}
