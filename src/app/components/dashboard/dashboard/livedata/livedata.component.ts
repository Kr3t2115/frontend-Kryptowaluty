import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/model/coin';
import { GetKryptoService } from 'src/app/services/get-krypto.service';
@Component({
  selector: 'app-livedata',
  templateUrl: './livedata.component.html',
  styleUrls: ['./livedata.component.css'],
})
export class LivedataComponent implements OnInit {
  displayedColumns: string[] = ['nazwa', 'cena', 'change', 'marketCap'];

  constructor(private service: GetKryptoService) {}

  coiny: Coin[] = [];

  myDataSource$ = new MatTableDataSource();

  ngOnInit(): void {
    this.Getall();
    this.service.Refreshrequired.subscribe((respone) => {
      this.Getall();
    });
    console.log(this.myDataSource$.data);
  }

  Getall() {
    this.service.getAllData().subscribe((result) => {
      this.myDataSource$.data = result;
    });
  }
}
