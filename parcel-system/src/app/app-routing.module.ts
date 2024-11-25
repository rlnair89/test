import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentManagerComponent } from './department-manager/department-manager.component';
import { ParcelListComponent } from './parcel-list/parcel-list.component';

const routes: Routes = [
  { path: 'parcel', component: ParcelListComponent },
  { path: 'departments', component: DepartmentManagerComponent },
  { path: '', redirectTo: '/departments', pathMatch: 'full' }, // Root redirect with no component
  { path: '**', redirectTo: '/departments' } // Wildcard route for invalid URLs, also no component here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
