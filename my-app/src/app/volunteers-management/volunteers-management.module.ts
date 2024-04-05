import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersEditingComponent } from './volunteers-editing/volunteers-editing.component';
import { VolunteersListComponent } from './volunteers-list/volunteers-list.component';
import { VolunteerService } from './volunteer.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VolunteersEditingComponent, VolunteersListComponent],
  imports: [
    CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [VolunteerService],
  exports: [VolunteersListComponent]
})
export class VolunteersManagementModule { }
