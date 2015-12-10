// In order to RUN the tests please make sure you have the PROP Manager Server being set up
// and the PROJECT / ENVIRONMENT / RELEASE and some keys are set up.


var chai = require('chai') ;
var assert = chai.assert;

// This needs to be changed for your test.
var propManagerConfig = {
    propManagerUrl : "http://localhost:3000",
    projectName : "VisaCheckout",
    environment : "DEV",
    release : "0.0"
};

// Name of the keys to be retrieved.
var keyName = "password" ;

var propManagerClient = require('./index')(propManagerConfig) ;


// Test 1.

  function testForAllKeys() {
      var allKeys  = propManagerClient.getAllKeys();
      console.log( "allKeys = " , JSON.stringify(allKeys)) ;
      assert.isNotNull(allKeys, "Keys Object should not be null ") ;
  }

  testForAllKeys();

  function testForSingleKey() {
    var keyValue = propManagerClient.get(keyName) ;
    console.log( "KEY VALUE = " , keyValue) ;
    assert.isNotNull(keyValue, keyName + " should have a value. ") ;

  }

  testForSingleKey();

  function testForRefresh() {
    propManagerClient.refresh();
    testForAllKeys();
    console.log("Successfully tested REFREH() functionality") ;
  }

  testForRefresh();
