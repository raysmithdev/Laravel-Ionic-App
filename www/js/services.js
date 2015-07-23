angular.module('starter.services', [])


.factory('ajax', function($http) {

    return {

        get : function(url) {

            return $http.get(url);

        },

        post : function(data, url) {

            return $http({
                method: 'POST',
                url: url,
                // headers: { 'Content-Type' : 'application/x-www-form-urlencoded', 'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content') },
                data: data
            });
        },

    }
});
