import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-edit-flights',
  templateUrl: './edit-flights.component.html',
  styleUrls: ['./edit-flights.component.css']
})
export class EditFlightsComponent implements OnInit {

  flightNo:string = '';

  //injecting the router , and Service
  constructor(private routerBtn : Router, private service:FlightService) { }

  ngOnInit(): void {

  }
  onLoadFlight()
  {
          
    this.routerBtn.navigate(['/editFlights/',this.flightNo])
  }

  onDeleteFlight()
  {
    this.service.deleteFlight(this.flightNo);
  }

}
