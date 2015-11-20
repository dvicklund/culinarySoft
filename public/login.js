$(function() {
  $username = $('#usernameInput');
  $password = $('#passwordInput');

  $('#passwordInput').keypress(function(e) {
    if(e.which == 13) {
      var loginData = {
        'username': $username.val(),
        'password': $password.val()
      };
      $.post('/auth/signup', loginData);
    }
  });
});
