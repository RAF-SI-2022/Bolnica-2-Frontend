import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { STATS } from '../covid-stats/data';
import { countryISOMapping, getCountryISO2 } from '../covid-stats/iso-codes';
import { EChartsOption } from 'echarts';
import { StatsService } from 'src/app/service/stats.service';

@Component({
  selector: 'app-covid-single-country',
  templateUrl: './covid-single-country.component.html',
  styleUrls: ['./covid-single-country.component.css']
})
export class CovidSingleCountryComponent implements OnInit {
  iso: string = '';
  singleStats: any;

  casesData: any;
  deathsData: any;

  firstChart!: EChartsOption;
  secondChart!: EChartsOption;

  constructor(private route: ActivatedRoute,
    private statsService: StatsService) {

    this.route.params.subscribe((params) => {
      this.iso = params.iso;
      this.singleStats = STATS.filter(obj => obj.iso_code === this.iso)[0];

      this.statsService.getCases(this.singleStats.location).subscribe({
        next: (res) => {
          this.casesData = res;
          this.firstChart = {
            xAxis: {
              data: this.casesData.cases_list.map((x: any) => x.date)
            },
            tooltip: {},
            yAxis: {},
            toolbox: {
              right: 10,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            dataZoom: [
              {
                startValue: this.casesData.cases_list[0].date
              },
              {
                type: 'inside'
              }
            ],
            devicePixelRatio: 4,
            title: {
              text: 'Broj slučajeva',
              left: 'center',
              top: 12,
              textStyle: {
                fontFamily: 'Montserrat,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
              }
            },
            series: [
              {
                type: 'line',
                data: this.casesData.cases_list.map((x: any) => x.value),
                animationDelay: idx => idx * 10
              }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: idx => idx * 5,
          }
        }
      })


      this.statsService.getDeaths(this.singleStats.location).subscribe({
        next: (res) => {
          this.deathsData = res;
          this.secondChart = {
            xAxis: {
              data: this.deathsData.deaths_list.map((x: any) => x.date)
            },
            tooltip: {},
            yAxis: {},
            toolbox: {
              right: 10,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            dataZoom: [
              {
                startValue: this.deathsData.deaths_list[0].date
              },
              {
                type: 'inside'
              }
            ],
            devicePixelRatio: 4,
            title: {
              text: 'Broj smrtnih slučajeva',
              left: 'center',
              top: 12,
              textStyle: {
                fontFamily: 'Montserrat,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
              }
            },
            series: [
              {
                type: 'line',
                data: this.deathsData.deaths_list.map((x: any) => x.value),
                animationDelay: idx => idx * 10
              }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: idx => idx * 5,
          }
        }
      })
    })
  }

  ngOnInit(): void {
  }

  getIso2(iso3: string) {
    return getCountryISO2(iso3);
  }

  hasFlag(iso3: string) {
    return countryISOMapping[iso3] !== undefined;
  }

}
