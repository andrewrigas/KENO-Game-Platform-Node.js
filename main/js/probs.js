$(document).ready(() => {

    //Empty selected Numbers
    SelectedNumbers = [];

    $('.selectNumTable').click( (num) => {
        if ($(num.target).hasClass('active')) {
            $(num.target).removeClass('active');
            number = $(num.target).text();
            let index = SelectedNumbers.indexOf(number);
            if (index > -1) {
                SelectedNumbers.splice(index, 1);
            }
            $('.gameType').html(SelectedNumbers.length);
        } else if (SelectedNumbers.length == 12) {
            $('.gameType').html("12 ! reach the maximum Numbers");
        } else {
            $(num.target).addClass('active');
            number = $(num.target).text();
            SelectedNumbers.push(number);
            $('.gameType').html(SelectedNumbers.length);
        }
        if (SelectedNumbers.length == 0) {
            $('.gameType').html('');
        }

        $('.selectedNumbers').html(SelectedNumbers + ' ');
    });


    $('#request').click( () => {
        if(SelectedNumbers === undefined || SelectedNumbers.length == 0){
            alert("You have to select at least one number!!!");
        }else{
            //Create a User
            user = factory.create("user");
            $("#uselectedNum").html("Waiting for Response......");
            $("#totalGames").html(" ");
            $("#relatedGames").html(" ");
            $("#posi").html("");
            user.setPerson(person);
            user.setSelectedNumbers(SelectedNumbers);
            socket.emit('requestHistory',user.getSerializeData());
        }
        
    });

    socket.on('responseHistory', (data) => {
        $("#uselectedNum").html("Selected Numbers: "+data.selectedNum);
        $("#totalGames").html("Total Games: "+ data.total);
        $("#relatedGames").html("Related Games: "+ data.relatedGames);
        $("#posi").html("The Possibility: "+ data.pos+"%");
    });
});