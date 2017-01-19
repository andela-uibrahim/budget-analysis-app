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



var myDashRef = database.ref('table/dashboard/');
var myIncomeRef =database.ref('table/income/');
var myExpenseRef= database.ref('table/expenses/');
var myBudgetRef =database.ref('table/budget/');



$(document).ready(function(){


	viewDashboard();
	$('.budget').click(allocationPage(),newAllocation());
	$('.income').click(viewIncome(),newIncome());
	$('.expenses').click(viewExpenses(),newExpenses());

});


function newAllocation(){
	return (function(){
		$('#allSub').click(function(){
		var purpose = $('#allName').val();
		var amount= $('#allNum').val();
		var selected= $('#mySelect').val();
		myBudgetRef.orderByChild("purpose").equalTo(purpose).limitToFirst(1).once("value", function(snapshot) {
    var data = snapshot.val();
    if (data){
    		var dataKey = (Object.keys(data)[0])
          myBudgetRef.child(dataKey).update({
              'allocation': parseInt(amount),
              'priority': selected
          }, function(err) {
              if (err) {

                  console.log(err.toString())
              }
          });
    } else {
    	 var newPostRef= myBudgetRef.push();
				newPostRef.set({
		    allocation: amount,
		    purpose: purpose,
		    priority:selected
			});
    }
});
		
		allocationPage();
		});
	})};


function allocationPage(){
	var allocation=0;
	var purpose =0;
	var priority=0;
	var index=0;

// looop through the data base and display the content inside it
	myBudgetRef.orderByKey().on("value", function(snap){
		 $('.allocation').html("");
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

  	var status= checkStatus(allocation,spent);

    $('.allocation').append("<tr class='"+status+"'>"+
			"<td>"+index+"</td>"+
			"<td class='text-center'>"+priority+"</td>"+	
			"<td class='text-center'>"+purpose+"</td>"+
			"<td class='text-center'>"+allocation+"</td>"+
			"<td class='text-center'>"+spent+"</td>"+
			"</tr>");
		});
	});
};
						

function newIncome(){
	return(function(){
		$('#incSub').click(function(){
			var name = $('#incName').val();
			var amount= $('#incNum').val();
			var newPostRef= myIncomeRef.push();
				newPostRef.set({
				    source: name,
				    amont: amount
				});
			
			viewIncome();
		})
	})
};


function viewIncome(){
	var index=0;
		myIncomeRef.orderByChild('allocation').on("value", function(snap){
			$('.incom').html("");
      snap.forEach(function(childSnap){

      	var income = childSnap.val();
      	var source= income.source;
      	var amount = income.amont;
      	index++;
				$('.incom').append("<tr>"+
	        "<td>"+index+"</td>"+
	        "<td>"+source+"</td>"+
	        "<td class='text-center'>"+amount+"</td>"+
	        "</tr>");
			});
		});
}

function viewDashboard(){
		return (function(){

      	var totalInc= getTotalInc();
      	console.log(totalInc);
				var totalExp= getTotalExp();
				var balance= getBalance(totalInc,totalExp);
				var status = checkStatus(totalInc,getTotalExp);

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

      	$("#balance").append("<div class='col-md-6 text-right"+status+"'>"+
              "<h4>"+
              	balance+
              "</h4>"+
          "</div>");

      	
			}());
	};



function newExpenses(){
	return(function(){
			$('#expSub').click(function(){
						var spentOn = $('#expName').val();
						var amount= $('#expNum').val();
						var newPostRef= myExpenseRef.push();
							newPostRef.set({
							    spentOn: spentOn,
							    amount: parseInt(amount)
							});

					});
	});};



function viewExpenses(){
	var spentOn;
		var spent;
		var index=0;	
		myExpenseRef.orderByChild('amount').on("value", function(snap){
		var snapReverse = []
		snap.forEach(function(snapChild) {
			snapReverse.unshift(snapChild)
		});
		$('.expensesT').html("");
		snapReverse.forEach(function(childSnap){
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
}

function getTotalInc(){
		var totalInc=0;
		myIncomeRef.orderByChild('allocation').on("value", function(snap){
      snap.forEach(function(childSnap){

      	var income = childSnap.val();
      	totalInc+= income.amont;
			});
			return totalInc;
		});
		
	}

function getTotalExp(){
	var totalExp=0;
	myExpenseRef.orderByChild('amount').on("value", function(snap){
      snap.forEach(function(childSnap){

      	var expenses = childSnap.val();
      	totalExp+= expenses.amount;
			});

			return totalExp;
		});
	
}


function getBalance(first, second) {
	return (first-second);
};




function checkStatus (budget,expenses){
	var balance= (budget-expenses);
	if(balance<=(budget/3)){
		return "red";
	}else if (balance<(budget/2)) {
		return "yellow";
	}
}

