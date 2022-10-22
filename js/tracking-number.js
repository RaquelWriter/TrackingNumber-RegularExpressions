var desperdicio = []; // impar, múltiplo de 5, 1 de cada 5
var calidad = []; // impar, no múltiplo de 5, 5 % de errores
var devolucion = []; // par, 70% errores

// Creates the swal window
var result = document.createElement('result');

function showResult() {
  var inputTrackingNumber = document.getElementById(
    'inputTrackingNumber'
  ).value;

  // Check some errors
  // (remove letters and special chars and remove extra commas)
  var inputTrackingNumberChecked = checkErrors(inputTrackingNumber);

  // Parse to JSON to check if later with for bucle
  var inputTrackingNumberEval = JSON.parse(
    '[' + inputTrackingNumberChecked + ']'
  );

  for (const item of inputTrackingNumberEval) {
    switch (parseFloat(item % 5)) {
      case 0: //5 multiple
        desperdicio.push(item.toString().trim() + ' ');
        break;
      default:
        if (parseFloat(item % 2)) {
          // It's even (par)
          devolucion.push(item.toString().trim() + ' ');
        } else {
          // It's odd (impar)
          calidad.push(item.toString().trim() + ' ');
        }
    }
  }
  result.innerHTML =
    '<div>Items to return to the storehouse (70% errors):<br />' +
    devolucion +
    '<br/>' +
    'Items to send to quality department for revision (5% errors):<br />' +
    calidad +
    '<br/>' +
    'Items to send to the garbage, because they have a defect (1 every 5):<br />' +
    desperdicio +
    '</div>';
  swal({
    content: result,
  });

  console.log('Al departamento de calidad: ' + calidad);
  console.log('A devolución: ' + devolucion);
  console.log('A desperdicio: ' + desperdicio);
}

function checkErrors(num) {
  // Check some errors
  // Remove all the letters
  let myRegex = /[a-zA-Z]+/gi;
  num = num.replace(myRegex, '');
  console.log('Removing letters: ' + num);
  myRegex = /[&\/\\#+()$~%.'":*?<>{}]/g;
  num = num.replace(myRegex, ',');
  console.log('Removing special chars: ' + num);
  myRegex = /[,,]+/g;
  num = num.replace(myRegex, ',');
  console.log('Removing duplicate comma: ' + num);
  myRegex = /[,]$/;
  num = num.replace(myRegex, '');
  console.log('Removing end comma: ' + num);
  return num;
}
