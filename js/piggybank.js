$(document).ready(function(){
     //creating register logic
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
                                let walletData ={
                                    'amount' : 0,
                                    'profilesId' : data.id,
                                    'dateTime' : ''
                                   }

                                $.ajax({
                                    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                                    url         : 'http://localhost:3000/wallet', // the url where we want to POST
                                    data        : walletData, // our data object
                                    dataType    : 'json', // what type of data do we expect back from the server
                                    encode          : true
                                }).done(function(data){
                                    console.log(data);
                                })

                               
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
        let accountNumber  = $('#account').val();
        let bvn     = $('#bvn').val();
        let pin     = $('#pin').val();
        let otp  = $('#otp').val();
        console.log(amount);

        //get profile id and send to GET endpoint
        let id = $('#id').val();

        var error;
        if (amount === '' || account==='' ||  bvn ==='' || pin ==='' || otp ==='') {
            error = true;
        }

        $.ajax({
            type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://localhost:3000/account?profilesId='+ id, // the url where we want to POST
            // data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            // async: false,
            success: function(res){
                console.log(res);
                 let depositStatus;
                 let accountStatus;
                 let bvnStatus;
                 let pinStatus;
                 let typeOfTransaction = 'deposit';
                 let profile = res[0].profilesId;
                 let walletDeposit;
                 console.log(res[0].profilesId);
                res.forEach(element => {
                   if (element.accountBalance > amount) {
                        console.log(element.accountBalance)
                      depositStatus = true;
                      console.log(depositStatus);
                   }else{
                      depositStatus = false; 
                   } 


                   if (element.accountNumber === accountNumber) {
                     accountStatus = true;
                     console.log(accountStatus);
                   }else{
                     accountStatus = false; 
                   } 

                   if (element.bvn === bvn) {
                      bvnStatus = true; 
                      console.log(bvnStatus);
                   }else{
                       bvnStatus = false;
                   }

                   if (element.pin === pin) {
                       pinStatus = true; 
                       console.log(pinStatus);
                   }else{
                        pinStatus = false;
                    }


                    if (depositStatus && accountStatus && bvnStatus && pinStatus) {
                         
                        var accountData = {
                            'amount'      : amount,
                            'account'     : accountNumber,
                            'BVN'         : bvn,
                            'transactionType' : typeOfTransaction,
                            'profilesId' :  profile
                        };
                        console.log(profile);
                    
                        $.ajax({
                            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                            url         : 'http://localhost:3000/transaction', // the url where we want to POST
                            data        :  accountData, // our data object
                            dataType    : 'json', // what type of data do we expect back from the server
                            encode          : true
                        }).done(function(data) {
                                                     
                            // log data to the console so we can see
                            console.log(data);
                            
                            walletDeposit = true;
                    
                            // here we will handle dummy account creation and saving to account table
                            // generateAccountDetails(data.firstname,data.lastname,data.phone,data.id);

                            if (walletDeposit) {

                                $.ajax({
                                    type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
                                    url         : 'http://localhost:3000/wallet?profilesId='+ profile, // the url where we want to POST
                                    // data        : formData, // our data object
                                    dataType    : 'json', // what type of data do we expect back from the server
                                    // async: false,
                                    success: function(res){
                                        // console.log(res);
                                         console.log(res);
                                         console.log(res[0].amount);
                                         console.log(res[1].amount);
                                         let responseObj = res[0];
                                        
                                         let amountOne = parseInt(res[0].amount) 
                                         let amountTwo = parseInt(accountData.amount);

                                         let newAmount = amountOne + amountTwo;
                                        // updating new amount using PATCH method
                                        let info ={
                                            "amount":newAmount
                                        }
                                        

                                         console.log(responseObj)


                                         $.ajax({
                                                type        : 'PATCH', // define the type of HTTP verb we want to use (POST for our form)
                                                url         : 'http://localhost:3000/wallet/'+responseObj.id, // the url where we want to POST
                                                data        :  JSON.stringify(info), // our data object
                                                dataType    : 'json', // what type of data do we expect back from the server
                                                encode          : true
                                            }).done(function(data) {
                                                                       
                                                // log data to the console so we .can see
                                                console.log(data);

                                              
                                            });
                                         

                                 }
                        })
        
        
                              
                              }
                          
                        });

                      }

                     console.log(walletDeposit);
               

                   

                   
                    
                  
                });  
            }      
      
        })

    
        event.preventDefault();

  })

  //creating withdrawal logic



  $('#withdraw-form').submit(function(event) {
    
    let amount = $('#w-amount').val();
    let accountNumber  = $('#w-account').val();
    let bvn     = $('#w-bvn').val();
    let pin     = $('#w-pin').val();
    let otp  = $('#w-otp').val();
    console.log(amount);

    //get profile id and send to GET endpoint
    let id = $('#w-id').val();

    var error;
    if (amount === '' || account==='' ||  bvn ==='' || pin ==='' || otp ==='') {
        error = true;
    }

    $.ajax({
        type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'http://localhost:3000/account?profilesId='+ id, // the url where we want to POST
        // data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        // async: false,
        success: function(res){
            console.log(res);
             let depositStatus;
             let accountStatus;
             let bvnStatus;
             let pinStatus;
             let typeOfTransaction = 'withdrawal';
             let profile = res[0].profilesId;
             let walletWithdrawal;
             console.log(res[0].profilesId);
            res.forEach(element => {
               if (element.accountBalance > amount) {
                    console.log(element.accountBalance)
                  depositStatus = true;
                  console.log(depositStatus);
               }else{
                  depositStatus = false; 
               } 


               if (element.accountNumber === accountNumber) {
                 accountStatus = true;
                 console.log(accountStatus);
               }else{
                 accountStatus = false; 
               } 

               if (element.bvn === bvn) {
                  bvnStatus = true; 
                  console.log(bvnStatus);
               }else{
                   bvnStatus = false;
               }

               if (element.pin === pin) {
                   pinStatus = true; 
                   console.log(pinStatus);
               }else{
                    pinStatus = false;
                }

                //save to transaction table if inputs are valid
                if (depositStatus && accountStatus && bvnStatus && pinStatus) {
                     
                    var accountData = {
                        'amount'      : amount,
                        'account'     : accountNumber,
                        'BVN'         : bvn,
                        'transactionType' : typeOfTransaction,
                        'profilesId' :  profile
                    };
                    console.log(profile);
                
                    $.ajax({
                        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                        url         : 'http://localhost:3000/transaction', // the url where we want to POST
                        data        :  accountData, // our data object
                        dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
                    }).done(function(data) {
                                                 
                        // log data to the console so we can see
                        console.log(data);
                        
                        walletWithdrawal = true;
                
                        // here we will handle dummy account creation and saving to account table
                        // generateAccountDetails(data.firstname,data.lastname,data.phone,data.id);

                        if (walletWithdrawal) {

                            $.ajax({
                                type        : 'GET', // define the type of HTTP verb we want to use (POST for our form)
                                url         : 'http://localhost:3000/wallet?profilesId='+ profile, // the url where we want to POST
                                // data        : formData, // our data object
                                dataType    : 'json', // what type of data do we expect back from the server
                                // async: false,
                                success: function(res){
                                    // console.log(res);
                                     console.log(res);
                                     console.log(res[0].amount);
                                     console.log(res[1].amount);
                                     let responseObj = res[0];
                                    
                                     //check if amount you are trying to withdraw is greater than amount available
                                     if (accountData.amount > res[0].amount) {
                                         
                                        return 'insufficient balance';
                                     }


                                     //if not continue
                                     let amountOne = parseInt(res[0].amount) 
                                     let amountTwo = parseInt(accountData.amount);

                                     let newAmount = amountOne - amountTwo;
                                    // updating new amount using PATCH method
                                    let info ={
                                        "amount":newAmount
                                    }
                                    

                                     console.log(responseObj)


                                     $.ajax({
                                            type        : 'PATCH', // define the type of HTTP verb we want to use (POST for our form)
                                            url         : 'http://localhost:3000/wallet/'+responseObj.id, // the url where we want to POST
                                            data        :  JSON.stringify(info), // our data object
                                            dataType    : 'json', // what type of data do we expect back from the server
                                            encode          : true
                                        }).done(function(data) {
                                                                   
                                            // log data to the console so we .can see
                                            console.log(data);

                                          
                                        });
                                     

                             }
                    })
    
    
                          
                          }
                      
                    });

                  }

                 console.log(walletDeposit);
           

               

               
                
              
            });  
        }      
  
    })


    event.preventDefault();

})


    

})