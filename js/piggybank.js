$(document).ready(function(){

        $('#register-form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        let firstname = $('#firstname').val();
        let lastname  = $('#lastname').val();
        let phone     = $('#phone').val();
        let email     = $('#email').val();
        let password  = $('#password').val()
        //check if input field is empty
        let error;
        if (firstname === '' || lastname==='' || phone ==='' || email ==='' || password==='') {
            error = true;
        }

       //check if input information already exist      
                       

        if (!error) {
            var formData = {
                'firstname'          : firstname,
                'lastname'           : lastname,
                'phone'              : phone,
                'email'              : email,
                'password'           : password,
            };
    
            // process the form
            $.ajax({
                type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url         : 'http://localhost:3000/profiles', // the url where we want to POST
                data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                encode          : true
            })
                //using the done promise callback
                .done(function(data) {
                     
                    // log data to the console so we can see
                    console.log(data); 
    
                    // here we will handle errors and validation messages
                });
        }else{
            console.log('error');
        }
        

       

        event.preventDefault();
    });

    
    function formValidation(formInput,endPoint){

        if (!formInput.isArray) {
           return 'first arguement should be an array'; 
        }
        
        $.ajax({
            type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://localhost:3000/profiles', // the url where we want to POST
            // data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            success: function(res){
                // console.log(res);
                console.log(res.length);
                let count = 0;
                res.forEach(element => {
                console.log(element); 

                if (element.email === email) {
                    console.log('user email already exist');
                }

                count++;
                    
                
                /*
                    create a default pagination that breaks out of the loop after a certain
                    count has been reached (10-20)

                */
                    console.log(count);
                });
            }
                    
        })
    }

})