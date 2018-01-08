import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationDataProvider } from "../../providers/location-data/location-data";

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
  providers: [LocationDataProvider]
})
export class LocationsPage {

  public locations: Array<any> = LocationDataProvider.locationData;

  constructor(
    public navCtrl: NavController,
    private locationData: LocationDataProvider
  ) {}

  public goToSection = (location)=> {
    this.navCtrl.push('SectionsPage', {
      'locationId': location.locationId
    })
  };

  ionViewWillEnter() {
    this.locations = this.locationData.getAllLocations();
  }

}
