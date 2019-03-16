$(document).ready(() => {

    //Empty selected Numbers
    SelectedNumbers = [];

    //check if gambler exist 
    if(gambler != "Empty"){
        //load again the receipt
        $('#selectNumbersTable').hide();
        $('.betTable').addClass('active');
        SelectedNumbers = gambler.getBetNumbers();
        $('#betValue').html(gambler.getBetMoney());
        $('.gameType').html(SelectedNumbers.length);
        $('.selectedNumbers').html(SelectedNumbers + " ");
        $('#inputBetValue').val(gambler.getBetMoney());
        SelectedNumbers.forEach( (num) => {
            idName = "#selectNumTable"+num;
            $(idName).addClass('active');
        });
        //Enable bet again 
        if(alertCounts> 1){
            //Enable bet again button
            if($('.betTable').hasClass('active')){
                $('#betAgain').addClass('active');
            }
        }
    }

    $('#register').click(() => {
        $('.lightbox').hide();
        let name = $('#name').text;
        let age = $('#age').text;
        person.setName(name);
        person.setAge(age);
        $('#person').html("You are" + person.getName());
    });


    $('.selectNumTable').click( (num) => {
        //check if is already selected
        if ($(num.target).hasClass('active')) {
            $(num.target).removeClass('active');
            //get text
            number = $(num.target).text();
            let index = SelectedNumbers.indexOf(number);
            if (index > -1) {
                //remove it from list
                SelectedNumbers.splice(index, 1);
            }
            //update game type
            $('.gameType').html(SelectedNumbers.length);
        } else if (SelectedNumbers.length == 12) {
            //check if is reach the maximum numbers
            $('.gameType').html("12 ! reach the maximum Numbers");
        } else {
            //New selection add it to the list and change class to active
            $(num.target).addClass('active');
            number = $(num.target).text();
            SelectedNumbers.push(number);
            $('.gameType').html(SelectedNumbers.length);
        }
        if (SelectedNumbers.length == 0) {
            $('.gameType').html('');
        }
        //Show the selectedNumbers array
        $('.selectedNumbers').html(SelectedNumbers + " ");

    });


    $('#bet').click( () => {
        //Create a Gambler object
        gambler = factory.create('gambler');;
        //get input value
        let value = $('#inputBetValue').val();
        //Try to make it a Nmber
        let checkBet = Number(value);
        //Check if select at least one number
        if(SelectedNumbers === undefined || SelectedNumbers.length == 0){
            alert("You have to select at least one number!!!");
        }else if(checkBet == 0 || isNaN(checkBet)){
            //check if money is number or is not empty
            alert("Bet Money is Empty or Not a Number or 0!!!");
        }else{
            //Bet reciept
            $('#betValue').html(value);
            $('#selectNumbersTable').hide();
            $('#betAgain').removeClass('active');
            $('.betTable').addClass('active');
            //Fill gambelr with selectedNumbers socketID and bet money
            gambler.setPerson(person);
            gambler.setBetNumbers(SelectedNumbers);
            gambler.setBetMoney(value);
            //Emit event send gambler data to the server and serialize data
           socket.emit('addGambler',gambler.getSerializeData());
        }
    });

    //Bet again 
    $('#betAgain').click( () => { 
        $('#selectNumbersTable').show();
        $('.betTable').removeClass('active');
        $('#betAgain').removeClass('active');
        alertCounts= 1;
        gambler = "Empty";
    });

    socket.on('betTime', (data)=> {
        //Enable button bet
        $('#betMsg').removeClass('active');
        $('#bet').addClass('active');
        //Change the state of keno
        let text = "Next Draw : " + data;
        //CHange color to green
        $('#kenoCount').css('color','green');
        $('#kenoCount').html(text);

        if(numToTable.length != 0){
            //Change color to each number in table
            numToTable.forEach( elem => {
                $(elem).css('background-color','#4CAF50');
            });
        }
    });

    socket.on('waitTime', (data)=> {
        //Disable button bet
        $('#betMsg').addClass('active');
        $('#bet').removeClass('active');
        //Change state of keno
        let text = "KENO numbers will appear in : " + data;
        //change color to red
        $('#kenoCount').css('color','red');
        $('#kenoCount').html(text);
    });

    //When wait time ends 
    socket.on('waitEndTime',(data) =>{
        //Enable bet again button
        if($('.betTable').hasClass('active')){
            $('#betAgain').addClass('active');
        }
        //Set Numbers to keno object
        keno.setNumbers(data);
        //Fill numToTable with id divs
        numToTable = keno.getNumbers().map( elem => "#gameNumTable"+elem);
        //Change color to each number in table
        numToTable.forEach( elem => {
            $(elem).css('background-color','#4CAF50');
        });
    });

    socket.on('betEndTime', () => {
        //Empty keno table change color to white
        numToTable.forEach( elem => {
            $(elem).css('background-color','white');
        });
    });

    socket.on('reward',(data) => {
        //Get the reward of each player
        if(alertCounts == 1){
            if(data == 0)
            {   
                alert("Congratulations !!\nYou win a cucumber!!!");
            }else {
                alert("Congratulations !!\nYou win : $"+data);
            }
            alertCounts++;
        }
    });

});

