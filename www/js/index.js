/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


// Declare the main module
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngTouch'
]);
/*
myApp.controller("MenuController", function(){
    this.menu = menuItens;    
});

var menuItens = [
    {
        name: "Web Tips",
        goTo: "'/home'",
        active: false
    },
    {
        name: "HTML",
        goTo: "'/html'",
        active: false
    },
    {
        name: "CSS",
        goTo: "'/css'",
        active: false
    },
    {
        name: "APP",
        goTo: "'/app'",
        active: false
    }
]*/

// Initialize the main module    
myApp.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {

    'use strict';

    /**
     * Helper method for main page transitions. Useful for specifying a new page partial and an arbitrary transition.
     * @param  {String} path               The root-relative url for the new route
     * @param  {String} pageAnimationClass A classname defining the desired page transition
     */
    
    $rootScope.go = function (path, pageAnimationClass) {

        if (typeof(pageAnimationClass) === 'undefined') { // Use a default, your choice
            $rootScope.pageAnimationClass = 'crossFade';
        }
        
        else { // Use the specified animation
            $rootScope.pageAnimationClass = pageAnimationClass;                
        }

        if (path === 'back') { // Allow a 'back' keyword to go to previous page
            $window.history.back();
        }
        
        else { // Go to the specified path
            $location.path(path);
        }
    };
    
}]);

/*
// Siblings
myApp.directive('sibs', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                
                element.nextAll().each(function(){
                    var ngcAttrNAll = $(this).attr('ng-click');
                    //alert(ngcAttrNAll);
                    var ngcAttrSplitNAll = ngcAttrNAll.split(',');
                    var ngcAttrPartNAll = ngcAttrSplitNAll[0];
                    //alert(ngcAttrPartNAll);
                    
                    $(this).attr("ng-click","" + ngcAttrPartNAll + ", 'slideLeft'");
                });
                
                element.prevAll().each(function(){
                    var ngcAttrPAll = $(this).attr('ng-click');
                    //alert(ngcAttrPAll);
                    var ngcAttrSplitPAll = ngcAttrPAll.split(',');
                    var ngcAttrPartPAll = ngcAttrSplitPAll[0];
                    //alert(ngcAttrPartPAll);
                    
                    $(this).attr("ng-click","" + ngcAttrPartPAll + ", 'slideRight'");
                });
                
            })
        },
    }
});

function ActiveNav($scope) {
    $scope.activeItem = 'default';
}*/

// Configure the main module
myApp.config(['$routeProvider', function ($routeProvider) {

    'use strict';

    $routeProvider
        .when('/home', {
            templateUrl: 'home.html'
        })
        .when('/html', {
            templateUrl: 'html.html'
        })
        .when('/css', {
            templateUrl: 'css.html'
        })
        .when('/app', {
            templateUrl: 'app.html'
        })
        .when('/config', {
            templateUrl: 'config.html'
        })
        .otherwise({
           templateUrl: 'home.html'
        });
}]);

myApp.directive('homeFile', function(){
    return {
        restrict: 'E',
        templateUrl: 'include/home.html'
    };
});

myApp.directive('htmlFile', function(){
    return {
        restrict: 'E',
        templateUrl: 'include/html.html'
    };
});

myApp.directive('cssFile', function(){
    return {
        restrict: 'E',
        templateUrl: 'include/css.html'
    };
});

myApp.directive('appFile', function(){
    return {
        restrict: 'E',
        templateUrl: 'include/app.html'
    };
});

myApp.directive('configFile', function(){
    return {
        restrict: 'E',
        templateUrl: 'include/config.html'
    };
});

function ActiveNav($scope, $location) {

    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path || $location.path().substr(0, path.length) == 0) {
          return "active"
        } else {
          return ""
        }
    }
    
}


j(document).ready(function(){
    j('#topo [for="selectMenuTopo"]').click(function(){
        j('#topoDireito ul').toggleClass('menu-topo-active');
    });
    j('#topoDireito ul label, #topoDireito .mask-menu').click(function(){
        j('#topoDireito ul').toggleClass('menu-topo-active');
    });
    
    if (localStorage.getItem('homeAnimation') === null) {
        localStorage.homeAnimation = 'anime';
    }
    
    if (localStorage.getItem('appTema') === null) {
        localStorage.appTema = 'light';
    }
    else if (localStorage.getItem('appTema') !== null && localStorage.getItem('appTema') === 'light') {
        j('#temaDark').removeAttr('checked');
        j('#temaLight').attr('checked','checked');
        j('body').removeClass('dark');
    }
    else if (localStorage.getItem('appTema') !== null && localStorage.getItem('appTema') === 'dark') {
        j('#temaLight').removeAttr('checked');
        j('#temaDark').attr('checked','checked');
        j('body').addClass('dark');
    }
    
});