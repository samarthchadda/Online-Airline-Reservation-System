import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EditFlightsComponent } from './edit-flights/edit-flights.component';
import { HeaderComponent } from './header/header.component';

import { Routes, RouterModule} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { UpdateFlightComponent } from './update-flight/update-flight.component';
import { ReportComponent } from './report/report.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { TotalRevenueComponent } from './report/total-revenue/total-revenue.component';
import { FlightService } from './flight.service';
import { HttpClientModule } from '@angular/common/http';
import { ShowFlightsComponent } from './show-flights/show-flights.component';
import { AuthComponent } from './auth/auth.component';
import { FilterPipe } from './filter.pipe'


const appRoutes: Routes =[
  { path : '', component: WelcomeComponent},

  
  { path : 'editFlights', component: EditFlightsComponent , children:[

    {path : ':flightNo', component :UpdateFlightComponent}

  ]},
  {path : 'report', component:ReportComponent },
  {path : 'totalRevenue', component :TotalRevenueComponent},
  {path : 'auth', component :AuthComponent},

  {path : 'addFlight', component:AddFlightComponent},

  {path : 'flightList',component:ShowFlightsComponent}


]


@NgModule({
  declarations: [
    AppComponent,
    EditFlightsComponent,
    HeaderComponent,
    WelcomeComponent,
    UpdateFlightComponent,
    AddFlightComponent,
    TotalRevenueComponent,
    ShowFlightsComponent,
    AuthComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
