import { PlateComponent } from './plate/plate.component';
import { CompareComponent } from './compare/compare.component';
import { HoverMenuComponent } from './hover-menu/hover-menu.component';
import { ListPlaygroundComponent } from './list-playground/list-playground.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { ExpansionComponent} from './expansion/expansion.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'full-menu', component: ListPlaygroundComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'plate', component: ExpansionComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
