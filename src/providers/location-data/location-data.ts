import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Paho} from 'ng2-mqtt/mqttws31';
import { ApplicationRef } from '@angular/core';

@Injectable()
export class LocationDataProvider {

  private _client: Paho.MQTT.Client;

  public static locationData: any = {
    "locations": [
      {
        "locationId": 0,
        "alias": "AL",
        "label": "Allerød",
        "description": "Allerød",
        "workRooms": [
          {
            "roomId": 0,
            "alias": "D1330",
            "tables": [
              {
                "tableId": 0,
                "deviceId": "c41405",
                "inUse": false,
                "label": "Lols"
              },
              {
                "tableId": 1,
                "label": "Chefens skrivebord",
                "deviceId": "36216c",
                "inUse": false
              },
              {
                "tableId": 2,
                "label": "lel",
                "deviceId": "675f9",
                "inUse": false
              }
            ]
          }
        ],
        "meetingRooms": [
          {
            "roomId": 1,
            "alias": "AL015",
            "inUse": false
          }
        ]
      },
      {
        "locationId": 1,
        "alias": "HL",
        "label": "Hillerød",
        "description": "Hillerød",
        "workRooms": [
          {
            "roomId": 2,
            "alias": "Far er en nisse",
            "tables": [
              {
                "tableId": 4,
                "deviceId": "c41405",
                "inUse": false,
                "label": "Lols"
              },
              {
                "tableId": 5,
                "label": "Chefens skrivebord",
                "deviceId": "36216c",
                "inUse": false
              },
              {
                "tableId": 6,
                "label": "lel",
                "deviceId": "675f9",
                "inUse": false
              }
            ]
          }
        ],
        "meetingRooms": [
          {
            "roomId": 4,
            "alias": "HL01",
            "inUse": false
          }
        ]
      }
    ]
  };

  constructor(
    private http: Http,
    private appRef: ApplicationRef
  ){

    this.http.get('http://192.168.1.7/location.json').toPromise()
      .then((resp) => {
        console.log('Recieved response', resp.json());
        LocationDataProvider.locationData = resp.json();
      })
      .catch((err) => {
        console.error('Recieved request err ', err);
      });

    this._client = new Paho.MQTT.Client('192.168.1.7', 61614, '', '');

    this._client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.');
    };

    this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
      LocationDataProvider.locationData.increment++;

      console.log('Message arrived.');
      const payload = JSON.parse(message.payloadString);
      console.log(payload);
      console.log('Searching for work- or meeting rooms with associated with device id: ' + payload.deviceId);

      // TODO: make a less shitty search function
      LocationDataProvider.locationData.locations.forEach(location => {

        // Meeting rooms
        for (let i = 0; i < location.meetingRooms.length; i++) {
          if (location.meetingRooms[i].deviceId == payload.deviceId) {
            location.meetingRooms[i].inUse = payload.inUse;
            break
          }
        }

        // Workrooms w. tables
        for (let i = 0; i < location.workRooms.length; i++) {
          for (let j = 0; j < location.workRooms[i].tables.length; j++) {

            if (location.workRooms[i].tables[j].deviceId == payload.deviceId) {
              location.workRooms[i].tables[j].inUse = payload.inUse;
              break
            }
          }
        }
      });

      // Force change detection
      LocationDataProvider.locationData = JSON.parse(JSON.stringify(LocationDataProvider.locationData));
      console.log(LocationDataProvider.locationData);
    };

    this._client.connect({ onSuccess: this.onConnected.bind(this) });

  }

  private onConnected():void {
    console.log('Connected to broker.');
    this._client.subscribe('sts/#', {});
  }


  public getAllLocations = (): Array<any> => {
      return LocationDataProvider.locationData.locations;
  };

  public getLocationById = (locationId: number): any => {
    const index = LocationDataProvider.locationData.locations.findIndex(location => location.locationId == locationId);
    return LocationDataProvider.locationData.locations[index];
  };

  public getWorkRoomTables = (workRoomId: number): Array<any> => {
    console.log('Searching for work room with id: ' + workRoomId);

    let result = [];
    LocationDataProvider.locationData.locations.forEach((location, index) => {
      console.log('Current location' + JSON.stringify(location));
      let roomIndex = location.workRooms.findIndex(workroom => workroom.roomId = workRoomId);
      result = LocationDataProvider.locationData.locations[index].workRooms[roomIndex].tables;
    });
    return result

  };

  public getIncrement() {
    return LocationDataProvider.locationData.increment;
  }

  public getWorkRoomsFromLocation(locationId) {
    const index = LocationDataProvider.locationData.locations.findIndex(location => location.locationId == locationId);
    console.log('FOUND ID ' + index + ' requested ID: ' + locationId);
    return LocationDataProvider.locationData.locations[index].workRooms;
  }

  public calcTablesInUse = (workRoom: any): number => {
    LocationDataProvider.locationData.locations.forEach(location => {});

    return workRoom.tables.filter(table => table.inUse == false).length;
  }
}
