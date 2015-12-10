

var debug = require('debug')('propmanager') ;
var error = require('debug')('propmanager:error') ;
var request = require('sync-request') ;

module.exports = function(config) {
  return new PropManagerClient(config);
};


// Prop Manager client object that contains all the functionalities to be invoked from the client side.
function PropManagerClient(config) {

     var propManagerUrl = config.propManagerUrl ;
     var projectName = config.projectName;
     var environment = config.environment;
     var release = config.release;

     var projectDetails = projectName + "/" + environment + "/" + release;

     var projectKeys = {} ;

     initialize();

     // This function will return the Key Vale for a single Key if present in the Prop Manager.
     this.get = function(keyName) {
           var keyValue ;


            if(projectKeys.hasOwnProperty(keyName)) {
                keyValue = projectKeys[keyName] ;
                debug('Found Key ' + keyName  +  "value = " + keyValue) ;
            } else {
                error('Cannot get Key : ' + keyName) ;
            }

            return keyValue;
       }

       // This function will return all the keys of the project as per the envionment & release.
     this.getAllKeys = function() {
         return JSON.parse(JSON.stringify(projectKeys));
       }

       // This project will refresh the keys from the Prop Manager.
     this.refresh = function() {
          initialize();
       }

     // Responsible for initializing the Prop manager client with the Keys.
     function initialize() {

        var fullUrl = propManagerUrl+"/projects/"+projectName+"/env/"+environment+"/release/"+release+"?flatten=true";

          debug('Full URL is : ' + fullUrl) ;
          var response = request('GET', fullUrl) ;
          if(response && response.statusCode  == 200) {
              projectKeys = JSON.parse(response.body) ;
              debug('Successfully retrieve the KEYS for thee project. ') ;
          } else {
              error("There is an error while getting the KEYS as the project ");
          }
     };


  }
