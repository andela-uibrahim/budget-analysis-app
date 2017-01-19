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



