$(document).ready(function() {

  // Single out products from product list by name
  $("#search").keyup(function(e){
    e.preventDefault();
    var search = $("#search").val();
    $.post("/vendor/products", {nameText: search}).done(function(data){
      displayList(data);
    });
  });
});

$('#showItemForm').on('click', function() {
  $("#newProductForm").fadeIn('normal');
});

$('#done').on('click', function() {
  $("#newProductForm").fadeOut()
});

$.get("/vendor/product", function(data) {
  // Grab product list container tbody element
  $list = $("#listBody");

  // Initialize counter (for auto-UPN population) and htmlString (for table row population)
  var htmlString = '';

  // Loop through product data from DB and format
  data.forEach(function(curr) {
    htmlString += '<tr id="' + curr._id + '"><td></td>';

    // Loop through each product to fill <td>s
    for(var j = 1; j < Object.keys(curr).length - 1; j++) {
                                      // Here, using the 'numeral' library to format 2nd column as currency
      j === 2 ? htmlString += '<td>' + numeral(Number(curr[Object.keys(curr)[j]])).format('0') + ' /</td>'
              : htmlString += '<td>' + curr[Object.keys(curr)[j]] + '</td>';
    }
    htmlString += '</tr>';
  });

  // Fill the table with the new string
  $list.append(htmlString);
});

var displayList = function(data) {
  $result = $('#listBody');
  var htmlString = '';
  data.forEach(function(curr) {
    htmlString += '<tr id="' + curr._id + '"><td></td>';
    for(var i = 1; i < Object.keys(curr).length - 1; i++) {
      i === 2 ? htmlString += '<td>' + numeral(Number(curr[Object.keys(curr)[i]])) + ' /</td>'
              : htmlString += '<td>' + curr[Object.keys(curr)[i]] + '</td>';
    }
    htmlString += '</tr>';
  });
  $result.html(htmlString);
};
