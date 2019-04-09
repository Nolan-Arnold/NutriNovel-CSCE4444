import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatTableModule } from '@angular/material'; //required for using mat related stuff within module
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPlaygroundComponent } from './list-playground/list-playground.component';
import { HoverMenuComponent } from './hover-menu/hover-menu.component';
import { AboutComponent } from './about/about.component';
import { PlateComponent } from './plate/plate.component';
import { CompareComponent } from './compare/compare.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPlaygroundComponent,
    HoverMenuComponent,
    AboutComponent,
    PlateComponent,
    CompareComponent
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
    MatMenuModule, //menu
    MatButtonModule //ripple buttons
  ],
  providers: [],
  bootstrap: [AppComponent, ListPlaygroundComponent, HoverMenuComponent]
})
export class AppModule { }