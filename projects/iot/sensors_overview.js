function Sensor(id) {
    var self = this;
    self.id = id;
    self.Humidity = ko.observable("...");
    self.Temperature = ko.observable("...");
    self.connection_uptime = ko.observable("...");
    self.reconnect_counter = ko.observable("...");
    self.uptime = ko.observable("...");
    self.last_update = ko.observable("...");
    self.ticker = ko.observable("...");

    self.update = function(data) {
        this.last_update(new Date(data.timestamp));
        for (var prop in data) {
            if (self[prop]) {
                self[prop](data[prop]);
            }
        }
        self.tick();
    };

    self.tick = function() {
        var now = new Date();
        var diff = (Math.abs(now - this.last_update()) / 1000)|0;
        this.ticker(diff);
    };

    self.line_decoration = ko.computed(function() {
        if (self.ticker() > 600) return 'danger'
        if (self.ticker() > 120) return 'warning';
        return "success";
    }, self);

}

function ViewModel() {
    var self = this;

    self.graphs = [ { id : "15134" }, { id : "15135" }, { id : "15136" }  ];



    self.days = ko.observable("1");

    self.averages = ["0", "10", "15", "20", "30", "60", "240", "720", "1440", "daily"]
    self.average = ko.observable("10");


    self.sensors = ko.observableArray();

    self.tick = function() {
        $.each(viewModel.sensors(), function(i,sensor) {
            sensor.tick();
        });
    }

    self.update = function() {
        $.getJSON("http://bittailor.cloudapp.net/nodes/sensor?id=all&callback=?")
           .done(function (data) {
               var ids = [];
               $.each(data.sensors, function(i,sensor_data) {
                   ids.push(sensor_data.sensor_id);
                   var sensors = $.grep(self.sensors(), function(sensor,index){
                       return sensor.id == sensor_data.sensor_id;
                   });
                   if (sensors.length == 0){
                       sensor  = new Sensor(sensor_data.sensor_id)
                       sensor.update(sensor_data);
                       self.sensors.push(sensor);
                   } else {
                       sensors[0].update(sensor_data);
                   }
               });
               self.sensors.remove(function(sensor){
                   return ids.indexOf(sensor.id) == -1;
               });
               self.sensors.sort();
           })
           .fail(function( jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
           });


        ;
    }
}


var viewModel = new ViewModel();

$(document).ready(function($) {

    viewModel.update();

    window.setInterval(function(){
        viewModel.update();
    }, 5000);

    window.setInterval(function(){
        viewModel.tick();
    }, 1000);

});

function pretty_print_seconds(duration) {
    if (isNaN(duration)) return duration;

    var   seconds = parseInt(duration%60)
        , minutes = parseInt((duration/60)%60)
        , hours = parseInt((duration/(60*60))%24)
        , days = parseInt(duration/(60*60*24));

    var result = "";

    if(days > 0) {
        return days + "d " + hours + "h " + minutes + "m " + seconds + "s " ;
    }

    if(hours > 0) {
        return hours + "h " + minutes + "m " + seconds + "s ";
    }

    if(minutes > 0) {
        return minutes + "m " + seconds + "s ";
    }

    return seconds + "s ";

}

function pretty_print_milliseconds(duration) {
    if (isNaN(duration)) return duration;

    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24)
        , days = parseInt(duration/(1000*60*60*24));

    var result = "";

    if(days > 0) {
        return days + "d " + hours + "h " + minutes + "m " + seconds + "s " + milliseconds + "ms";
    }

    if(hours > 0) {
        return hours + "h " + minutes + "m " + seconds + "s " + milliseconds + "ms";
    }

    if(minutes > 0) {
        return minutes + "m " + seconds + "s " + milliseconds + "ms";
    }

    if(seconds > 0) {
        return seconds + "s " + milliseconds + "ms";
    }

    return milliseconds + "ms";
}


ko.applyBindings(viewModel);
