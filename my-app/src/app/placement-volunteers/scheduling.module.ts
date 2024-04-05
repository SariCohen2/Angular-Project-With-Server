import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { ScheduleService } from './schedule.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    SchedulingComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,BrowserModule
  ],
  providers: [ScheduleService],
  exports:[SchedulingComponent]
})
export class PlacementVolunteersModule { }
