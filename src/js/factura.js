function fecha(){
      let now = new Date();
      let dia = now.getDate();
      let mes = now.getMonth();
      let anio = now.getFullYear();
      document.getElementById("day").innerHTML=dia;
      document.getElementById("month").innerHTML=mes;
      document.getElementById("year").innerHTML=anio;
      //console.log(fecha);
    }


var num2words = (function() {
    function Unidades(num){
        switch(num)
        {
            //case 0: return 'CERO';
            case 1: return 'UN';
            case 2: return 'DOS';
            case 3: return 'TRES';
            case 4: return 'CUATRO';
            case 5: return 'CINCO';
            case 6: return 'SEIS';
            case 7: return 'SIETE';
            case 8: return 'OCHO';
            case 9: return 'NUEVE';
        }

        return '';
    }//Unidades()

    function Decenas(num){

        let decena = Math.floor(num/10);
        let unidad = num - (decena * 10);

        switch(decena)
        {
            case 1:
                switch(unidad)
                {
                    case 0: return 'DIEZ';
                    case 1: return 'ONCE';
                    case 2: return 'DOCE';
                    case 3: return 'TRECE';
                    case 4: return 'CATORCE';
                    case 5: return 'QUINCE';
                    default: return 'DIECI' + Unidades(unidad);
                }
            case 2:
                switch(unidad)
                {
                    case 0: return 'VEINTE';
                    default: return 'VEINTI' + Unidades(unidad);
                }
            case 3: return DecenasY('TREINTA', unidad);
            case 4: return DecenasY('CUARENTA', unidad);
            case 5: return DecenasY('CINCUENTA', unidad);
            case 6: return DecenasY('SESENTA', unidad);
            case 7: return DecenasY('SETENTA', unidad);
            case 8: return DecenasY('OCHENTA', unidad);
            case 9: return DecenasY('NOVENTA', unidad);
            case 0: return Unidades(unidad);
        }
    }//Unidades()

    function DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
            return strSin + ' Y ' + Unidades(numUnidades)

        return strSin;
    }//DecenasY()

    function Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch(centenas)
        {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + Decenas(decenas);
                return 'CIEN';
            case 2: return 'DOSCIENTOS ' + Decenas(decenas);
            case 3: return 'TRESCIENTOS ' + Decenas(decenas);
            case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
            case 5: return 'QUINIENTOS ' + Decenas(decenas);
            case 6: return 'SEISCIENTOS ' + Decenas(decenas);
            case 7: return 'SETECIENTOS ' + Decenas(decenas);
            case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
            case 9: return 'NOVECIENTOS ' + Decenas(decenas);
        }

        return Decenas(decenas);
    }//Centenas()

    function Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let letras = '';

        if (cientos > 0)
            if (cientos > 1)
                letras = Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += '';

        return letras;
    }//Seccion()

    function Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
        let strCentenas = Centenas(resto);

        if(strMiles == '')
            return strCentenas;

        return strMiles + ' ' + strCentenas;
    }//Miles()

    function Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
        let strMiles = Miles(resto);

        if(strMillones == '')
            return strMiles;

        return strMillones + ' ' + strMiles;
    }//Millones()

    return function NumeroALetras(num, currency) {
        currency = currency || {};
        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: 'EXACTOS',
            letrasMonedaPlural: currency.plural || 'QUETZALES',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
            letrasMonedaSingular: currency.singular || 'QUETZAL', //'PESO', 'Dólar', 'Bolivar', 'etc'
            letrasMonedaCentavoPlural: currency.centPlural || 'CENTAVOS',
            letrasMonedaCentavoSingular: currency.centSingular || 'CENTAVO'
        };

        if (data.centavos > 0) {
            data.letrasCentavos = 'CON ' + (function () {
                    if (data.centavos == 1)
                        return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                    else
                        return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
                })();
        };

        if(data.enteros == 0)
            return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        if (data.enteros == 1)
            return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
        else
            return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    };


}
)();



function sumar () {
      var subtotal=0.00;
      let total=0.00
      var precio= document.getElementsByName("valor");
      for (var index=0; index < 9; index++ ){
          var celda = 0.00;
          celda = parseFloat(precio[index].innerHTML);
          celda =celda.toFixed(2);
          if ( !isNaN(celda )){
            precio[index].innerHTML = celda
          }

        if ( precio[index].innerHTML !=0 && !isNaN(precio[index].innerHTML)) {
          subtotal += parseFloat(precio[index].innerHTML);
         //console.log("2do bloq if ",subtotal);
        }
        else{
         //console.log(celda);
          //break;
        }
      }
    total = (parseFloat(subtotal)).toFixed(2);
    //console.log(total);

   //console.log(total);
    document.getElementById("total").innerHTML=new Intl.NumberFormat(
      "en-US",{ minimumFractionDigits: 2 }).format(total);

   //console.log(num2words(total));

    //console.log(new Intl.NumberFormat("en-US",{ minimumFractionDigits: 2 }).format(total));

    document.getElementById("totalletras").innerHTML =num2words(total);
    }

function borrar(){

    var td= document.querySelectorAll("td");
   //console.log("B",td[0].innerHTML);
    for (var index=3; index < 37; index++ ){
      if (index==7) index = 10; //salo par limpiar
        document.querySelectorAll("td")[index].innerHTML = "";

    }

  //  var db = openDatabase('db.sqlite', '1.0', 'Test DB', 2 * 1024 * 1024);
}

function imprimir(){
    sumar();
    print();

}




    // function sumar() {
    //   var precio = document.querySelectorAll(".val").values();
    //  //console.log(precio)
    //   // precio.forEach((item, i) => {
    //   //var cantidad=parseFloat(columnas[1].textContent);
    //   // });
    //
    // };
    //console.log(parseFloat(precio[0].innerHTML));
