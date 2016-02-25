$(function() {

  function login() {
    $.ajax({
      method: 'GET',
      url: '/auth/signin',
      headers: {
        authorization: "Basic " + btoa($('#usernameInput').val() + ":" + $('#passwordInput').val())
      }
    }).done(function(data) {
      window.location.replace("/../vendor.html");
    }).fail(function(data) {

    });
  }

  $('#loginButton').click(login);
  $('#loginFields input').keypress(function(e) {
    if (e.which === 13) login();
  })

});

