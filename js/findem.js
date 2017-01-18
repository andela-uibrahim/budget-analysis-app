(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//require('dotenv').config();
(function(){
  // Initialize Firebase
 
  firebase.initializeApp({
  	apiKey: "AIzaSyAukPL31o3g68FK_VIA2atir6VUl3PbgIE",
    authDomain: "budget-analysis-68a70.firebaseapp.com",
    databaseURL: "https://budget-analysis-68a70.firebaseio.com",
    storageBucket: "budget-analysis-68a70.appspot.com",
    messagingSenderId: "825698201032"
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


var myDashRef = firebase.database().ref('table/dashboard/');
var myIncome =firebase.database().ref('table/income/');
var myExpenses= firebase.database().ref('table/expenses/');
var myBudget =firebase.database().ref('table/budget/');



$(document).ready(function(){

	var totalInc=0;
	var totalExp=0;
	myDashRef.orderByKey().on("value", function(snap){
        snap.forEach(function(childSnap){
            
          var  arrVal = childSnap.val();
          console.log(arrVal);
            totalInc+= arrVal.totIncomes;
            totalExp+=arrVal.totalExpenses;
        });
      
      	$("#expectedIncome").append("<div class='row'>"+
	                                  	"<div class='col-md-6'>"+
	                                    	"Expected Income:"+
	                                  	"</div>"+
	                                	"<div class='col-md-6 text-right'>"+
	                                    	totalInc+
	                                	"</div>"+
                          				"</div>");
      	
      	$("#totalExp").append("<div class='col-md-6 right'>"+
                                    "Total Expenses:"+
                                "</div>"+
                                "<div class='col-md-6 text-right'>"+
                                    totalExp+
                                "</div>");

      	$("#balance").append("<div class='col-md-6 text-right'>"+
                                    "<h4>"+
                                    	balance(totalInc,totalExp)+
                                    "</h4>"+
                                "</div>");

      });
			




	// myDashRef.once('value').then(function(snapshot) {
	
	$('.allocation').click(function(){
		

		$('#allSub').click(function(){
			var name = $('#allName').val();
			var amount= $('#allNum').val();
			var selected= $('#mySelect').val();
			var newPostRef= firebase.database().ref('table/budget/').push();
				newPostRef.set({
				    allocation: amount,
				    name: name,
				    priority:selected
				});


// looop through the data base and display the content inside it
			for(i=0; i<3; i++){
				$('.allocation').append("<tr>"+
										"<td>1</td>"+
										"<td>priority</td>"+	
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

});
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


},{}]},{},[1]);
