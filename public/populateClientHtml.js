var htmlString = "";

$.get('/client/product', function(data) {
  $headers = $("#listHeaders");
  $list = $("#listBody");
  var counter = 1;
  var htmlString = '';
  data.forEach(function(curr, i, arr) {
    htmlString += '<tr id="' + curr._id + '">';
    htmlString += '<td><form action="/client/product/' + curr._id + '" method="POST"><input type="submit" value="Remove"></input></form></td><';
    for(var j = 1; j < Object.keys(curr).length - 1; j++) {
      j === 2 ? htmlString += '<td>' + numeral(Number(curr[Object.keys(curr)[j]])).format('$0,0.00') + ' /</td>'
              : htmlString += '<td>' + curr[Object.keys(curr)[j]] + '</td>';
    }
    htmlString += '</tr>';
    counter++;
  });
  $list.append(htmlString);

  $('#UPN').val(counter);
});
