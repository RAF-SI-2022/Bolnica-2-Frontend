import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { CovidRow, STATS } from './data';
import { countryISOMapping, getCountryISO2 } from './iso-codes';
import { StatsService } from 'src/app/service/stats.service';

export type SortColumn = keyof CovidRow | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}

@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.css']
})
export class CovidStatsComponent implements OnInit {
  stats: CovidRow[];
  filter: string = '';

  worldCasesData: any;
  worldDeathsData: any;

  firstChart!: EChartsOption;
  secondChart!: EChartsOption;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(private statsService: StatsService) {
    this.filter = 'country';
    this.stats = STATS.filter((row) => {
      return row.continent !== 'unknown'
    });

    this.statsService.getCases('World').subscribe({
      next: (res) => {
        this.worldCasesData = res;
        this.firstChart = {
          xAxis: {
            data: this.worldCasesData.cases_list.map((x: any) => x.date)
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
              startValue: this.worldCasesData.cases_list[0].date
            },
            {
              type: 'inside'
            }
          ],
          devicePixelRatio: 4,
          title: {
            text: 'Broj slučajeva (ceo svet)',
            left: 'center',
            top: 12,
            textStyle: {
              fontFamily: 'Montserrat,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
            }
          },
          series: [
            {
              type: 'line',
              data: this.worldCasesData.cases_list.map((x: any) => x.value),
              animationDelay: idx => idx * 10
            }
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: idx => idx * 5,
        }
      }
    });

    this.statsService.getDeaths('World').subscribe({
      next: (res) => {
        this.worldDeathsData = res;
        this.secondChart = {
          xAxis: {
            data: this.worldDeathsData.deaths_list.map((x: any) => x.date)
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
              startValue: this.worldDeathsData.deaths_list[0].date
            },
            {
              type: 'inside'
            }
          ],
          devicePixelRatio: 4,
          title: {
            text: 'Broj smrtnih slučajeva (ceo svet)',
            left: 'center',
            top: 12,
            textStyle: {
              fontFamily: 'Montserrat,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
            }
          },
          series: [
            {
              type: 'line',
              data: this.worldDeathsData.deaths_list.map((x: any) => x.value),
              animationDelay: idx => idx * 10
            }
          ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: idx => idx * 5,
        }
      }
    })
  }

  onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		// sorting countries
		if (direction === '' || column === '') {
      if (this.filter === 'country') {
        this.onCountries();
      } else if (this.filter === 'continent') {
        this.onContinents();
      } else if (this.filter === 'world') {
        this.onWorld();
      }
		} else {
      const copy = this.stats;
			this.stats = [...copy].sort((a, b) => {
				let res = compare(a[column], b[column]);
        if (a[column] === 'unknown' && b[column] === 'unknown') {
          res = 0;
        } else if (b[column] === 'unknown') res = 1;
        else if (a[column] === 'unknown') res = -1;
				return direction === 'asc' ? res : -res;
			});
		}
	}


  ngOnInit(): void {

  }

  onCountries() {
    this.filter = 'country';
    this.stats = STATS.filter((row) => {
      return row.continent !== 'unknown'
    })
  }

  onContinents() {
    this.filter = 'continent';
    this.stats = STATS.filter((row) => {
      return row.iso_code === 'OWID_OCE' || row.iso_code === 'OWID_NAM' || row.iso_code === 'OWID_AFR' || row.iso_code === 'OWID_EUR' || row.iso_code === 'OWID_ASI' || row.iso_code === 'OWID_SAM'
    })
  }

  onWorld() {
    this.filter = 'world';
    this.stats = STATS.filter((row) => {
      return row.location === 'World'
    })
  }

  getIso2(iso3: string) {
    return getCountryISO2(iso3);
  }

  hasFlag(iso3: string) {
    return countryISOMapping[iso3] !== undefined;
  }

}
