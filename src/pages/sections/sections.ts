import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationDataProvider } from "../../providers/location-data/location-data";

@IonicPage({
  segment: 'afdeling/:locationId',
  defaultHistory: ['LocationsPage']
})
@Component({
  selector: 'page-sections',
  templateUrl: 'sections.html',
  providers: [LocationDataProvider]
})
export class SectionsPage {

  public locationId: any;
  public locationType: string = 'offices';
  public currentLocation: any = {};
  public increments = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public locationData: LocationDataProvider) {

      this.locationId = this.navParams.get('locationId');
      console.log('Current location id', this.locationId);
      this.currentLocation = this.locationData.getLocationById(this.locationId);
      console.log(this.currentLocation);
  }

  /*
  ionViewWillEnter() {
    this.locationId = this.navParams.get('locationId');
    console.log('Current location id', this.locationId);
    this.currentLocation = this.locationData.getLocationById(this.locationId);
    console.log(this.currentLocation);
  }*/

  public goToWorkRoom(workRoomId: number) {
    console.log('Going to work room');
    this.navCtrl.push('WorkRoomPage', {
      'workRoomId': workRoomId
    });
  }

  public calcTablesInUse = (workRoom: any): number => {
    console.log('Work room:', workRoom);
    console.log('Free tables: ', workRoom.tables.filter((table) => table.inUse == false ));
    return workRoom.tables.filter((table) => table.inUse == false ).length;
  };
}
