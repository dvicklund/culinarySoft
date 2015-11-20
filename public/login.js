$(function() {
  $username = $('#usernameInput');
  $password = $('#passwordInput');

  $('#passwordInput').keypress(function(e) {
    if(e.which == 13) {
      console.log("attempting signin with username: " + $('#usernameInput').val() + " and password: " + $('#passwordInput').val());
      $.ajax({
        method: 'GET',
        url: '/auth/signin', 
        headers: {
          authorization: "Basic " + btoa($('#usernameInput').val() + ":" + $('#passwordInput').val())
        }
      });
    }
  });
});

