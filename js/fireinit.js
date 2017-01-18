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

	firebase.database().ref('/table/dashboard').once('value').then(function(childSnapshot) {
	  var name = childSnapshot.val();
	  console.log(name);
	  // console.log(tableT.dashboard)
	 // for (var n in tableT.dashboard){
	  //	console.log(n)
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

