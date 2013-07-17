var extend, namespace;

namespace = function (name) {
    var currentSpace, parts = name.split('.');

    currentSpace = window;
    for(var i=0; i < parts.length; i++){
        partName = parts[i];
        currentSpace[partName] = currentSpace[partName] || {};
        currentSpace = currentSpace[partName];
    }

    return currentSpace;
};

passenger = namespace('Vehicle.Passenger');

passenger.Car = (function () {
    function Car(make, model) {
        this.make =  make;
        this.model =  model;

        var checkOilLife = function () {
            return 80; //just hard code to 80%
        };

        this.isServiceRequired = function () {
            return checkOilLife() < 20; //service required if oil life is below 20%
        };
    }

    Car.prototype.start = function () {
        console.log(' Started....' + this.model);
    };

    Car.prototype.stop = function () {
        console.log(' Stopped....' + this.model);
    };

    Car.wheelCount = 4;

    Car.isValidVIN = function (vin) {
        return vin !== null && vin.length === 17;
    };

    return Car;
}());

extend = function (sub, base) {
    var property, Proxy;

    for (property in base) {
        if (base.hasOwnProperty(property)) {
            sub[property] = base[property];
        }
    }

    Proxy = function () {};
    Proxy.prototype = base.prototype;
    sub.prototype = new Proxy();
    sub.prototype.constructor = sub;
    sub.base = base.prototype;
};

passenger.SportsCar = (function () {
    extend(SportsCar, passenger.Car);
    function SportsCar() {
        return SportsCar.base.constructor.apply(this, arguments);
    };

    SportsCar.prototype.bounce = function () {
        console.log("Bouncing...." + this.model);
    };
    return SportsCar;
}());