import { Component, OnInit, ViewChild } from '@angular/core';
import {MatButton} from '@angular/material/button'; 

@Component({
  selector: 'app-hover-menu',
  templateUrl: './hover-menu.component.html',
  styleUrls: ['./hover-menu.component.css']
})
export class HoverMenuComponent implements OnInit {
  @ViewChild(MatButton) isRoundButton: false;


  constructor() { }

  ngOnInit() {
  } 
}
