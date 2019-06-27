$(() => {
})

const {dialog} = require('electron').remote
const fs = require('fs')
const homedir = require('os').homedir();

// const reporter = require('./reporter')

// this function load modules, but you can use any times you edit the module in live.. this function no save the module's cache 
// because delete all the module and recharge it.
function requireUncached(module){
  delete require.cache[require.resolve(module)]
  return require(module)
}

var app = angular.module('app', []);

app.controller('ctrl', function($scope){
  $scope.dStart = null;
  $scope.dStop = null;
  $scope.data = [];

  $scope.start = function(){
    if($scope.dStart != null){
      return
    }

    var start = new Date();
    $scope.txtStart = start.getHours()+":"+start.getMinutes()+":"+start.getSeconds();
    $scope.dStart = start;
  }

  $scope.stop = function(){
    if($scope.dStart == null){
      return
    }

    var stop = new Date();
    $scope.txtStop = stop.getHours()+":"+stop.getMinutes()+":"+stop.getSeconds();
    $scope.dStop = stop;
    $scope.add()
  }

  $scope.add = function(){
    $scope.data.push({
      start: $scope.txtStart,
      stop: $scope.txtStop,
      time: $scope.timeToSeconds($scope.dStop) - $scope.timeToSeconds($scope.dStart),
      description: $scope.description
    })
    $scope.reset()
  }

  $scope.timeToSeconds = function(d){
    var h = d.getHours() * 60
    var m = (d.getMinutes() + h)*60
    var s = d.getSeconds() + m 

    return s
  }

  $scope.showTime = function(){
    if($scope.dStart == null)
    {
      return ""
    }
    let start = $scope.timeToSeconds($scope.dStart)
    let current = $scope.timeToSeconds(new Date())

    return $scope.secondsToHms(current - start)

  }

  setInterval(function(){
    $scope.$apply()
  },1000)

  $scope.secondsToHms = function(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

  $scope.delete = function(i){
    $scope.data.splice(i,1);
  }

  $scope.reset = function(){
    $scope.txtStart = null
    $scope.txtStop = null
    $scope.dStart = null
    $scope.dStart = null
    $scope.description = null
  }

  $scope.total = function(){
    let t = 0
    for(var i=0;i<$scope.data.length;i++){
      t += $scope.data[i].time
    }

    return $scope.secondsToHms(t)
  }


})

