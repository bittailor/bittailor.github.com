function Sensor(index, feedId) {
    var self = this;
    self.index = index;
    self.feedId = feedId;
    self.Humidity = ko.observable("...");
    self.Temperature = ko.observable("...");
    self.connection_uptime = ko.observable("...");
    self.reconnect_counter = ko.observable("...");
    self.uptime = ko.observable("...");
    self.last_update = ko.observable("...");
    self.ticker = ko.observable("...");

    self.update = function(data) {
        this.last_update(new Date(data.updated));
        $.each(data.datastreams, function(i,datastream) {
            self[datastream.id](datastream.current_value);
        });
        self.tick();
    };

    self.tick = function() {
        var now = new Date();
        var diff = (Math.abs(now - this.last_update()) / 1000)|0;
        this.ticker(diff);
    };

}

function ViewModel() {
    var self = this;
    self.sensors = ko.observableArray([
        new Sensor(1,1799984576),
        new Sensor(2,266417220)
    ]);

    self.tick = function() {
        $.each(viewModel.sensors(), function(i,sensor) {
            sensor.tick();
        });
    }
}

var viewModel = new ViewModel();

$(document).ready(function($) {

    xively.setKey( "BDgqbLdOcS8sprrRUxaQSWmgumjWFYh6WptXDYlg2QyXy1Xe" );
    var updates = []

    $.each(viewModel.sensors(), function(i,sensor) {
        xively.feed.get (sensor.feedId, function ( data ) {
            sensor.update(data);
            xively.feed.subscribe(sensor.feedId, function ( event , data_updated ) {
                sensor.update(data_updated);
            });
        });
    });

    window.setInterval(function(){
        viewModel.tick();
    }, 1000);

    window.focus(function(){
        viewModel.tick();
    });

});

function pretty_print_milliseconds(duration) {
    if (isNaN(duration)) return duration;

    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    var result = ""

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
