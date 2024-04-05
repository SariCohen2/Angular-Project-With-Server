import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Volunteer } from '../volunteer.model';
import { Observable } from 'rxjs';
import { Schedule } from '../schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private _http: HttpClient) {
  }
  //Get the list from the server 
  getVoluteers = (): Observable<Volunteer[]> => {
    return this._http.get<Volunteer[]>(`http://localhost:5204/Volunteers`);
  }
  //Get the schedule from the server
  getSchedule = (): Observable<Schedule> => {
    return this._http.get<Schedule>(`http://localhost:5204/Volunteers/schedule`);
  }
  // Update the list in the server 
  putSchedule = (sch?: Schedule): Observable<Schedule> => {
    return this._http.put<Schedule>('http://localhost:5204/Volunteers/saveSchedule', sch);
  }
}
