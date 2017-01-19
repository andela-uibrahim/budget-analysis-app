
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
		
		appendIncome (index,source,amount);	
		});
	});
}

function appendIncome(index,source,amount){
	return($('.incom').append("<tr>"+
	        "<td>"+index+"</td>"+
	        "<td>"+source+"</td>"+
	        "<td class='text-center'>"+amount+"</td>"+
	        "</tr>"))
}
