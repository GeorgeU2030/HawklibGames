import { Routes } from '@angular/router';
import { FormaddComponent } from './formadd/formadd.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'formadd' , component: FormaddComponent},
  { path: '**',   redirectTo: '/home', pathMatch: 'full' }, 
];
