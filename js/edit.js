$(document).ready(function(){

    console.log(window.location.search)
    var urlParams = new URLSearchParams(window.location.search);
    var idEdit = urlParams.get('id');
    console.log(idEdit)
    
    $.ajax({
        type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'http://localhost:3000/profiles?id='+idEdit, // the url where we want to POST
        // data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        // async: false,
        success: function(res){
            console.log(res);
             
            let errorArr =[];
            console.log(res.length);
            let count = 0;
            res.forEach(element => {
               console.log(element)
               $('#edit-firstname').val(element.firstname);
               $('#edit-lastname').val(element.lastname);
               $('#edit-phone').val(element.telephone);
               $('#edit-email').val(element.email);
               $('#edit-pwd').val(element.password);
            })
        }
    })

    $('#edit-form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        let firstname = $('#edit-firstname').val();
        let lastname  = $('#edit-lastname').val();
        let phone     = $('#edit-phone').val();
        let email     = $('#edit-email').val();
        let password  = $('#edit-pwd').val();
        let id         = '';
        //check if input field is empty
        var error;
        if (firstname === '' || lastname==='' || phone ==='' || email ==='' || password==='') {
            error = true;
        }
        

        let info ={
            'firstname':firstname,
            'lastname':lastname,
            'telephone':phone,
            'email':email,
            'password':password,
        }
       
       //check if input information already exist     
       $.ajax({
        type        : 'PATCH', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'http://localhost:3000/profiles/'+idEdit, // the url where we want to POST
        data        :  info, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true
    }).done(function(data) {
                               
        // log data to the console so we .can see
        console.log(data);

      
    });
      
            event.preventDefault();
    });


        

})