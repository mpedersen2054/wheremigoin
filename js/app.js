(function($, document, window) {
    
var loc1 = ['141 W Jackson Blvd', 'Chicago', 'IL', '60604']

var CLIENT = CLIENT || {

    init: function(address) {
        CLIENT.street = address[0];
        CLIENT.city = address[1];
        CLIENT.state = address[2];
        CLIENT.zip = address[3];
        var addr = address;

        // turn events on
        EVENTS.insertStateData();
        EVENTS.searchDropdown();
        EVENTS.searchFormSub();

        CLIENT.getCords(addr);
    },

    getCords: function(address) { // from google maps api
        var key = 'AIzaSyAYrG38he5q3MzcsxyAYC_uWsSFy5SSG7w',
            url = '';

        url+='https://maps.googleapis.com/maps/api/geocode/json';
        url+='?address='+address[0].split(' ').join('+');
        url+=',+'+address[1].split(' ').join('+');
        url+=',+'+address[2];
        url+='&key='+key;

        $.getJSON(url, function(data) {
            var lat = data.results[0].geometry.location.lat,
                lng = data.results[0].geometry.location.lng,
                cords = [lat, lng];

            updateJumbotron();
            CLIENT.requestWeather(cords);
            CLIENT.requestDemographics(cords);

            function updateJumbotron() {
                var imgUrl = '<img src="https://maps.googleapis.com/maps/api/staticmap?center='+lat+','+lng+'&zoom=11&size=1600x1200" width="940px" height="560px">',
                    $locImg = $('.loc-img');

                $locImg.find('img').remove();
                $('.loc-img-title').html('').append('<a href="#">'+CLIENT.city+'</a>');
                $locImg.append(imgUrl);
            }
        })
    },

    requestWeather: function(cords) {
        var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=7&mode=json';

        $.getJSON(url, function(data) {
            insertWeather(data);
        });

        function insertWeather(weatherData) {
            var d = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
                todaysDate = new Date().getUTCDay(),
                dayToEndWeek = d.splice(todaysDate, d.length);
                days = dayToEndWeek.concat(d),
                i = 0;

            for ( ; i < 7; i++) {
                console.log(days[i]);
            }

            console.log(days)
            console.log(weatherData);
        }
    },

    requestDemographics: function(cords) {
        var lat = cords[0],
            lng = cords[1],
            url = 'http://www.broadbandmap.gov/broadbandmap/demographic/2012/coordinates?callback=?';

        var params = {
            latitude: lat,
            longitude: lng,
            format: 'jsonp'
        }

        $.getJSON(url, params, function(data) {
            insertDemo(data.Results)
        })

        function insertDemo(results) {
            var college = round('educationBachelorOrGreater'),
                hschool = round('educationHighSchoolGraduate'),
                medianIncome = results['medianIncome'],
                incomeBelowPov = round('incomeBelowPoverty'),
                incomeLessThan25 = round('incomeLessThan25'),
                income25t50 = round('incomeBetween25to50'),
                income50t100 = round('incomeBetween50to100'),
                income100t200 = round('incomeBetween100to200');

            function round(resultsProp) { // takes the prop and gets %
                return Math.round(results[resultsProp] * 100)
            }

            $('.gc').text(college + '%');
            $('.ghs').text(hschool + '%');
            $('.median').text('$' + medianIncome);
            $('.ibp').text(incomeBelowPov + '%');
            $('.ilt25').text(incomeLessThan25 + '%');
            $('.i25-50').text(income25t50 + '%');
            $('.i50-100').text(income50t100 + '%');
            $('.i100-200').text(income100t200 + '%');
        }
    }
}

var EVENTS = EVENTS || {
    insertStateData: function() {
        var stateInp = $('#state-input'),
            stateData = usStateData(); // from loc_form_data.js
        stateInp.append(stateData);
    },
    searchDropdown: function() {
        $('a.search').on('click', function(event) {
            $('.top-nav').css('margin-top', '0');
        })
    },
    searchFormSub: function() {
        $('#location-form').on('submit', function(event) {
            event.preventDefault();
            var street = $('#street-input').val(),
                city = $('#city-input').val(),
                state = $('#state-input').val(),
                zip = $('#zip-input').val(),
                address = [street,city,state,zip];
            CLIENT.init(address);
        })
    }
}

CLIENT.init(loc1);

})(jQuery, document, window);