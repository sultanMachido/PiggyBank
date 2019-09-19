$(document).ready(function(){

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
        if (amount === '' || accountNumber ==='' ||  bvn ==='' || pin ==='' || otp ==='') {
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
                                            
                                            console.log('insufficient balance')
                                             
                                            return 'insufficient balance';
                                         }
    
    
                                         //if not continue
                                         let amountOne = parseInt(res[0].amount) 
                                         let amountTwo = parseInt(accountData.amount);
    
                                         let newAmount = amountTwo - amountOne;
                                        // updating new amount using PATCH method
                                        let info ={
                                            'amount':newAmount
                                        }
                                        
                                        console.log(newAmount);
    
                                         console.log(responseObj)
    
    
                                         $.ajax({
                                                type        : 'PATCH', // define the type of HTTP verb we want to use (POST for our form)
                                                url         : 'http://localhost:3000/wallet/'+responseObj.id, // the url where we want to POST
                                                data        :  info, // our data object
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