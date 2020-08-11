import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-update-flight',
  templateUrl: './update-flight.component.html',
  styleUrls: ['./update-flight.component.css']
})
export class UpdateFlightComponent implements OnInit {

  getFlightId:string;

  flightInfo : Flight;


  constructor(private route:ActivatedRoute,public service:FlightService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe((newParam:Params)=>
    {
        this.getFlightId= newParam['flightNo'];
        this.showFlightData();

        
    })
 

    
  }
  
  showFlightData()
  {
    
    this.service.getFlightDetails(this.getFlightId);
    
    // console.log("Update component : "+ this.flightInfo);
    
    
  }

  updateFlightInfo()
  {
    console.log(this.service.flightData.FARE);
    this.service.updateFlight(this.getFlightId, this.service.flightData);
  }
 
  

}
