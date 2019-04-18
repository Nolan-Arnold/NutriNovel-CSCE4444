import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// required for using mat related stuff within module
import { MatSortModule, MatFormFieldModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatInputModule, MatCheckboxModule, MatTableModule } from '@angular/material';

import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListPlaygroundComponent } from './list-playground/list-playground.component';
import { HoverMenuComponent } from './hover-menu/hover-menu.component';
import { AboutComponent } from './about/about.component';
import { PlateComponent } from './plate/plate.component';
import { CompareComponent } from './compare/compare.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPlaygroundComponent,
    HoverMenuComponent,
    AboutComponent,
    PlateComponent,
    CompareComponent,
    MessagesComponent,
    SearchComponent
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
    MatProgressSpinnerModule,
    MatMenuModule, // menu
    MatButtonModule, // ripple buttons
    MatPaginatorModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent] // remove other bootstrap components

})
export class AppModule { }
