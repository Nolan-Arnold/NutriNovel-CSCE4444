import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule,MatFormFieldModule,MatInputModule,MatCheckboxModule  } from '@angular/material';//required for using mat realted stuff within module
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPlaygroundComponent } from './list-playground/list-playground.component';
import { MatTableModule } from '@angular/material'  

@NgModule({
  declarations: [
    AppComponent,
    ListPlaygroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent,ListPlaygroundComponent]
})
export class AppModule { }
