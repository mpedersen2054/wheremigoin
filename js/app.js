$(function() {

    var loc1 = new locationObj('1331 W. Windhill Dr.',
                               'Palatine',
                               'IL',
                               '60067');

    loc1.getCords()
    

    function locationObj(addr,city,state,zip) {
        this.addr = addr;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.lat = ;
        this.long = ;

        // ?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=KEY
        this.getCords = function() {
            var url =
        }
    }

})();