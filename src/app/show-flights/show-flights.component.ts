import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';


@Component({
  selector: 'app-show-flights',
  templateUrl: './show-flights.component.html',
  styleUrls: ['./show-flights.component.css']
})
export class ShowFlightsComponent implements OnInit {

  filterSource='';
  filterDest = '';

  constructor(public service:FlightService) { }

  ngOnInit(): void 
  {
    this.service.fetchFlights();
    
  }

}
