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
                    lng = data.results[0].geometry.location.lng,
                    cords = [lat, lng];

                // CLIENT.requestLqi(cords)
                CLIENT.requestDemographics(cords)
            })
        },

        requestLqi: function(cords) {
        },

        // http://www.broadbandmap.gov/broadbandmap/demographic/2012/coordinates?latitude=42.456&longitude=-74.987&format=json
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
                insertData(data.Results)
            })

            function insertData(results) {
                console.log(results)
                var college = round('educationBachelorOrGreater'),
                    hschool = round('educationHighSchoolGraduate'),
                    medianIncome = results['medianIncome'],
                    incomeBelowPov = round('incomeBelowPoverty'),
                    incomeLessThan25 = round('incomeLessThan25'),
                    income25t50 = round('incomeBetween25to50'),
                    income50t100 = round('incomeBetween50to100'),
                    income100t200 = round('incomeBetween100to200')

                function round(resultsProp) {
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
    
    CLIENT.init(loc1)

})();