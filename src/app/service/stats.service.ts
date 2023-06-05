import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STATS_URL } from '../app.constants';
import { CovidRow } from '../components/covid/covid-stats/data';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(private httpClient: HttpClient) {
  }

  getWorldStats() {
    return this.httpClient.get<CovidRow[]>(STATS_URL + '/world');
  }

  getCases(name: string) {
    return this.httpClient.get(STATS_URL + '/covid-cases', {
      params: {
        name: name
      }
    })
  }

  getDeaths(name: string) {
    return this.httpClient.get(STATS_URL + '/covid-deaths', {
      params: {
        name: name
      }
    })
  }
}
