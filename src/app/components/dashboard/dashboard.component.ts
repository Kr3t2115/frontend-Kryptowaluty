import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitter';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  authenticated = false;
  working = '';
  ngOnInit(): void {
    this.http
      .get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.working = `Jestes zalogowany jako ${res.name}`;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          Emitters.authEmitter.emit(false);

          this.working =
            'Nie jestes zalogwany za chwile przekieruje cię do strony głównej';
          setTimeout(() => {
            this.router.navigate(['']);
          }, 0);
        }
      );
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
}
