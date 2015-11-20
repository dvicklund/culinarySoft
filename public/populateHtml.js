$(document).ready(function() {
  $('#newProductForm').hide();

  $('#addNewProduct').on('click', function() {
    $("#newProductForm").fadeIn('normal');
  });

  $('#done').on('click', function() {
    $("#newProductForm").fadeOut('normal');
  });

  // Single out products from product list by name
  $("#search").keyup(function(e){
    e.preventDefault();
    var search = $("#search").val();
    $.post("/vendor/products", {nameText: search}).done(function(data){
      displayList(data);
    });
  });
});
$.get("/vendor/product", function(data) {
  // Grab product list container tbody element
  $list = $("#listBody");

  // Initialize counter (for auto-UPN population) and htmlString (for table row population)
  var counter = 1;
  var htmlString = '';

  // Loop through product data from DB and format
  data.forEach(function(curr) {
    htmlString += '<tr id="' + curr._id + '">';

    // Remove button generated by checking product's _id property
    htmlString += '<td id="removeButton"><form action="/vendor/product/' + curr._id + '" method="POST"><input type="submit" value="Remove"></input></form></td>';

    // Loop through each product to fill <td>s
    for(var j = 1; j < Object.keys(curr).length - 1; j++) {
                                      // Here, using the 'numeral' library to format 2nd column as currency
      j === 2 ? htmlString += '<td>' + numeral(Number(curr[Object.keys(curr)[j]])).format('$0,0.00') + ' /</td>'
              : htmlString += '<td>' + curr[Object.keys(curr)[j]] + '</td>';
    }
    htmlString += '</tr>';
    counter++;
  });

  // Fill the table with the new string
  $list.append(htmlString);

  // Set UPN automatically to the new number of products + 1
  $('#UPN').val(counter);
});

// Display search results function (sans button)
var displayResults = function(data) {
  $result = $('#searchResult');
  var htmlString = '';
  data.forEach(function(curr) {
    htmlString += '<tr id="' + curr._id + '">';
    for(var i = 1; i < Object.keys(curr).length - 1; i++) {
      i === 2 ? htmlString += '<td>' + numeral(Number(curr[Object.keys(curr)[i]])).format('$0,0.00') + ' /</td>'
              : htmlString += '<td>' + curr[Object.keys(curr)[i]] + '</td>';
    }
    htmlString += '</tr>';
  });
  $result.html(htmlString);
};

var displayList = function(data) {
  $result = $('#listBody');
  var htmlString = '';
  data.forEach(function(curr) {
    htmlString += '<tr id="' + curr._id + '">';
    htmlString += '<td id="removeButton"><form action="/vendor/product/' + curr._id + '" method="POST"><input type="submit" value="Remove"></input></form></td>';
    for(var i = 1; i < Object.keys(curr).length - 1; i++) {
      i === 2 ? htmlString += '<td>' + numeral(Number(curr[Object.keys(curr)[i]])).format('$0,0.00') + ' /</td>'
              : htmlString += '<td>' + curr[Object.keys(curr)[i]] + '</td>';
    }
    htmlString += '</tr>';
  });
  $result.html(htmlString);
};

$(document).ready(function() {
  $("#search").keyup(function(e){
    e.preventDefault();
    var search = $("#search").val();
    $.post("/vendor/products", {nameText: search}).done(function(data){
      displayList(data);
    });
  });
});