webpackJsonp([3],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/locations/locations.module": [
		273,
		2
	],
	"../pages/sections/sections.module": [
		274,
		1
	],
	"../pages/splash/splash.module": [
		275,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 150;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_mqtt_mqttws31__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_mqtt_mqttws31___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_mqtt_mqttws31__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LocationDataProvider = (function () {
    function LocationDataProvider(http, appRef) {
        this.http = http;
        this.appRef = appRef;
        this.getAllLocations = function () {
            return LocationDataProvider_1.locationData.locations;
        };
        this.getLocationById = function (locationId) {
            var index = LocationDataProvider_1.locationData.locations.findIndex(function (location) { return location.locationId == locationId; });
            return LocationDataProvider_1.locationData.locations[index];
        };
        this.getWorkRoomTables = function (workRoomId) {
            console.log('Searching for work room with id: ' + workRoomId);
            var result = [];
            LocationDataProvider_1.locationData.locations.forEach(function (location, index) {
                console.log('Current location' + JSON.stringify(location));
                var roomIndex = location.workRooms.findIndex(function (workroom) { return workroom.roomId = workRoomId; });
                result = LocationDataProvider_1.locationData.locations[index].workRooms[roomIndex].tables;
            });
            return result;
        };
        this.calcTablesInUse = function (workRoom) {
            LocationDataProvider_1.locationData.locations.forEach(function (location) { });
            return workRoom.tables.filter(function (table) { return table.inUse == false; }).length;
        };
        this.http.get('http://192.168.1.7/location.json').toPromise()
            .then(function (resp) {
            console.log('Recieved response', resp.json());
            LocationDataProvider_1.locationData = resp.json();
        })
            .catch(function (err) {
            console.error('Recieved request err ', err);
        });
        this._client = new __WEBPACK_IMPORTED_MODULE_2_ng2_mqtt_mqttws31__["Paho"].MQTT.Client('192.168.1.7', 61614, '', '');
        this._client.onConnectionLost = function (responseObject) {
            console.log('Connection lost.');
        };
        this._client.onMessageArrived = function (message) {
            LocationDataProvider_1.locationData.increment++;
            console.log('Message arrived.');
            var payload = JSON.parse(message.payloadString);
            console.log(payload);
            console.log('Searching for work- or meeting rooms with associated with device id: ' + payload.deviceId);
            // TODO: make a less shitty search function
            LocationDataProvider_1.locationData.locations.forEach(function (location) {
                // Meeting rooms
                for (var i = 0; i < location.meetingRooms.length; i++) {
                    if (location.meetingRooms[i].deviceId == payload.deviceId) {
                        location.meetingRooms[i].inUse = payload.inUse;
                        break;
                    }
                }
                // Workrooms w. tables
                for (var i = 0; i < location.workRooms.length; i++) {
                    for (var j = 0; j < location.workRooms[i].tables.length; j++) {
                        if (location.workRooms[i].tables[j].deviceId == payload.deviceId) {
                            location.workRooms[i].tables[j].inUse = payload.inUse;
                            break;
                        }
                    }
                }
            });
            // Force change detection
            LocationDataProvider_1.locationData = JSON.parse(JSON.stringify(LocationDataProvider_1.locationData));
            console.log(LocationDataProvider_1.locationData);
        };
        this._client.connect({ onSuccess: this.onConnected.bind(this) });
    }
    LocationDataProvider_1 = LocationDataProvider;
    LocationDataProvider.prototype.onConnected = function () {
        console.log('Connected to broker.');
        this._client.subscribe('sts/#', {});
    };
    LocationDataProvider.prototype.getIncrement = function () {
        return LocationDataProvider_1.locationData.increment;
    };
    LocationDataProvider.prototype.getWorkRoomsFromLocation = function (locationId) {
        var i = LocationDataProvider_1.locationData.locations.findIndex(function (location) { return location.locationId == 0; });
        console.log('FOUND ID' + i + ' requested ID: ' + locationId);
        return LocationDataProvider_1.locationData.locations[i].workRooms;
    };
    LocationDataProvider.locationData = {
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
            }
        ]
    };
    LocationDataProvider = LocationDataProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* ApplicationRef */]])
    ], LocationDataProvider);
    return LocationDataProvider;
    var LocationDataProvider_1;
}());

//# sourceMappingURL=location-data.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(220);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_location_data_location_data__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/locations/locations.module#LocationsPageModule', name: 'LocationsPage', segment: 'locations', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sections/sections.module#SectionsPageModule', name: 'SectionsPage', segment: 'afdeling/:locationId', priority: 'low', defaultHistory: ['LocationsPage'] },
                        { loadChildren: '../pages/splash/splash.module#SplashPageModule', name: 'SplashPage', segment: 'splash', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__providers_location_data_location_data__["a" /* LocationDataProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, config) {
        var _this = this;
        this.rootPage = 'SplashPage';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            setTimeout(function () {
                _this.rootPage = 'LocationsPage';
            }, 2000);
        });
        config.set('mode', 'ios');
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]) === "function" && _a || Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/younderboy/IdeaProjects/sharespace/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/younderboy/IdeaProjects/sharespace/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Config */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Config */]) === "function" && _e || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map