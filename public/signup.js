$(function() {
  $firstname = $('#newFirstName');
  $lastname = $('#newLastName');
  $email = $('#newEmail');
  $username = $('#newUsername');
  $password = $('#newPassword');
  $passwordConf = $('#newPasswordConf');

  $('#newPasswordConf').keypress(function(e) {
    if(e.which == 13) {
      if($password.val() == $passwordConf.val()) {
        var signupData = {
          'email': $email.val(),
          'firstname': $firstname.val(),
          'lastname': $lastname.val(),
          'username': $username.val(),
          'password': $password.val()
        };
        $.post('/auth/signup', signupData).done(function() {
          window.location.replace('/../client.html');
        });
      } else {
        $('#failureAlert').text('Passwords do not match!');
      }
    }
  });
});

