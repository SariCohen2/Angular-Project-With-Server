import { Component } from '@angular/core';
import { VolunteerService } from '../volunteer.service';
import { Volunteer } from 'src/app/volunteer.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-volunteers-list',
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss']
})
export class VolunteersListComponent {
  Volunteers: Volunteer[] = [];
  constructor(private volunteerService: VolunteerService, private router: Router) {
    //Get the volunteers list from the service
    volunteerService.getVolunteers().subscribe(data => {
      this.Volunteers = data;
      //If we came from the editing component so we have a variable to save:
      if (volunteerService.selected != undefined) {
        console.log("in list " + volunteerService.selected.name + " id=" + volunteerService.selected.id);
        this.saveValToList(volunteerService.selected);
      }
    });
  }
  //We will update the variable in the service and redirect to the editing component
  ediVal = (v: Volunteer) => {
    this.volunteerService.selected = v;
    this.router.navigate(['edit']);
  }
  saveValToList = (valToSave?: Volunteer) => {
    // We will find the index of the edited volunteer, and send it and the index to the server, in addition we will change the variable in the service to undefined
    for (let i = 0; i < this.Volunteers.length; i++) {
      if (this.Volunteers[i].id == valToSave?.id) {
        this.Volunteers[i] = valToSave;
        this.volunteerService.putVolunteers(this.Volunteers[i], i).subscribe(data => { this.Volunteers = data; console.log(this.Volunteers); });
        this.volunteerService.selected = undefined;
        break;
      }
    }
  }
}
