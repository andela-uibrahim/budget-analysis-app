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
			if(!spentOn || (Number(spentOn))){
				return null;
			}else if(amount<=0){
				return null
			}
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
		appendToExpenses(index,spentOn,spent);
	 	});
  }); 
}


function appendToExpenses(index,spentOn,spent){
	return($('.expensesT').append("<tr>"+
    "<td>"+index+"</td>"+
    "<td>"+spentOn+"</td>"+
    "<td class='text-center'>"+spent+"</td>"+
     "</tr>"))
}