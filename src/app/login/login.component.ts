import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    if (this.username.nativeElement.value === 'admin' && this.password.nativeElement.value === 'admin') {
      this.router.navigate(['admin']);
    } else {
      alert('Invalid credentials');
    }
  }
}
