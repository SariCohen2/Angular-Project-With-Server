import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Volunteer } from '../volunteer.model';
import { Observable } from 'rxjs';
import { Schedule } from '../schedule.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  selected?: Volunteer;
  changed?: number;
  //  URL:string="http://localhost:5204/Volunteers";
  constructor(private _http: HttpClient) {

  }
  //Get the list from the server
  getVolunteers = (): Observable<Volunteer[]> => {
    return this._http.get<Volunteer[]>("http://localhost:5204/Volunteers");
  }
  // Update the list in the server 
  putVolunteers = (vol: Volunteer, ind: number): Observable<Volunteer[]> => {
    return this._http.put<Volunteer[]>(`http://localhost:5204/Volunteers/saveV/${ind}`, vol);
  }
  //Get the schedule from the server
  getSchedule=():Observable<Schedule>=>{
    return this._http.get<Schedule>("http://localhost:5204/Volunteers/schedule");
  }
}
