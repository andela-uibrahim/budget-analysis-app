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
			appendTotalInc(totalInc);
			//appendTotalExp(totalExp);
    	appendBalance(balance,status);
    }());
};


function callback(n){
	console.log(n);
}
/**
 * getTotalInc
 * @ function
 *show the total income in the database;
 */
function getTotalInc(callback(n)){
	var totalInc=0;
	myIncomeRef.orderByChild('allocation').on("value", function(snap){
  		snap.forEach(function(childSnap){
		var income = childSnap.val();
	  	totalInc+= income.amont;
		})
  		callback(totalInc);
	});
	//return totalInc;
}


/**
 * getTotalExp
 * @ function
 *show the total expense in the database;
 */
function getTotalExp(){
	console.log("here")
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
		var totalExp = val
		appendTotalExp(val)
	}).catch(function (val) {
		console.log(val, "called catch")
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


function appendTotalInc(totalInc){
		return (
      	$("#expectedIncome").append("<div class='row'>"+
            	"<div class='col-md-6'>"+
              	"Expected Income:"+
            	"</div>"+
          	"<div class='col-md-6 text-right'>"+
              	totalInc+
          	"</div>"+
  				"</div>"))
	}

function appendTotalExp(totalExp){
	return($("#totalExp").append("<div class='col-md-6 right'>"+
         "Total Expenses:"+
        "</div>"+
        "<div class='col-md-6 text-right'>"+
            totalExp+
        "</div>"))
}

function appendBalance(balance){
	return($("#balance").append("<div class='col-md-6 text-right"+status+"'>"+
            "<h4>"+
            	balance+
            "</h4>"+
        "</div>"))
}
