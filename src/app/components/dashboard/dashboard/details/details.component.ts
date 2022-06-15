import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { concatMap, delay, of, Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

export interface WITAM {
  name: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private currentRouter: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  data: any[] = [];
  name = this.currentRouter.snapshot.params['name'];

  rate: any;
  rate$!: Subscription;
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  dates: any[] = [];
  chartOptions: any;
  subject = webSocket(`wss://ws.coincap.io/prices?assets=${this.name}`);

  ngOnInit(): void {
    this.http
      .get<any[]>(`https://api.coingecko.com/api/v3/coins/${this.name}`)
      .subscribe(
        (res) => {
          this.data.push(res);
          console.log(this.data);
        },
        (err) => {
          this.router.navigate(['dashboard']);
        }
      );
  }

  ngAfterViewInit(): void {
    let nazwaaa = this.name;

    this.rate = this.subject
      .pipe(concatMap((item) => of(item).pipe(delay(1000))))
      .subscribe((data) => {
        console.log(data);
        this.rate = data;
        console.log(nazwaaa);

        this.chardata.push(Number(this.rate.nazwaaa));

        console.log(this.chardata);
        this.chartOptions = {
          series: [
            {
              data: this.chardata,
              name: `Wykres na żywo waluty  ${this.name}`,
            },
          ],
          chart: {
            type: 'line',
            zoomType: 'x',
          },
          title: {
            text: `Wykres waluty ${this.name}`,
          },
          tooltip: {
            valueSuffix: '$',
          },
          xAxis: {
            categories: this.dates,
          },
        };
      });
    console.log(this.rate);
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
}
