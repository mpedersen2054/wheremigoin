$(function() {

    var loc1 = new locationObj('1331 W Windhill Dr',
                               'Palatine',
                               'IL',
                               '60067');

    loc1.getCords()
    

    function locationObj(addr,city,state,zip) {
        this.addr = addr;
        this.city = city;
        this.state = state;
        this.zip = zip;
        // this.lat = ;
        // this.long = ;

        // ?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=KEY
        // https://maps.googleapis.com/maps/api/geocode/json?address=1331+W+Windhill+Dr,+Palatine+Area,+IL
        this.getCords = function() {
            var key = 'AIzaSyAYrG38he5q3MzcsxyAYC_uWsSFy5SSG7w',
                url = '';

            url+='https://maps.googleapis.com/maps/api/geocode/json';
            url+='?address='+this.addr.split(' ').join('+');
            url+=',+'+this.city.split(' ').join('+');
            url+=',+'+this.state;
            url+='&key='+key;

            console.log(url)
        }
    }

})();