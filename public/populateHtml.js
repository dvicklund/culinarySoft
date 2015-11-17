var htmlString = "";

$.get('/vendor/product', function(data) {
  $headers = $("#listHeaders");
  $list = $("#listBody");
  var htmlString = '';
  data.forEach(function(curr, i, arr) {
    htmlString += '<tr id="' + curr._id + '">';
    htmlString += '<td><form action="/vendor/product/' + curr._id + '" method="POST"><input type="submit" value="Remove"></input></form></td><';
    for(var j = 1; j < Object.keys(curr).length - 1; j++) {
      j === 2 ? htmlString += '<td>' + numeral(Number(curr[Object.keys(curr)[j]])).format('$0,0.00') + ' /</td>'
              : htmlString += '<td>' + curr[Object.keys(curr)[j]] + '</td>';
    }
    htmlString += '</tr>';
  });
  $list.append(htmlString);
});

