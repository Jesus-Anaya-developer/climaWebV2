import { Routes } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";

export const routes: Routes = [
  { path: 'home', component: HeaderComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
