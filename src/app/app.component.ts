import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OnlineAirlineReservationSystem';

  loadedFeature = 'recipe';

  constructor(private service:AuthService)
  {

  }

  ngOnInit()
  {
      this.service.autoLogin();
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
