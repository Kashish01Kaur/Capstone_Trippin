import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  userLogin(user: any): Observable<any> {
    return this.http.post<any>('https://localhost:7086/api/Users/login', user);
  }

  userRegister(user: any): Observable<any> {
    return this.http.post<any>('https://localhost:7086/api/Users/register', user);
  }

  getPackages(page: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7086/api/Packages?page=${page}`);
  }

  getPackagesBySearch(packages: any): Observable<any> {
    return this.http.get<any>('https://localhost:7086/api/Packages/search?q=' + packages);
  }
  getPackagesById(id: any): Observable<any> {
    return this.http.get<any>(`https://localhost:7086/api/Packages/${id}`);
  }





  displayItineraryAccommodation(userId: string): Observable<any> {
    return this.http.get<any>(`https://localhost:7086/api/Users/${userId}/itineraryAccommodation`)
  }
  addAccommodationToItinerary(userId: string, accomodation: any[]): Observable<any> {
    return this.http.post<any>(`https://localhost:7086/api/Users/${userId}/itineraryAccommodation`, accomodation);
  }
  
  deleteHotelId(userId: string, hotelId: string): Observable<any> {
    return this.http.delete(`https://localhost:7086/api/Users/${userId}/accommodations/${hotelId}`)
  }


  displayItineraryActivity(userId:string){
    return this.http.get<any>(`https://localhost:7086/api/Users/${userId}/itineraryActivity`)
  }
  addActivityToItinerary(userId: string, activity: any[]): Observable<any> {
    return this.http.post<any>(`https://localhost:7086/api/Users/${userId}/itineraryActivity`, activity);
  }
  deleteActivityId(userId: string, activityId: string): Observable<any> {
    return this.http.delete(`https://localhost:7086/api/Users/${userId}/activities/${activityId}`)
  }



  getWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4548307cea304c1be0254e9e655d3b58&units=metric`);
  }
}