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
	/**
   * viewDashboard();
   * loads the dashboard page when the app is accessed
   */
	viewDashboard();

	/**
   * allocationPage()
   * displays the allocation page when the budget menu is clicked
   *
   *newAllocation()
   *adds new allocation to the allocation page onclick of submit
   */
	$('.budget').click(viewAllocation(),newAllocation());
	$('.income').click(viewIncome(),newIncome());
	$('.expenses').click(viewExpenses(),newExpenses());

});



/**
 * adds new allocation to the allocation page;
 * @ function
 *returns function to display allocations
 */
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
            'purpose': purpose
          },function(err) {
	            if (err) {
								console.log(err.toString())
								}
					});			
			}else{ 
				var newPostRef= myBudgetRef.push();
				newPostRef.set({
				  purpose: purpose,
				  allocation: parseInt(amount),
				  priority:selected
				});
			}
		})
		//calls function allocation page to load the new page
		viewAllocation();
		});
	})};


/**
 * adds viewAlocation to the allocation page;
 * @ function
 *function to display allocations
 */
function viewAllocation(){
	var allocation=0;
	var purpose =0;
	var priority=0;	

// looop through the database and display the content inside it
	myBudgetRef.orderByKey().on("value", function(snap){
		$('.allocation').html("");
		var index=0;
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

    $('.allocation').append("<tr id='"+status+"'>"+
			"<td>"+index+"</td>"+
			"<td class='text-center'>"+priority+"</td>"+	
			"<td class='text-center'>"+purpose+"</td>"+
			"<td class='text-center'>"+allocation+"</td>"+
			"<td class='text-center'>"+spent+"</td>"+
			"</tr>");
		});
	});
};

						
/**
 * newIncome
 * @ function
 *add new income to the database;
 */
function newIncome(){
	return(function(){
		$('#incSub').click(function(){
			var name = $('#incName').val();
			var amount= $('#incNum').val();
			myIncomeRef.orderByChild("source").equalTo(name).limitToFirst(1).once("value", function(snapshot) {
		    var data = snapshot.val();
		    if (data){
		    		var dataKey = (Object.keys(data)[0])
		          myIncomeRef.child(dataKey).update({
		            'amont': parseInt(amount),
		            'source': name
		          }, function(err) {
	              if (err) {

	                  console.log(err.toString())
	                }
	               });
				}else{ 

						var newPostRef= myIncomeRef.push();
						newPostRef.set({
						  source: name,
						  amont: parseInt(amount)
						});
					}
				})
				
				viewIncome();
		})
	})
};


/**
 * viewIncome
 * @ function
 *shows incomes and their sources in the database;
 */
function viewIncome(){
		myIncomeRef.orderByChild('allocation').on("value", function(snap){
			$('.incom').html("");
			var index=0;
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


/**
 * viewDashboard
 * @ function
 *displays total income, total expenses and the current balance also shows status;
 */

function viewDashboard(){
		return (function(){

      	var totalInc= getTotalInc();
      	var totalExp = getTotalExp();
      	console.log(totalExp)
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



/**
 * newExpenses
 * @ function
 *adds new expenses to the database;
 */

function newExpenses(){
	return(function(){
			$('#expSub').click(function(){
				var spentOn = $('#expName').val();
				var amount= $('#expNum').val();
				myExpenseRef.orderByChild("spentOn").equalTo(spentOn).limitToFirst(1).once("value", function(snapshot) {
		    var data = snapshot.val();
		    if (data){
		    		var dataKey = (Object.keys(data)[0])
		         myExpenseRef.child(dataKey).update({
		            'amount': parseInt(amount),
		            'spentOn': spentOn
		          },function(err) {
		              if (err) {

		                  console.log(err.toString())
		              	}
		          		});
	    	}else{ 

							var newPostRef= myExpenseRef.push();
							newPostRef.set({
							    spentOn: spentOn,
							    amount: parseInt(amount)
							});
						}
					});
					viewExpenses();
				});
			});
		};



/**
 * viewExpenses
 * @ function
 *shows all expenses in the database;
 */
function viewExpenses(){
	var spentOn;
	var spent;	
	myExpenseRef.orderByChild('amount').on("value", function(snap){
	var snapReverse = []
	snap.forEach(function(snapChild) {
		snapReverse.unshift(snapChild)
	});
	var index=0;
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


/**
 * getTotalInc
 * @ function
 *show the total income in the database;
 */
function getTotalInc(){
		var totalInc=0;
		myIncomeRef.orderByChild('allocation').on("value", function(snap){
      snap.forEach(function(childSnap){

      	var income = childSnap.val();
      	totalInc+= income.amont;
			})
		});
	return totalInc;

	}


/**
 * getTotalExp
 * @ function
 *show the total expense in the database;
 */
function getTotalExp(){
	var totalExp=0;
	return new Promise((resolve, reject) => {
			return myExpenseRef.orderByChild('amount').on("value", function(snap){
      snap.forEach(function(childSnap){

      	var expenses = childSnap.val();
      	totalExp+= expenses.amount;
			})
      resolve(totalExp)
			
		})
	}).then(function (val) {
		console.log(val, 'val')
	})
}


/**
 * getBalance
 * @ function
 *show the difference between two numbers;
 */
function getBalance(first, second) {
	return (first-second);
};


/**
 * checkStatus
 * @ function
 *track the status of the budget and expenses;
 */
function checkStatus (budget,expenses){
	var balance= (budget-expenses);
	if(balance<=(budget/3)){
		return "red";
	}else if ((balance<=(budget/2)) && (balance>=(budget/3))) {
		return "yellow";
	}
}

