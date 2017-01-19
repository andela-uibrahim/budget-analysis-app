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
