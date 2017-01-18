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
var myExpenseRef= firebase.database().ref('table/expenses/');
var myBudgetRef =firebase.database().ref('table/budget/');



$(document).ready(function(){

	var totalInc=0;
	var totalExp=0;
	myDashRef.orderByKey().on("value", function(snap){
        snap.forEach(function(childSnap){
            
          var  arrVal = childSnap.val();
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
	
			$('.budget').click(function(){
				

				$('#allSub').click(function(){
					var purpose = $('#allName').val();
					var amount= $('#allNum').val();
					var selected= $('#mySelect').val();
					var newPostRef= myBudgetRef.push();
						newPostRef.set({
						    allocation: amount,
						    purpose: purpose,
						    priority:selected
						});

					var allocation=0;
					var purpose =0;
					var priority=0;
					var index=0;
		// looop through the data base and display the content inside it
					myBudgetRef.orderByKey().on("value", function(snap){
        		snap.forEach(function(childSnap){
            var  budget = childSnap.val();
            index++;
            allocation = budget.allocation;
            purpose =budget.purpose;
            priority = budget.priority;
            var spent=0;
            myExpenseRef.orderByKey().on("value", function(snap){
        		snap.forEach(function(childSnap){
        					var expenses= childSnap.val();
        					var spentOn = expenses.spentOn;
        					if (spentOn===purpose){
        							spent = expenses.amount;
        							return false;
        					}
	        		});
	        	});

            $('.allocation').append("<tr>"+
												"<td>"+index+"</td>"+
												"<td class='text-center'>"+priority+"</td>"+	
												"<td class='text-center'>"+purpose+"</td>"+
												"<td class='text-center'>"+allocation+"</td>"+
												"<td class='text-center'>"+spent+"</td>"+
												"</tr>");
        	});
						
					});
				    
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
						var spentOn = $('#expName').val();
						var amount= $('#expNum').val();
						var newPostRef= myExpenseRef.push();
							newPostRef.set({
							    spentOn: spentOn,
							    amount: amount
							});

						var spentOn;
						var spent;
						var index=0;	
						myExpenseRef.orderByKey().on("value", function(snap){
        		snap.forEach(function(childSnap){
        					var expenses= childSnap.val();
        					 spentOn = expenses.spentOn;
        					 spent = expenses.amount;
        					 index++;
	        	
// looop through the data base and display the content inside it
							$('.expensesT').append("<tr>"+
		                                    "<td>"+index+"</td>"+
		                                    "<td>"+spentOn+"</td>"+
		                                    "<td class='text-center'>"+spent+"</td>"+
		                                     "</tr>");
					   	
					   	});
	        	}); 
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

