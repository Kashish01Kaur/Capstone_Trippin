import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginasComponent } from './pages/loginas/loginas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';
import { UserloginComponent } from './pages/userlogin/userlogin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UseregisterComponent } from './pages/useregister/useregister.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { AccommodationsComponent } from './pages/accommodations/accommodations.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { CalculateRoutesComponent } from './pages/calculate-routes/calculate-routes.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginasComponent,
    AdminloginComponent,
    UserloginComponent,
    UseregisterComponent,
    AdmindashboardComponent,
    UserdashboardComponent,
    AccommodationsComponent,
    ActivitiesComponent,
    ItineraryComponent,
    WeatherComponent,
    CalculateRoutesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    FontAwesomeModule,
    CommonModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
