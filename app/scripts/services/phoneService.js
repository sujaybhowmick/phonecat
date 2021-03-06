/**
 * Created with JetBrains WebStorm.
 * User: sujay
 * Date: 5/28/13
 * Time: 4:12 PM
 * To change this template use File | Settings | File Templates.
 */
define(['services/services', 'properties'],
    function(services, properties){
        'use strict';
        services.factory('Phone', ['$resource',
            function($resource){
                return $resource(properties.restUrl + '/collections/phone/:id', {id: '@id', apiKey: properties.apiKey});
            }]);
        services.factory('PhoneDetail', ['$resource',
            function($resource){
                return $resource(properties.restUrl + '/collections/phoneDetail/:id', {apiKey: properties.apiKey});
            }]);

        services.factory('PhoneListLoader', ['Phone', '$q',
            function(Phone, $q){
                return function(){
                    var delay = $q.defer();
                    Phone.query(function(phones){
                        delay.resolve(phones);
                    }, function(){
                        delay.reject('Unable to load phone list')

                    }, {isArray: true});
                    return delay.promise;
                }

            }]);
        services.factory('PhoneLoader', ['PhoneDetail', '$route','$q',
                function(PhoneDetail, $route, $q){
                    return function(){
                        var delay = $q.defer();
                        PhoneDetail.get({id:$route.current.params.id, isArray: false}, function(phone){
                            delay.resolve(phone.details);

                        }, function(){
                            delay.reject('Unable to load Phone');
                        });
                        return delay.promise;
                    }
                }
            ]);
    });
