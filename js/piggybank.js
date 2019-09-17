$(document).ready(function(){

        $('#register-form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        let firstname = $('#firstname').val();
        let lastname  = $('#lastname').val();
        let phone     = $('#phone').val();
        let email     = $('#email').val();
        let password  = $('#pwd').val()
        //check if input field is empty
        var error;
        if (firstname === '' || lastname==='' || phone ==='' || email ==='' || password==='') {
            error = true;
        }

        
      
       //check if input information already exist     
     
       $.ajax({
                type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
                url         : 'http://localhost:3000/profiles', // the url where we want to POST
                // data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                // async: false,
                success: function(res){
                    // console.log(res);
                     
                    let errorArr =[];
                    console.log(res.length);
                    let count = 0;
                    res.forEach(element => {
                       if (element.email === email) {
                        errorArr.push(true);
                       } 

                       
    
                       
                        
                      
                    });
                   console.log(errorArr);

                    if (!errorArr.includes(true)) {
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
    
                    
                }
                           
            })


           
       
      
                       

        
        

       

        event.preventDefault();
    });

    
    

})