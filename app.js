$(document).ready(function () {

var budget = {};
var expenses= {};
var	income = {};
var dashBorad = {};

$('#submit').click( function(){
	var name =$('#name').val();
	var amount= $('#amount').val();
	budget['name'] = amount;
	
});
	
	console.log(budget['name']);

})



