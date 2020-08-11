import { Injectable } from '@angular/core';
import { Flight } from './flight.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flightData : Flight;

  allFlights: Flight[] = [];
  
  //A read-only variable for our Requests
  readonly rootURL ="https://localhost:44372/api";

  constructor(private http: HttpClient) { }

  postFlight(flightInfo:Flight)
  {
    
    //We will return the observable from POST method to the calling function
                //URI for Web API's Method
      return this.http.post('https://localhost:44372/api/FLIGHTs',flightInfo);
  }

  getFlightDetails(id:string)
  {
    this.http.get('https://localhost:44372/api/FLIGHTs/'+id).subscribe(postData=>{
      console.log(postData);
      this.flightData = postData as Flight;
      console.log("Flight Data : "+this.flightData);
    });
    return this.flightData;
  }

  updateFlight(id:string , updFlight:Flight)
  {
    this.http.put('https://localhost:44372/api/FLIGHTs/'+id,updFlight).subscribe(res=>{
      console.log(res);
    })
  }

  deleteFlight(id:string)
  {
    this.http.delete('https://localhost:44372/api/FLIGHTs/'+id).subscribe(res=>{
      console.log(res);
    })

  }

  fetchFlights()
  {
    this.http.get('https://localhost:44372/api/FLIGHTs').subscribe(res=>{
      this.allFlights = res as Flight[];
      console.log(this.allFlights);
    })

    //res is the collection of FLights returned from the Web API Method
  }

}
