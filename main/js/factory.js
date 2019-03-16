factory = {
    create: function(type){
        if(type == 'person'){
            return new Person();
        }else if (type == 'keno') {
            return new Game();
        } else if (type == 'user') {
            return new User();
        } else if(type == 'gambler') {
            return new Gambler();
        }
    }
}
