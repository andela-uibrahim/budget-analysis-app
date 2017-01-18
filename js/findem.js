(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (process){
require('dotenv').config();
(function(){
  // Initialize Firebase
 
  firebase.initializeApp({
  	apiKey: process.env.API_SECRET,
    authDomain: process.env.auth_secret,
    databaseURL: "https://budget-analysis-68a70.firebaseio.com",
    storageBucket: process.env.storage_Bucket,
    messagingSenderId: process.env.messaging_SenderId
  });
})();

 // Get a reference to the database service
  var database = firebase.database();



//this is use to create and object in a table and set its value
  function dashboard(totIncomes, totExpenses) {
  firebase.database().ref('table/income/').set({
    source: totIncomes,
    amount: totExpenses
  });
};
dashboard("usman",500);


//this is use to instaciate a list on similar object in the same table
// for (i=0; i<3; i++){
// var newPostRef= firebase.database().ref('table/dashboard/').push();
// newPostRef.set({
//     totIncomes: 60,
//     totalExpenses: 80
// });
// };


var myDashboard = firebase.database().ref('table/dashboard/');
var myIncome =firebase.database().ref('table/income/');
var myExpenses= firebase.database().ref('table/expenses/');
var myBudget =firebase.database().ref('table/budget/');



$(document).ready(function(){

	firebase.database().ref('/table/').once('value').then(function(snapshot) {
	  var tableT = snapshot.val();
	  // console.log(tableT.dashboard)
	  for (var n in tableT.dashboard){
	  	console.log(n)
    	// alert(JSON.stringify(n["totIncomes"]));
  	}
 });

	$('.allocation').click(function(){
		$('#allSub').click(function(){
			var name = $('#allName').val();
			var amount= $('#allNum').val();
			var newPostRef= firebase.database().ref('table/budget/').push();
				newPostRef.set({
				    allocation: amount,
				    name: name
				});


//extract your whole DB
// firebase.database().ref('/table/').once('value').then(function(snapshot) {
//   var tableT = snapshot.val();
//   alert(tableT.dashboard);
// });

// looop through the data base and display the content inside it
			for(i=0; i<3; i++){
				$('.allocation').append("<tr>"+
										"<td>1</td>"+	
										"<td>Gas</td>"+
										"<td class='text-center'>100</td>"+
										"<td class='text-center'>50</td>"+
										"</tr>");
			};
		    
		});

	
 });


	$('.income').click(function(){
		$('#incSub').click(function(){
				var name = $('#incName').val();
				var amount= $('#incNum').val();
				var newPostRef= firebase.database().ref('table/income/').push();
					newPostRef.set({
					    source: name,
					    amont: amount
					});


//extract your whole DB
// firebase.database().ref('/table/').once('value').then(function(snapshot) {
//   var tableT = snapshot.val();
//   alert(tableT.dashboard);
// });
// looop through the data base and display the content inside it
				for(i=0; i<3; i++){
					$('.incom').append("<tr>"+
                                    "<td>1</td>"+
                                    "<td>Bank</td>"+
                                    "<td class='text-center'>500</td>"+
                                "</tr>");
				};
			    
			});
	 });

$('.expenses').click(function(){
	$('#expSub').click(function(){
				var name = $('#expName').val();
				var amount= $('#expNum').val();
				var newPostRef= firebase.database().ref('table/expenses/').push();
					newPostRef.set({
					    name: name,
					    amount: amount
					});



//extract your whole DB
// firebase.database().ref('/table/').once('value').then(function(snapshot) {
//   var tableT = snapshot.val();
//   alert(tableT.dashboard);
// });
// looop through the data base and display the content inside it
				for(i=0; i<3; i++){
					$('.expensesT').append("<tr>"+
                                    "<td>1</td>"+
                                    "<td>Gas</td>"+
                                    "<td class='text-center'>50</td>"+
                                     "</tr>");
				};
			    
			});
	});

})

// this adds up all the numbers and returns the sumation
function addition(data){
	var sum =0;
	for(i=0; i<data.length; i++){
		sum+=data[i][name];
	}
	return sum
};

function balance(first, second) {
	return (first-second);
};



function status (budget,expenses){
	var balance= (budget-expenses);
	if(balance>=(budget/2)){
		console.log('green');
	}else if ((balance<(budget/2)) && (balance>=(0.3*budget))){
		console.log('yellow');
	}else {
		console.log('red');
	}
}


}).call(this,require('_process'))
},{"_process":2,"dotenv":4}],4:[function(require,module,exports){
(function (process){
'use strict'

var fs = require('fs')

/*
 * Parses a string or buffer into an object
 * @param {String|Buffer} src - source to be parsed
 * @returns {Object}
*/
function parse (src) {
  var obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split('\n').forEach(function (line) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      var key = keyValueArr[1]

      // default undefined or missing values to empty string
      var value = keyValueArr[2] ? keyValueArr[2] : ''

      // expand newlines in quoted values
      var len = value ? value.length : 0
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()

      obj[key] = value
    }
  })

  return obj
}

/*
 * Main entry point into dotenv. Allows configuration before loading .env
 * @param {Object} options - valid options: path ('.env'), encoding ('utf8')
 * @returns {Boolean}
*/
function config (options) {
  var path = '.env'
  var encoding = 'utf8'

  if (options) {
    if (options.path) {
      path = options.path
    }
    if (options.encoding) {
      encoding = options.encoding
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    var parsedObj = parse(fs.readFileSync(path, { encoding: encoding }))

    Object.keys(parsedObj).forEach(function (key) {
      process.env[key] = process.env[key] || parsedObj[key]
    })

    return { parsed: parsedObj }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.load = config
module.exports.parse = parse

}).call(this,require('_process'))
},{"_process":2,"fs":1}]},{},[3]);
