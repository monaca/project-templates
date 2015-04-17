var PROX_UNKNOWN = 'ProximityUnknown';
var PROX_FAR = 'ProximityFar';
var PROX_NEAR = 'ProximityNear';
var PROX_IMMEDIATE = 'ProximityImmediate';

var app = angular.module('myApp', ['onsen']);

app.service('iBeaconService', function() {
    this.currentBeaconUuid = null;
    this.onDetectCallback = function(){};
    
    var beacons = {
        "00000000-EA98-1001-B000-001C4D9C64FA": {icon: 'img/1.jpg', rssi: -63, proximity: PROX_UNKNOWN, name: 'JIBBER', number: '1', id: '000265C9', major: 1, minor: 1},
        "F5A10AF9-A670-4F54-B491-8607393F0DDC": {icon: 'img/2.jpg', rssi: -63, proximity: PROX_UNKNOWN, name: 'BUONO', number: '2', id: '0002D08D', major: 1, minor: 1},
        "ABE425B2-0000-4409-8035-1668AFC7FCFE": {icon: 'img/3.jpg', rssi: -63, proximity: PROX_UNKNOWN, name: 'LION', number: '3', id: '00029BAA', major: 1, minor: 1},
        "BC564E82-0000-43A3-94E7-1D54EC02622D": {icon: 'img/4.jpg', rssi: -63, proximity: PROX_UNKNOWN, name: 'COMA', number: '4', id: '0003F321', major: 1, minor: 1},
        "6F29CF85-0000-414A-A7A6-6206A2DA9773": {icon: 'img/5.jpg', rssi: -63, proximity: PROX_UNKNOWN, name: 'GNAR', number: '5', id: '00027EA8', major: 1, minor: 1},
        "EEB52632-0000-47E2-8C15-897494E12015": {icon: 'img/6.jpg', rssi: -63, proximity: PROX_UNKNOWN, name: 'TEEMO', number: '6', id: '00032449', major: 1, minor: 1}
    };
    this.beacons = beacons;
    
    createBeacons = function() {
        var result = [];
        try {
            angular.forEach(beacons, function(value, key) {
                result.push(new cordova.plugins.locationManager.BeaconRegion(value.id, key, value.major, value.minor));
            });
        } catch (e) {
            console.log('createBeacon err: ' + e);
        }
        return result;
    };
    
    this.watchBeacons = function(callback){
        document.addEventListener("deviceready", function(){
            var beacons = createBeacons();
            
            try {    
                var delegate = new cordova.plugins.locationManager.Delegate();

                delegate.didDetermineStateForRegion = function (pluginResult) {
                
                    console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
                
                    cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                        + JSON.stringify(pluginResult));
                };
                
                delegate.didStartMonitoringForRegion = function (pluginResult) {
                    console.log('didStartMonitoringForRegion:', pluginResult);
                
                    console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
                };
                
                delegate.didRangeBeaconsInRegion = function (pluginResult) {
                    var beaconData = pluginResult.beacons[0];
                    var uuid = pluginResult.region.uuid.toUpperCase();
                    if (!beaconData || !uuid) {
                        return;
                    }
                    
                    callback(beaconData, uuid);
                    console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
                };
                
                cordova.plugins.locationManager.setDelegate(delegate);
                
                // required in iOS 8+
                cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
                // or cordova.plugins.locationManager.requestAlwaysAuthorization()
                
                beacons.forEach(function(beacon) {
                    cordova.plugins.locationManager.startRangingBeaconsInRegion(beacon);
                });
                
            } catch (e) {
                console.log('Delegate err: ' + e);   
            }
        }, false);
    };
});

app.controller('InfoPageCtrl', ['$scope', 'iBeaconService', function($scope, iBeaconService) {
    $scope.beacon = iBeaconService.beacons[iBeaconService.currentBeaconUuid];
    $scope.beaconUuid = iBeaconService.currentBeaconUuid;
}]);

app.controller('TopPageCtrl', ['$scope', 'iBeaconService', function($scope, iBeaconService) {        
    
    $scope.beacons = iBeaconService.beacons;
    
    var callback = function(deviceData, uuid)
    {
        var beacon = $scope.beacons[uuid];
        $scope.$apply(function()
        {
            beacon.rssi = deviceData.rssi;
            switch (deviceData.proximity)
            {
                case PROX_IMMEDIATE:
                    beacon.proximity = 'Immediate';
                    break;
                case PROX_NEAR:
                    beacon.proximity = 'Near';
                    break;
                case PROX_FAR:
                    beacon.proximity = 'Far';
                    break;
                case PROX_UNKNOWN:
                default:
                    break;
            }

            if (iBeaconService.currentBeaconUuid === null && beacon.rssi > -45) {
                $scope.enterInfoPage(uuid);
            }
        });
    };
    iBeaconService.watchBeacons(callback);

    
    $scope.enterInfoPage = function(currentUuid) {
        iBeaconService.currentBeaconUuid = currentUuid;
        $scope.ons.navigator.pushPage('info-page.html');
        $scope.ons.navigator.on("prepop", function() {
        	iBeaconService.currentBeaconUuid = null;
        });
    };
    
}]);

