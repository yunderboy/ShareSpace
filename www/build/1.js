webpackJsonp([1],{

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SectionsPageModule", function() { return SectionsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sections__ = __webpack_require__(277);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SectionsPageModule = (function () {
    function SectionsPageModule() {
    }
    SectionsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__sections__["a" /* SectionsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sections__["a" /* SectionsPage */]),
            ],
        })
    ], SectionsPageModule);
    return SectionsPageModule;
}());

//# sourceMappingURL=sections.module.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SectionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_location_data_location_data__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SectionsPage = (function () {
    function SectionsPage(navCtrl, navParams, locationData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.locationData = locationData;
        this.locationType = 'offices';
        this.currentLocation = {};
        this.increments = 0;
        this.calcTablesInUse = function (workRoom) {
            console.log('Work room:', workRoom);
            console.log('Free tables: ', workRoom.tables.filter(function (table) { return table.inUse == false; }));
            return workRoom.tables.filter(function (table) { return table.inUse == false; }).length;
        };
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
    SectionsPage.prototype.goToWorkRoom = function (workRoomId) {
        console.log('Going to work room');
        this.navCtrl.push('WorkRoomPage', {
            'workRoomId': workRoomId
        });
    };
    SectionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sections',template:/*ion-inline-start:"/home/younderboy/IdeaProjects/sharespace/src/pages/sections/sections.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title *ngIf="currentLocation.label">{{currentLocation.label}}</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top no-border-bottom>\n    <ion-segment [(ngModel)]="locationType">\n      <ion-segment-button value="offices">\n        Kontorer\n      </ion-segment-button>\n      <ion-segment-button value="meetingRooms">\n        Mødelokaler\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div *ngIf="currentLocation">\n\n    <div [ngSwitch]="locationType">\n      <ion-list *ngSwitchCase="\'offices\'">\n        <ion-list-header>\n          Kontorer\n        </ion-list-header>\n\n\n        <ion-item *ngFor="let workRoom of locationData.getWorkRoomsFromLocation(locationId)">\n          {{workRoom.alias}}\n          <ion-note item-end>\n            Ledige pladser: {{ calcTablesInUse(workRoom) }}\n          </ion-note>\n        </ion-item>\n\n      </ion-list>\n\n      <ion-list *ngSwitchCase="\'meetingRooms\'">\n        <ion-list-header>\n          Mødelokaler\n        </ion-list-header>\n\n        <ion-item *ngFor="let meetingRoom of currentLocation.meetingRooms">\n          {{meetingRoom.alias}}\n        </ion-item>\n\n      </ion-list>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/younderboy/IdeaProjects/sharespace/src/pages/sections/sections.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_location_data_location_data__["a" /* LocationDataProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_location_data_location_data__["a" /* LocationDataProvider */]])
    ], SectionsPage);
    return SectionsPage;
}());

//# sourceMappingURL=sections.js.map

/***/ })

});
//# sourceMappingURL=1.js.map