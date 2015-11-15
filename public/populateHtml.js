$(function() {
  $headers = $("#listHeaders");
  $list = $("#listBody");
  $.get('/vendor/product', function(data) {
    var htmlString = '';
    data.forEach(function(curr, i, arr) {
      htmlString += '<tr><td>';
      for(var i = 1; i < Object.keys(curr).length - 1; i++) {
        htmlString += curr[Object.keys(curr)[i]] + "</td><td>";
      }
      htmlString += '</td></tr>';
    });
    htmlString += data + '</td></tr>';
    
    $list.append(htmlString);
  }).done(function(data) {
    // TODO: add success message
  });
  // $('#showList').click(function(event) {
  // });    
});
