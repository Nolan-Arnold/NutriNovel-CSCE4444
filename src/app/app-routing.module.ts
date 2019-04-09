import { HoverMenuComponent } from './hover-menu/hover-menu.component';
import { ListPlaygroundComponent } from './list-playground/list-playground.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'full-menu', component: ListPlaygroundComponent },
  { path: 'compare', component: ListPlaygroundComponent },
  { path: 'plate', component: ListPlaygroundComponent },
  { path: 'search', component: ListPlaygroundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
