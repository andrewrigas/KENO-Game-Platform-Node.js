$(document).ready( () => {

    $("#btnRegister").click( ()=> {
        let name = $("#inputName").val();
        let age = $("#inputAge").val();
        console.log("123");
        let checkAge= Number(age);

        if(name.length == 0 || name === undefined){
            alert("Insert a name please");
        }else if(checkAge < 18 || isNaN(checkAge)){
            alert("Not a number or you are too young!");
        }else{
            //Set name and age to the person
            person.setName(name);
            person.setAge(age);
            //Move to the Multiplayer page
            loadMultiplayerPage();
        }
    });

});