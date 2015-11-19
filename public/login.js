$(function() {
  $username = $('#usernameInput');
  $password = $('#passwordInput');

  $('#passwordInput').keypress(function(e) {
    console.log("key pressed");
    if(e.which == 13) {
      $.post('/auth/signup', {username: $username.val(), password: $password.val()}, function(data, status) {
        console.log('success!'); 
      });
      return false;
    }
  });
});
