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
			appendAllocation(status,index,priority,purpose,allocation,spent);
		});
	});
};


function appendAllocation(status,index,priority,purpose,allocation,spent){
	return($('.allocation').append("<tr id='"+status+"'>"+
			"<td>"+index+"</td>"+
			"<td class='text-center'>"+priority+"</td>"+	
			"<td class='text-center'>"+purpose+"</td>"+
			"<td class='text-center'>"+allocation+"</td>"+
			"<td class='text-center'>"+spent+"</td>"+
			"</tr>"))
};
