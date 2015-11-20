$(function() {
  $username = $('#usernameInput');
  $password = $('#passwordInput');

  $('#passwordInput').keypress(function(e) {
    if(e.which == 13) {
      window.location.replace("/../vendor.html");
      // $.ajax({
      //   method: 'GET',
      //   url: '/vendor/', 
      //   headers: {
      //     authorization: "Basic " + btoa($('#usernameInput').val() + ":" + $('#passwordInput').val())
      //   }
      // });
    }
  });
});

