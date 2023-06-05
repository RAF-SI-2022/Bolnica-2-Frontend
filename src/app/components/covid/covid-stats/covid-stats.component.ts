import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { CovidRow, STATS } from './data';
import { getCountryISO2 } from './iso-codes';

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

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		// sorting countries
		if (direction === '' || column === '') {
			this.stats = STATS;
		} else {
			this.stats = [...STATS].sort((a, b) => {
				let res = compare(a[column], b[column]);
        if (a[column] === 'unknown' && b[column] === 'unknown') {
          res = 0;
        } else if (b[column] === 'unknown') res = 1;
        else if (a[column] === 'unknown') res = -1;
				return direction === 'asc' ? res : -res;
			});
		}
	}

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    tooltip: {},
    yAxis: {
      type: 'value',
    },
    devicePixelRatio: 4,
    title: {
      text: 'Broj slučajeva u poslednjih 7 dana',
      left: 'center',
      top: 12,
      textStyle: {
        fontFamily: 'Montserrat,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
      }
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
        animationDelay: idx => idx * 10
      },
      {
        data: [100, 200, 300, 400, 500, 600, 700],
        type: 'bar',
        animationDelay: idx => idx * 10
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: idx => idx * 5,
  }

  constructor() {
    this.stats = [];
    this.onCountries();
  }

  ngOnInit(): void {

  }

  onCountries() {
    this.stats = STATS.filter((row) => {
      return row.continent !== 'unknown'
    })
  }

  onContinents() {
    this.stats = STATS.filter((row) => {
      return row.iso_code === 'OWID_OCE' || row.iso_code === 'OWID_NAM' || row.iso_code === 'OWID_AFR' || row.iso_code === 'OWID_EUR' || row.iso_code === 'OWID_ASI' || row.iso_code === 'OWID_SAM'
    })
  }

  onWorld() {
    this.stats = STATS.filter((row) => {
      return row.location === 'World'
    })
  }

  getIso2(iso3: string) {
    return getCountryISO2(iso3);
  }

}
