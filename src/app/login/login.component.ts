import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatIcon } from '@angular/material';
import { Router } from '@angular/router';
import { PlateFoodService } from '../plate-food.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(private router: Router, private plateFoodService: PlateFoodService) { }

  ngOnInit() {
  }

  login(): void {
    if (this.username.nativeElement.value === 'admin' && this.password.nativeElement.value === 'admin') {
      this.plateFoodService.setUserMode(true);
      this.router.navigate(['admin']);
    } else {
      alert('Invalid credentials');
    }
  }
}
