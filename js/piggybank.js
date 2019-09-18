$(document).ready(function(){

        $('#register-form').submit(function(event) {

        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        let firstname = $('#firstname').val();
        let lastname  = $('#lastname').val();
        let phone     = $('#phone').val();
        let email     = $('#email').val();
        let password  = $('#pwd').val();
        let id         = '';
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
                            'id'                 : id
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
                                console.log(data.id);
                               
                                // here we will handle dummy account creation and saving to account table
                                // generateAccountDetails(data.firstname,data.lastname,data.phone,data.id);
                               
                            });
                    }else{
                        console.log('error');
                    }
    
                    
                }
                           
            })


           
       
      
                       

        
        

       

        event.preventDefault();
    });


    //creating login logic


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
                     
                    
                    console.log(res.length);
                   
                    res.forEach(element => {
                       if (element.email === email && element.password === password) {
                       console.log('logged in');
                       } 

                       
    
                       
                        
                      
                    });
                   
                 
    
                    
                }
                           
            })


           
       
      
                       

        
        

       

        event.preventDefault();
    });

  function generateAccountDetails(firstname,lastname,phone,id) {

    let accountName = firstname +' '+ lastname;
    let accountPhone = phone;
    let accountBalance = 20000;
    let bvn = 2222222222;
    let accountNumber = 1111111111;
    let profile = id;
    var accountData = {
        'accountName'        : accountName,
        'accountNumber'      : accountNumber,
        'accountBalance'     : accountBalance,
        'phone'              : accountPhone,
        'BVN'                : bvn,
        "profilesId"         : profile
       
    };

    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'http://localhost:3000/account', // the url where we want to POST
        data        :  accountData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true
    })  .done(function(data) {
                                 
        // log data to the console so we can see
        console.log(data);
        
        

        // here we will handle dummy account creation and saving to account table
        // generateAccountDetails(data.firstname,data.lastname,data.phone,data.id);
      
    });

  }

  //depositing into wallet
  $('#deposit-form').submit(function(event) {
    
        let amount = $('#amount').val();
        let account  = $('#account').val();
        let bvn     = $('#bvn').val();
        let pin     = $('#pin').val();
        let otp  = $('#otp').val();

        var error;
        if (amount === '' || account==='' ||  bvn ==='' || pin ==='' || otp ==='') {
            error = true;
        }

        $.ajax({
            type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://localhost:3000/account', // the url where we want to POST
            // data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            // async: false,
            success: function(res){
                // console.log(res);
                 let depositStatus;
                 let accountStatus;
                 let bvnStatus;
                
                res.forEach(element => {
                   if (element.accountBalance > amount) {
                      depositStatus = true;
                   }else{
                      depositStatus = false; 
                   } 


                   if (element.accountNumber === account) {
                     accountStatus = true;
                   }else{
                     accountStatus = false; 
                   } 

                   if (element.bvn === bvn) {
                      bvnStatus = true; 
                   }else{
                       bvnStatus = false;
                   }

                   

                   
                    
                  
                });  
            }      
      
        })

    var accountData = {
        'amount'      : amount,
        'account'     : accountNumber,
        'pin'         : pin,
        'BVN'         : bvn,
        "otp"         : otp
       
    };

    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'http://localhost:3000/account', // the url where we want to POST
        data        :  accountData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode          : true
    })  .done(function(data) {
                                 
        // log data to the console so we can see
        console.log(data);
        
        

        // here we will handle dummy account creation and saving to account table
        // generateAccountDetails(data.firstname,data.lastname,data.phone,data.id);
      
    });


  })
    

})