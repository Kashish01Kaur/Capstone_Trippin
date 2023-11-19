import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/shared/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
interface Review {
  reviewDescription: string;
  rating: number;
}

interface Activity {
  activityName: string;
  activityDescription: string;
  activityImage: string;
  reviews: Review[];
  showReviewsPopup?: boolean;
}
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
searchText = '';
mypackageId:any;
// item:any;
myActivities:any[] = [];
searchedResults: any[] = [];
Id:any;
// myItem:any;
constructor(private route :ActivatedRoute,private packages:ApiService,private fb: FormBuilder){

}
ngOnInit(){
  this.mypackageId=this.route.snapshot.params['packageId'];
  this.packages.getPackagesById(this.mypackageId).subscribe((res)=>{
    console.log(res);
     
    this.myActivities = res.activities;
    console.log(this.myActivities);
  });
  const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      const userObject = JSON.parse(userJson);
      this.Id = userObject.userId;
      console.log(this.Id);
    }
}
search(): void {

  if (this.searchText.trim() === '') {
    this.searchedResults = this.myActivities;
  } else {
    this.searchedResults = this.myActivities.filter((pkg) => {
      const activity = pkg.activityName.toLowerCase().trim();
      const search = this.searchText.toLowerCase().trim();
      return activity.includes(search) ;
    });
  }
}

addActivityToItinerary(item:any){
this.packages.addActivityToItinerary(this.Id, item)
      .subscribe(
        response => {
          console.log(response);
          alert('Activity added to Itinerary');
        },
      );
}
  
  // Method to display the reviews popup
  showReviews(pkg: Activity) {
    pkg.showReviewsPopup = true;
  }

  // Method to hide the reviews popup
  hideReviews(pkg: Activity) {
    pkg.showReviewsPopup = false;
  }
}
