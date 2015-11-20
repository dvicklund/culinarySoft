$(function() {
  $username = $('#usernameInput');
  $password = $('#passwordInput');

  $('#passwordInput').keypress(function(e) {
    if(e.which == 13) {
      $.ajax({
        method: 'GET',
        url: '/auth/signin', 
        headers: {
          authorization: "Basic " + btoa($('#usernameInput').val() + ":" + $('#passwordInput').val())
        }
      }).done(function(data) {
        window.location.replace("/../vendor.html");
      });
    }
  });
});

