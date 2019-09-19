$(document).ready(function(){
    
    $('#login-form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
       
        let email     = $('#email-login').val();
        let password  = $('#pwd-login').val()
        //check if input field is empty
        var error;
        if (email ==='' || password==='') {
            error = true;
        }

        
     
       $.ajax({
                type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
                url         : 'http://localhost:3000/profiles', // the url where we want to POST
                // data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                // async: false,
                success: function(res){
                    // console.log(res);
                     
                    let varAvailable;
                    console.log(res.length);
                   
                    res.forEach(element => {
                       if (element.email === email && element.password === password) {
                       console.log('logged in');
                       $('#dashboard-firstname').text(element.firstname);
                       $('#dashboard-lastname').val(element.lastname);
                       $('#dashboard-phone').val(element.telephone);
                       var check = $('#dashboard-email').val(element.email);
                         console.log($('#dashboard-email').val());
                         varAvailable = true;
                       window.location.href = "dashboard.html?val1="+element.firstname+"&val2="+
                       element.lastname+"&val3="+element.telephone+"&val4="+element.email+"&val5="+element.id;
                       } 

                       
    
                       
                        
                      
                    });
                   
                 
    
                    
                }
                           
            })


           
       
      
                       

        
        

       

        event.preventDefault();
    });

})