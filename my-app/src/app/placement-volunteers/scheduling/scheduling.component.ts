import { Component } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Volunteer } from 'src/app/volunteer.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Schedule } from 'src/app/schedule.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transportation-system',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent {
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  volunteersList: Volunteer[] = [];
  schedule?: Schedule;
  scheduleForm: FormGroup = new FormGroup({});
  constructor(private volunteerService: ScheduleService, public router: Router) {
    this.scheduleForm = new FormGroup({
      Sunday: new FormControl(),
      Monday: new FormControl(),
      Tuesday: new FormControl(),
      Wednesday: new FormControl(),
      Thursday: new FormControl(),
      Friday: new FormControl(),
      Saturday: new FormControl(),
    });
    this.volunteerService.getSchedule().subscribe(data => {
      this.schedule = data;
      this.scheduleForm.patchValue({
        Sunday: this.schedule?.daysByid[0],
        Monday: this.schedule?.daysByid[1],
        Tuesday: this.schedule?.daysByid[2],
        Wednesday: this.schedule?.daysByid[3],
        Thursday: this.schedule?.daysByid[4],
        Friday: this.schedule?.daysByid[5],
        Saturday: this.schedule?.daysByid[6],

      })
    })
    //I saved for each day separately, and only when saving did I insert into the array.

    //I received the list of volunteers for the byday function
    this.volunteerService.getVoluteers().subscribe(data => {
      this.volunteersList = data;
    })
  }
  getById(id: number) {
    return this.volunteersList.find(volunteer => volunteer.id == id)
  }
  byDays(day: number) {
    return this.volunteersList.filter(v => v.days.charAt(day) == '1')
  }
  saveSchedule = () => {
    if (this.scheduleForm.valid) {
      //Placing the days one by one
      this.schedule!.daysByid[0] = this.scheduleForm.controls['Sunday']?.value;
      this.schedule!.daysByid[1] = this.scheduleForm.controls['Monday']?.value;
      this.schedule!.daysByid[2] = this.scheduleForm.controls['Tuesday']?.value;
      this.schedule!.daysByid[3] = this.scheduleForm.controls['Wednesday']?.value;
      this.schedule!.daysByid[4] = this.scheduleForm.controls['Thursday']?.value;
      this.schedule!.daysByid[5] = this.scheduleForm.controls['Friday']?.value;
      this.schedule!.daysByid[6] = this.scheduleForm.controls['Saturday']?.value;
      //Updating the system on the server
      this.volunteerService.putSchedule(this.schedule).subscribe(data => {
        this.schedule = data;
        for (let i = 0; i < this.schedule!.daysByid.length; i++) {
          console.log(this.schedule!.daysByid[i]);
        }
        console.log(this.getById(this.schedule.daysByid[0])?.name);
      })
      console.log("saved!!");

      //Navigate to home
      this.router.navigate(['#']);
    }
    else
      alert("You must choose a volunteer for each day");
  }

}
