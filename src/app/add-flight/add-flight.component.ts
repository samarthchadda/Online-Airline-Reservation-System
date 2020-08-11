import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms'
import { Time } from '@angular/common';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {

  dt :Date;
  tm:Time;

  flightInfo : Flight;
  
  //injecting the flight Service
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
  }

  AddFlight(form:NgForm)
  {
      // console.log(this.dt);
      // console.log(this.tm);
      // const date1 = this.dt.toString() +" "+ this.tm.toString();
      // const date2 = new Date(date1);
      // console.log(date1);
      // console.log(date2);

      // console.log(form.value.flightCode);
      // console.log(form.value.flightType);
      // console.log(form.value.source);
      // console.log(form.value.destination);
      // console.log(form.value.arrivalDate);
      // console.log(form.value.arrivalTime);
      // console.log(form.value.deptDate);
      // console.log(form.value.deptTime);
      // console.log(form.value.duration);
      // console.log(form.value.stops);
      // console.log(form.value.fare);
      // console.log(form.value.maintenance);
      // console.log(form.value.capacity);
      // console.log(form.value.amount);
      // console.log(form.value.status);
      // console.log(form.value.daysOfRun);

      // const arrival = form.value.arrivalDate.toString() +" "+form.value.arrivalTime.toString();
      // const arrivalDate = new Date(arrival); 

      this.flightInfo ={
      FLIGHT_CODE : form.value.flightCode,
      SOURCE : form.value.source,
      DESTINATION :form.value.destination,
      ARRIVAL : form.value.arrivalTime.toString(),
      DEPARTURE : form.value.deptTime.toString(),
      STATUS : form.value.status,
      DURATION : form.value.duration,
      FLIGHT_TYPE : form.value.flightType,
      NO_OF_STOPS :form.value.stops,
      DAYS_OF_RUN : form.value.daysOfRun,
      CAPACITY : form.value.capacity,
      FARE : form.value.fare,
      TOTAL_AMOUNT : form.value.amount,
      MAINTENANCE_COST : form.value.maintenance,
      AVAILABLE_SEATS : form.value.capacity
            
      }
	
	console.log(this.flightInfo);

  this.flightService.postFlight(this.flightInfo).subscribe(responseData=>{
        console.log("Response Data:"+responseData);    
        alert("Details Submitted")  

      });
      
      form.reset();      
        
      
  }


}
