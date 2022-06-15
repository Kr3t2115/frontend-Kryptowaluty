import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Coin } from '../model/coin';

@Injectable({
  providedIn: 'root',
})
export class GetKryptoService {
  allDataLink =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  constructor(private http: HttpClient) {}

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  getAllData(): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.allDataLink);
  }
}
