$(function() {

    $('a.search').on('click', function(event) {
        event.preventDefault();
        var street = $('#street-input'),
            city = $('#city-input'),
            state = $('#state-input'),
            zip = $('#zip-input'),
            address = [street,city,state,zip]

        $('.top-nav').css('margin-top', '0')

        CLIENT.init(address)
    });
    
    var loc1 = ['1331 W Windhill Dr', 'Palatine', 'IL', '60067']

    var CLIENT = CLIENT || {

        init: function(address) {
            CLIENT.street = address[0];
            CLIENT.city = address[1];
            CLIENT.state = address[2];
            CLIENT.zip = address[3];
            var addr = address;

            CLIENT.getCords(addr)
        },

        getCords: function(address) {
            var key = 'AIzaSyAYrG38he5q3MzcsxyAYC_uWsSFy5SSG7w',
            url = '';

            url+='https://maps.googleapis.com/maps/api/geocode/json';
            url+='?address='+address[0].split(' ').join('+');
            url+=',+'+address[1].split(' ').join('+');
            url+=',+'+address[2];
            url+='&key='+key;

            console.log(url)


            $.getJSON(url, function(data) {
                var lat = data.results[0].geometry.location.lat,
                    lng = data.results[0].geometry.location.lng

                var cords = [lat, lng];
                // console.log(cords)
                CLIENT.setCords(cords)
            })
        },

        setCords: function(cords) {
            console.log(cords[1])
            CLIENT.cords = cords;
        }

    }

    
    CLIENT.init(loc1)
    console.log(CLIENT.cords)
    

    function locationObj(addr,city,state,zip) {
        this.addr = addr;
        this.city = city;
        this.state = state;
        this.zip = zip;

        // ?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=KEY
        // https://maps.googleapis.com/maps/api/geocode/json?address=1331+W+Windhill+Dr,+Palatine+Area,+IL
        

        // console.log(locLat)

    }

})();