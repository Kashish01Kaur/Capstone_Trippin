import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { forkJoin, window } from 'rxjs';
import { Router } from '@angular/router';

type LatLngExpression = [number, number];

interface Waypoint {
  latLng: L.LatLng,
  name: string,
}

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  itineraryAccommodationItems: any[] = [];
  itineraryActivityItems: any[] = [];
  userId = '';
  totalBudget: any;
  private map!: L.Map;
  private centroid: LatLngExpression = [17.3850, 78.4867];
  private routingControl!: L.Routing.Control;

  constructor(private api: ApiService,private router:Router) { }

  private initMap(): void {
    const validCoordinates: LatLngExpression[] = [];

    // Loop through the itineraryItems and get the coordinates for each one
    this.itineraryAccommodationItems.forEach(item => {
      const coord = item.hotelLocation.coordinates;
      if (!isNaN(parseFloat(coord[0])) && !isNaN(parseFloat(coord[1]))) {
        validCoordinates.push([parseFloat(coord[0]), parseFloat(coord[1])]);
      }
    });

    this.itineraryActivityItems.forEach(item => {
      const coord = item.activityLocation.coordinates;
      if (!isNaN(parseFloat(coord[0])) && !isNaN(parseFloat(coord[1]))) {
        validCoordinates.push([parseFloat(coord[0]), parseFloat(coord[1])]);
      }
    });

    console.log('validCoordinates', validCoordinates);

    // Set the centroid to the average of all valid coordinates
    let centroid: LatLngExpression;
    if (validCoordinates.length > 0) {
      centroid = [
        validCoordinates.reduce((sum, coord) => sum + coord[0], 0) / validCoordinates.length,
        validCoordinates.reduce((sum, coord) => sum + coord[1], 0) / validCoordinates.length
      ];
    } else {
      centroid = [17.3850, 78.4867];
    }

    console.log('centroid', centroid);

    // Create the map
    this.map = L.map('map', {
      zoom: 12
    });
    this.map.setView(centroid, 12);

    // Add the tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Create marker for each itinerary item
    const defaultIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    for (const item of this.itineraryAccommodationItems) {
      const coord = item.hotelLocation.coordinates;
      if (!isNaN(parseFloat(coord[0])) && !isNaN(parseFloat(coord[1]))) {
        const marker = L.marker([parseFloat(coord[0]), parseFloat(coord[1])], { icon: defaultIcon }).addTo(this.map);
        marker.bindPopup(`<strong>${item.hotelName}</strong>`);
      }
    }

    for (const item of this.itineraryActivityItems) {
      const coord = item.activityLocation.coordinates;
      if (!isNaN(parseFloat(coord[0])) && !isNaN(parseFloat(coord[1]))) {
        const marker = L.marker([parseFloat(coord[0]), parseFloat(coord[1])], { icon: defaultIcon }).addTo(this.map);
        marker.bindPopup(`<strong>${item.activityName}</strong>`);
      }
    }
    

    // Initialize the routing control
this.routingControl = L.Routing.control({
  lineOptions: {
    styles: [{ color: '#00BFFF', weight: 6 }]
  } as L.Routing.LineOptions,
  showAlternatives: true,
  routeWhileDragging: true,
  waypoints: [],
  plan: L.Routing.plan([], {
    createMarker: (waypointIndex: number, waypoint: L.Routing.Waypoint, numberOfWaypoints: number) => {
      if (!waypoint) {
        return false;
      } else {
        return L.marker(waypoint.latLng, {
          draggable: true,
          icon: L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
          })
        });
      }
    }
  })
});

// Add the routing control to the map
this.routingControl.addTo(this.map);

// Set up waypoints for routing control
const accommodationCoords = this.itineraryAccommodationItems.map(item => item.hotelLocation.coordinates);
const activityCoords = this.itineraryActivityItems.map(item => item.activityLocation.coordinates);
const allCoords = accommodationCoords.concat(activityCoords);
const waypoints = allCoords.map(coord => L.latLng(coord[0], coord[1]));
this.routingControl.setWaypoints(waypoints);

// Set up click event listener to add waypoints
this.map.on('click', (event: L.LeafletMouseEvent) => {
  if (this.routingControl.getWaypoints().length < 2) {
    const waypoint: L.Routing.Waypoint = {
      latLng: event.latlng,
      name: ''
    };
    this.routingControl.spliceWaypoints(this.routingControl.getWaypoints().length, 1, waypoint);
  }
});
  }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      const userObject = JSON.parse(userJson);
      this.userId = userObject.userId;
    }
    forkJoin([
      this.api.displayItineraryAccommodation(this.userId),
      this.api.displayItineraryActivity(this.userId)
    ]).subscribe(results => {
      this.itineraryAccommodationItems = results[0];
      this.itineraryActivityItems = results[1];
      console.log(this.itineraryAccommodationItems);
      console.log(this.itineraryActivityItems);
      this.initMap();
    });
  }


  onDeleteAccommodation(hotelId: string) {
    this.api.deleteHotelId(this.userId, hotelId)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  onDeleteActivity(activityId: string) {
    this.api.deleteActivityId(this.userId, activityId)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }
  exit() {
    alert('Thank you for planning with us :)');
    this.router.navigate(['/loginas']);
  }

}