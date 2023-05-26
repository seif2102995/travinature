$(document).ready(function () {
    $("#user").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#user').val();
        $.ajax({
            url: '/user/checkUN',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: data }),
            success: function (response) {
                $('#result').html('UserName is ' + response);

                if (response == 'taken') {
                    $('#result').css("color", "red");
                }
                else {
                    $('#result').css("color", "green");
                }
            }
        });
    });
});