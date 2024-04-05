import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Volunteer } from 'src/app/volunteer.model';
import { VolunteerService } from '../volunteer.service';
import { Router } from '@angular/router';
import { Schedule } from 'src/app/schedule.model';

@Component({
  selector: 'app-volunteers-editing',
  templateUrl: './volunteers-editing.component.html',
  styleUrls: ['./volunteers-editing.component.scss']
})
export class VolunteersEditingComponent {
  volunteerForm: FormGroup = new FormGroup({});
  //will become true if the volunteer canceled a day he was assigned to.
  flag = false;
  //Saves the selected volunteer before the changes - in case of an error
  lastVol?: Volunteer;
  constructor(public volunteerService: VolunteerService, private router: Router) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    //Get the schedule from the service 
    volunteerService.getSchedule().subscribe(data => {
      console.log("in save in subs");
      this.schedule = data;
      for (let i = 0; i < 7; i++) {
        console.log("data[i]=" + data.daysByid[i]);
      }
    })
    if (volunteerService.selected != null) {
      this.volunteerForm = new FormGroup({
        name: new FormControl(volunteerService.selected?.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        phone: new FormControl(volunteerService.selected?.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(20)]),
        days: new FormControl(volunteerService.selected?.days, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
        id: new FormControl(volunteerService.selected?.id, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      });
    }
  }
  public _val?: Volunteer;
  id: number = 0;
  schedule?: Schedule;
  //Sends the edited volunteer to the list component
  saveNewVal = () => {
    this.flag = false;
    if (this.volunteerForm.valid) {
      this.lastVol = this.volunteerService.selected;
      //Update the service volunteer about the new volunteer
      this.volunteerService.selected = this.volunteerForm.value;
      console.log(this.volunteerService.selected?.name);
      //Checking whether the volunteer canceled a day he was already assigned to
      for (let i = 0; i < 7 && !this.flag; i++) {
        if (this.schedule?.daysByid[i] == this.volunteerForm.controls['id'].value) {
          if (this.volunteerService.selected?.days.charAt(i) == '0') {
            this.flag = true;
          }
        }
      }
      if (this.flag == true) {
        //In the event that he cancels a day he is already assigned to: we will print an error message, and cancel saving it in the service
        this.volunteerService.selected = undefined;
        alert("Can't save! You have canceled a day you are assigned to.")
      }
      //In any case, return to the list component
      this.router.navigate(['list/']);
    }
    else
      alert("the form is not valid");
  }
}
