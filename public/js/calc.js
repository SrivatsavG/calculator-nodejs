//function that display value
function dis(val) {
  document.getElementById("equation").value += val;
}

//function that evaluates the digit and return result
// function solve() {
//   let equation = document.getElementById("equation").value;
//   try {
//     let result = eval(x);
//       if (result === undefined) {
//       return;
//     } else {
//       //WRITE TO DB
//       document.getElementById("equation").value = result;
//       var xhttp = new XMLHttpRequest();
//       xhttp.open("POST", "/calculate", true);
//       xhttp.send(equation+"="+result);
//     }    
//   } catch (err) {

//   }
// }

//function that clear the display
function clr() {
  document.getElementById("equation").value = "";
}
