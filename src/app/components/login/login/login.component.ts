import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snack: MatSnackBar
  ) {}

  hide = true;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit() {
    this.http
      .post('http://localhost:8000/api/login', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(
        (res) => {
          this.router.navigate(['dashboard']);
        },
        (err) => {
          this.snack.open(err.error.detail, 'Ok');
        }
      );
  }
}
