var httpInterceptor = function ($q) {

  return {
    request: function (config) {
      console.info("HTTP REQUEST INTERCEPTED");
      // Add the custom header to each request
      config.headers['CustomHeader'] = 'CustomHeaderValue';
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      console.log("hedaderssss======", config.headers);
      return config;
    },
    requestError: function (rejection) {
      return $q.reject(rejection);
    },
    response: function (result) {
      return result;
    },
    responseError: function (response) {
      return $q.reject(response);
    }
  }
}


myApp = angular.module('myApp', []);

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push(httpInterceptor);
});

myApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {
  $http.get('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
      $scope.posts = response.data;
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}])

