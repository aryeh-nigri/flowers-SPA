$(function(){
    $('#form-signin').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/login', //this is the submit URL
            type: 'POST', //or POST
            data: $('#form-signin').serialize(),
            success: function(data){
                 alert('successfully submitted');
            }
        });
    });
});