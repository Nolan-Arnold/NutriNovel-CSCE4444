import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CanDisableRipple } from '@angular/material';

@Component({
  selector: 'hover-menu',
  templateUrl: './hover-menu.component.html',
  styleUrls: ['./hover-menu.component.css']
})
export class HoverMenuComponent implements OnInit {
  @ViewChild(MatButton) isRoundButton: false;

  constructor() { }

  ngOnInit() { }
}