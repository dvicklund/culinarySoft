var htmlString = "";

$.get('/vendor/product', function(data) {
  $headers = $("#listHeaders");
  $list = $("#listBody");
  var htmlString = '';
  data.forEach(function(curr, i, arr) {
    htmlString += '<tr><td>';
    for(var i = 1; i < Object.keys(curr).length - 1; i++) {
      i === 2 ? htmlString += numeral(Number(curr[Object.keys(curr)[i]])).format('$0,0.00') + '</td><td>' 
              : htmlString += curr[Object.keys(curr)[i]] + "</td><td>";
    }
    htmlString += '</td></tr>';
  });
  htmlString += data + '</td></tr>';
  $list.append(htmlString);
});

