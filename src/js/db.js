var createStatement =
  "CREATE TABLE IF NOT EXISTS Contacts(" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    " Nombre TEXT, Nit TEXT," +
    " Direccion TEXT, Telefono TEXT)";
var selectAllStatement = "SELECT * FROM Contacts";
var insertStatement = "INSERT INTO Contacts (Nombre, Nit, Direccion, Telefono) VALUES (?, ?, ?, ?)";
var updateStatement = "UPDATE Contacts SET Nombre = ?, Nit = ? , Direccion =?, Telefono=? WHERE id=?";
var deleteStatement = "DELETE FROM Contacts WHERE id=?";
var dropStatement = "DROP TABLE Contacts";
var db = openDatabase("ContactosYClientes", "1.0", "ContactosYClientes", 50*1024*1024);  // Open SQLite Database
var dataset;
var DataType;

function initDatabase(){  // Function Call When Page is ready.{

 try {
   if (!window.openDatabase){  // Check browser is supported SQLite or not
     alert('Databases are not supported in this browser.');
   }
   else{
     createTable();  // If supported then call Function for create table in SQLite
   }
 }
catch (e) {
  if (e == 2) {
    // Version number mismatch.
    console.log("Invalid database version.");
  }
  else {
    console.log("Unknown error " + e + ".");
  }
  return;
  }
}
function createTable(){  // Function for Create Table in SQLite.
  db.transaction(function (tx) {
    tx.executeSql(createStatement, [], showRecords, onError); });

}

function insertRecord(){ // Get value from Input and insert record . Function Call when Save/Submit Button Click..
  var idTemp = $('#id').val();
  var nombreTemp = $('input:text[id=inputName]').val();
  var nitTemp = $('input:text[id=inputVat]').val();
  var dirTemp = $('input:text[id=inputStreet]').val();
  var telTemp = $('input:text[id=inputPhone]').val();
  console.log($('input:text[id=inputId]').val());
  if($.trim(idTemp) == "" && $.trim(nombreTemp) !="" && $.trim(nitTemp)!="" ){
    db.transaction(function (tx) {
      tx.executeSql(insertStatement,
        [ $.trim(nombreTemp), $.trim(nitTemp), $.trim(dirTemp), $.trim(telTemp)], loadAndReset, onError);
      });
    }
    else if($.trim(idTemp) != ""  && $.trim(nombreTemp) !="" && $.trim(nitTemp) !="" ){
      updateRecord();
    }
//tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}
function deleteRecord(id){ // Get id of record . Function Call when Delete Button Click..
    var iddelete = id.toString();
    db.transaction(function (tx) {
      tx.executeSql(deleteStatement,
        [id], showRecords, onError); alert("Delete Sucessfully"); });
    resetForm();
}

function updateRecord(){ // Get id of record . Function Call when Delete Button Click..
    var nombreUpdate = $('input:text[id=inputName]').val().toString();
    var nitUpdate = $('input:text[id=inputVat]').val().toString();
    var dirUpdate = $('input:text[id=inputStreet]').val().toString();
    var phoneUpdate = $('input:text[id=inputPhone]').val().toString();
    var useridUpdate = $("#id").val();
    db.transaction(function (tx) {
      tx.executeSql(updateStatement,
        [nombreUpdate, nitUpdate,dirUpdate,phoneUpdate, Number(useridUpdate)],
        loadAndReset, onError); });
}

function dropTable(){ // Function Call when Drop Button Click.. Talbe will be dropped from database.

    db.transaction(function (tx) {
      tx.executeSql(dropStatement, [], showRecords, onError); });

    resetForm();
    initDatabase();

}

function loadRecord(i){ // Function for display records which are retrived from database.
    var item = dataset.item(i);
    document.getElementById("inputName").focus();
    $("#inputName").val((item['Nombre']).toString());
    $("#inputVat").val((item['Nit']).toString());
    $("#inputStreet").val((item['Direccion']).toString());
    $("#inputPhone").val((item['Telefono']).toString());
    $("#id").val((item['id']).toString());
}

function resetForm(){ // Function for reset form input values.

    $("#inputName").val("");
    $("#inputVat").val("");
    $("#inputStreet").val("");
    $("#inputPhone").val("");
    $("#id").val("");
}

function loadAndReset(){ //Function for Load and Reset...
    resetForm();
    showRecords();
}

function onError(tx, error){ // Function for Hendeling Error...
    alert(error.message);
}

function showRecords(){ // Function For Retrive data from Database Display records as list
  $("#listado_contactos").html('');
  db.transaction(function (tx) {
    tx.executeSql(selectAllStatement, [], function (tx, result) {
      dataset = result.rows;
      for (var i = 0, item = null; i < dataset.length; i++) {
        item = dataset.item(i);
        var linkeditdelete = '<tr>'+
        '<td>' + '<a href="#" onclick="fillInvoice('+ i +')">' + item['Nombre'] +'</a>'+ '</td>' +
        '<td>' + item['Nit']    + '</td>' +
        '<td>' + item['Telefono'] + '</td>' +
        '<td>' + '<a href="#" onclick="loadRecord(' + i + ');">Editar</a>' + '</td>'+
        '<td>' + '<a href="#" onclick="deleteRecord(' + item['id'] + ');">eliminar</a>'+'</td>'+
        '</tr>';
                $("#listado_contactos").append(linkeditdelete);
            }
        });
    });
}
function sortRecords(value){ // Function For Retrive data from Database Display records as list
  $("#listado_contactos").html('');
  db.transaction(function (tx) {
    tx.executeSql("select * from Contacts order by "+value+ " desc;" , [], function (tx, result) {
      dataset = result.rows;

      for (var i = 0, item = null; i < dataset.length; i++) {
        item = dataset.item(i);
        var linkeditdelete = '<tr>'+
        '<td>' + '<a href="#" onclick="fillInvoice('+ i +')">' + item['Nombre'] +'</a>'+ '</td>' +
        '<td>' + item['Nit']    + '</td>' +
        '<td>' + item['Telefono'] + '</td>' +
        '<td>' + '<a href="#" onclick="loadRecord(' + i + ');">Editar</a>' + '</td>'+
        '<td>' + '<a href="#" onclick="deleteRecord(' + item['id'] + ');">eliminar</a>'+'</td>'+
        '</tr>';
                $("#listado_contactos").append(linkeditdelete);
            }
        });
    });
}
<<<<<<< HEAD
=======

function findRecords(){ // Function For Retrive data from Database Display records as list
  var value = $('input:text[id=findNit]').val();
  var filtro = $('button:button[name=filtro]').val();
  console.log(filtro);
>>>>>>> 202d275c6c7e786f8fe8f9546bd1df4c1e94c015

function findRecords(){ // Function For Retrive data from Database Display records as list
  var value = $('input:text[id=findNit]').val().toString();  
  var filtro = $('input:radio[name=filtro]:checked').val().toString();
  switch(filtro){
    case "Nit":
      filtro = "Nit";
    break;
    
    case "Nombre":
      filtro = "Nombre";
    break;
    default:
      filtro="id";
  }
  console.log(' '+filtro);
  $("#listado_contactos").html('')
  db.transaction(function (tx) {
<<<<<<< HEAD
    tx.executeSql("select * from Contacts where " + filtro + " like('%"+ value +"%') order by id desc;", [], function (tx, result) {
=======
    tx.executeSql("select * from Contacts where Nit like('%"+ value +"%') order by id desc;", [], function (tx, result) {
>>>>>>> 202d275c6c7e786f8fe8f9546bd1df4c1e94c015
      dataset = result.rows;
      for (var i = 0, item = null; i < dataset.length; i++) {
        item = dataset.item(i);
        var linkeditdelete = '<tr>'+
        '<td>' + '<a href="#" onclick="fillInvoice('+ i +')">' + item['Nombre'] +'</a>'+ '</td>' +
        '<td>' + item['Nit']    + '</td>' +
        '<td>' + item['Telefono'] + '</td>' +
        '<td>' + '<a href="#" onclick="loadRecord(' + i + ');">Editar</a>' + '</td>'+
        '<td>' + '<a href="#" onclick="deleteRecord(' + item['id'] + ');">eliminar</a>'+'</td>'+
        '</tr>';
                $("#listado_contactos").append(linkeditdelete);
            }
        });
    });
}

function fillInvoice(i){
  $("#datos")
  var item = dataset.item(i);
  console.log(i, item['Nombre']);
  document.getElementById("invoiceName").innerHTML = item['Nombre'];
  document.getElementById("invoiceVat").innerHTML = item['Nit'];
  document.getElementById("invioceStreet").innerHTML = item['Direccion'];
  document.getElementById("invoicePhone").innerHTML = item['Telefono'];

}
$(document).ready(function (){
;

    //$("body").fadeIn(2000);
    initDatabase();
    $("#submitButton").click(insertRecord);  // Register Event Listener when button click.
    $("#btnUpdate").click(updateRecord);
    $("#btnReset").click(resetForm);
    $("#btnDrop").click(dropTable);
    $("#btnSort").click(sortRecords);
    $("#btnFind").click(findRecords);

});
