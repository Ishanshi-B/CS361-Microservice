$(document).ready(function() {
    $("#get-quote").click(function() {
      $.ajax({
        url: '/get-quote',
        type: 'GET',
        success: function(response) {
          $("#quote").html(response);
        }
      });
    });
  });