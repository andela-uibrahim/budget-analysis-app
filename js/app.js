

/**
 * viewDashboard
 * @ function
 *displays total income, total expenses and the current balance also shows status;
 */

function viewDashboard(){
	// var expen;
	return (function(){

    	var totalInc= getTotalInc();
    	var poi = getTotalExp().then(function (exp) {

			return new Promise( function(resolve, reject) {
	    		$('#location').html(exp)
				// expen = exp;
				resolve(exp)
			})
		})


    	var boi = getTotalInc().then(function (inc) {

			return new Promise( function(resolve, reject) {
	    		$('#location2').html(inc)
				// expen = exp;
				resolve(inc)
			})

		// var totalExp = val
		// appendTotalExp(val)
	})

   

    var balance = new Promise(function (resolve, reject)  {
    	poi.then(function(tg) {
    	return tg
    }).then(function (dd) {
    	boi.then(function (bg) {
    		// console.log(dd-bg)
    		// return dd - bg
    		resolve(bg - dd)
    		appendBalance(checkStatus(bg, dd))
    	})
    })
    }) 

    	
			// var balance= getBalance(100000,expen);
			var status = checkStatus(totalInc,getTotalExp);
			appendTotalInc(totalInc);
			appendTotalExp();
			balance.then(function (asd) {
				// console.log(asd)
				appendBalance()
				$('#thebal').html(asd)
				// app
			})
    	// appendBalance(balance,status);
    }());
};


/**
 * getTotalInc
 * @ function
 *show the total income in the database;
 */
function getTotalInc(){
	var totalInc=0;
	// myIncomeRef.orderByChild('allocation').on("value", function(snap){
 //  		snap.forEach(function(childSnap){
	// 		var income = childSnap.val();
	//   	totalInc += income.amont;
	// 	})
	// });
	// return totalInc;

	return new Promise((resolve, reject) => {
		return myIncomeRef.orderByChild('amont').on("value", function(snap){
      	snap.forEach(function(childSnap){

      	// var expenses = ;
      	totalInc += childSnap.val().amont;
			})
      	resolve(totalInc)
			
		})
	})	
}


/**
 * getTotalExp
 * @ function
 *show the total expense in the database;
 */
function getTotalExp(){
	// console.log("here")
	var totalExp=0;
	return new Promise((resolve, reject) => {
			return myExpenseRef.orderByChild('amount').on("value", function(snap){
      snap.forEach(function(childSnap){

      	var expenses = childSnap.val();
      	totalExp+= expenses.amount;
			})
      resolve(totalExp)
			
		})
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


function appendTotalInc(){
		return (
      	$("#expectedIncome").append("<div class='row'>"+
            	"<div class='col-md-6'>"+
              	"Expected Income:"+
            	"</div>"+
          	"<div class='col-md-6 text-right' id='location2'>"+
              	0+
          	"</div>"+
  				"</div>"))
	}

function appendTotalExp(){
	return($("#totalExp").append("<div class='col-md-6 right'>"+
         "Total Expenses:"+
        "</div>"+
        "<div class='col-md-6 text-right' id='location' >"+
            0+
        "</div>"))
}

function appendBalance(status){
	return($("#balance").append("<div class='col-md-6 text-right' id='"+status+"'>"+
            "<h4 class='pull-right' id='thebal'>"+
       
            "</h4>"+
        "</div>"))
}
