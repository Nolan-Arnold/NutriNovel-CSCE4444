import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { MatSortModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTableModule } from '@angular/material'; //required for using mat related stuff within module
=======
import { MatSortModule, MatFormFieldModule,
  MatInputModule, MatCheckboxModule, MatTableModule } from '@angular/material'; //required for using mat related stuff within module
>>>>>>> fc767f09a5997cd56b2251e1ed09c611dfe10781
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
<<<<<<< HEAD
import { MatToolbarModule } from '@angular/material/toolbar';


import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
=======

import { AppRoutingModule } from './app-routing.module';
>>>>>>> fc767f09a5997cd56b2251e1ed09c611dfe10781

import { AppComponent } from './app.component';
import { ListPlaygroundComponent } from './list-playground/list-playground.component';
import { HoverMenuComponent } from './hover-menu/hover-menu.component';
import { AboutComponent } from './about/about.component';
import { PlateComponent } from './plate/plate.component';
import { CompareComponent } from './compare/compare.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPlaygroundComponent,
    HoverMenuComponent,
    AboutComponent,
    PlateComponent,
    CompareComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
<<<<<<< HEAD
    MatMenuModule, //menu
    MatButtonModule, //ripple buttons
    MatPaginatorModule,
    MatToolbarModule,
    RouterModule

    
  ],
  providers: [],
  bootstrap: [AppComponent] //remove other bootstrap components
=======
    MatMenuModule, // menu
    MatButtonModule, // ripple buttons
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent] // remove other bootstrap components
>>>>>>> fc767f09a5997cd56b2251e1ed09c611dfe10781
})
export class AppModule { }

