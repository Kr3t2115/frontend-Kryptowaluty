import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;

  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
  }

  submit() {
    this.http
      .post('http://localhost:8000/api/register', this.form.getRawValue())
      .subscribe((res) => {
        this.router.navigate(['/login']);
      });
  }
}
