QUnit.test("Checking correct creation of Person", (assert) => {
    let newPerson1 = new Person();
    let newPerson2 = new Person();

    newPerson1.setName('Andreas Rigas');
    newPerson1.setAge(19);
    newPerson1.setSocketID("ADRRD1123FGH");

    assert.ok(newPerson1, "Check if person1 is not null");

    assert.equal(newPerson1.getID(), 1, "Check person1 ID");

    assert.equal(newPerson1.getName(), "Andreas Rigas", "Check person1 name");

    assert.equal(newPerson1.getAge(), 19, "Check person1 age");
    
    assert.equal(newPerson1.getSocketID(), "ADRRD1123FGH", "Check socket id");
    
    assert.ok(newPerson2, "Check if person2 is not null");

    assert.equal(newPerson2.getID(), 2, "Check person2 ID");

});

QUnit.test("Checking correct creation of Gamblers", (assert) => {
    let newPerson1 = new Person();
    let newPerson2 = new Person();

    newPerson1.setName('Andreas Rigas');
    newPerson1.setAge(19);
    newPerson1.setSocketID("ADRRD1123FGH");

    let newGambler1 = new Gambler();
    let newGambler2 = new Gambler();

    let arr = [1,2,3];
    let money = 10;

    newGambler1.setBetNumbers(arr);
    newGambler1.setBetMoney(money);

    newGambler1.setPerson(newPerson1);
    newGambler2.setPerson(newPerson2);

    gamblerPerson1 = newGambler1.getPerson();
    gamblerPerson2 = newGambler2.getPerson();

    assert.ok(newGambler1, "Check if gambler1 is not null");

    assert.ok(newGambler2, "Check if gambler2 is not null");

    assert.equal(gamblerPerson1.getName(), "Andreas Rigas", "Check gambler name");

    assert.equal(gamblerPerson1.getAge(), 19, "Check user age");
    
    assert.equal(newGambler1.getBetNumbers(), arr, "Check gambler bet Numbers");

    assert.equal(newGambler1.getBetMoney(), money, "Check gambler bet money");

    assert.equal(gamblerPerson1.getSocketID(), "ADRRD1123FGH", "Check socket id");
    

});


QUnit.test("Checking correct creation of Users", (assert) => {
    let newPerson1 = new Person();
    let newPerson2 = new Person();

    newPerson1.setName('Andreas Rigas');
    newPerson1.setAge(19);
    newPerson1.setSocketID("ADRRD1123FGH");

    let newUser1 = new User();
    let newUser2 = new User();

    let arr = [1,2,3];
  
    newUser1.setSelectedNumbers(arr);

    newUser1.setPerson(newPerson1);
    newUser2.setPerson(newPerson2);

    userPerson1 = newUser1.getPerson();
    userPerson2 = newUser2.getPerson();

    assert.ok(newUser1, "Check if user1 is not null");

    assert.ok(newUser2, "Check if user2 is not null");

    assert.equal(userPerson1.getName(), "Andreas Rigas", "Check user1 name");

    assert.equal(userPerson1.getAge(), 19, "Check user1 age");
    
    assert.equal(newUser1.getSelectedNumbers(), arr, "Check user1 selected Numbers");

    assert.equal(userPerson1.getSocketID(), "ADRRD1123FGH", "Check socket ID");
    

});


QUnit.test("Checking correct creation of Keno Game", (assert) => {
    let keno = new Game();
    let keno2 = new Game();

    let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    let arr2 = [1,2,3];
    keno.setNumbers(arr);
    keno2.setNumbers(arr2);

    assert.ok(keno, "Check if keno is not null");

    assert.equal(keno.getNumbers(), arr, "Check keno numbers");

    assert.equal(keno.getID(), 1, "Check keno id");

    assert.equal(keno2.getNumbers(), 0, "Check keno2 numbers");

    assert.equal(keno2.getID(), 2, "Check keno2 id");
    
});


QUnit.test("Checking correct creation by Factory Pattern of Person", (assert) => {
    let newPerson1 = factory.create("person");
    let newPerson2 = factory.create("person");

    newPerson1.setName('Andreas Rigas');
    newPerson1.setAge(19);
    newPerson1.setSocketID("ADRRD1123FGH");

    assert.ok(newPerson1, "Check if user is not null");


    assert.equal(newPerson1.getName(), "Andreas Rigas", "Check user name");

    assert.equal(newPerson1.getAge(), 19, "Check user age");
    
    assert.equal(newPerson1.getSocketID(), "ADRRD1123FGH", "Check bet money");
    
    assert.ok(newPerson2, "Check if user2 is not null");
});

QUnit.test("Checking correct creation by Factory Pattern of Gambler", (assert) => {
    let newPerson1 = factory.create("person");
    let newPerson2 = factory.create("person");

    newPerson1.setName('Andreas Rigas');
    newPerson1.setAge(19);
    newPerson1.setSocketID("ADRRD1123FGH");

    let newGambler1 = factory.create("gambler");
    let newGambler2 = factory.create("gambler");

    let arr = [1,2,3];
    let money = 10;

    newGambler1.setBetNumbers(arr);
    newGambler1.setBetMoney(money);

    newGambler1.setPerson(newPerson1);
    newGambler2.setPerson(newPerson2);

    gamblerPerson1 = newGambler1.getPerson();
    gamblerPerson2 = newGambler2.getPerson();

    assert.ok(newGambler1, "Check if gambler1 is not null");

    assert.ok(newGambler2, "Check if gambler2 is not null");

    assert.equal(gamblerPerson1.getName(), "Andreas Rigas", "Check gambler name");

    assert.equal(gamblerPerson1.getAge(), 19, "Check user age");
    
    assert.equal(newGambler1.getBetNumbers(), arr, "Check gambler bet Numbers");

    assert.equal(newGambler1.getBetMoney(), money, "Check gambler bet money");

    assert.equal(gamblerPerson1.getSocketID(), "ADRRD1123FGH", "Check socket id");
    

});


QUnit.test("Checking correct creation by Factory Pattern of User", (assert) => {
    let newPerson1 = factory.create("person");
    let newPerson2 = factory.create("person");

    newPerson1.setName('Andreas Rigas');
    newPerson1.setAge(19);
    newPerson1.setSocketID("ADRRD1123FGH");

    let newUser1 = factory.create("user");
    let newUser2 = factory.create("user");

    let arr = [1,2,3];
  
    newUser1.setSelectedNumbers(arr);

    newUser1.setPerson(newPerson1);
    newUser2.setPerson(newPerson2);

    userPerson1 = newUser1.getPerson();
    userPerson2 = newUser2.getPerson();

    assert.ok(newUser1, "Check if user is not null");

    assert.ok(newUser2, "Check if user2 is not null");

    assert.equal(userPerson1.getName(), "Andreas Rigas", "Check user name");

    assert.equal(userPerson1.getAge(), 19, "Check user age");
    
    assert.equal(newUser1.getSelectedNumbers(), arr, "Check user selected Numbers");

    assert.equal(userPerson1.getSocketID(), "ADRRD1123FGH", "Check bet money");

});

QUnit.test("Checking correct creation by Factory Pattern of Keno Game", (assert) => {
    let keno3 = factory.create("keno");
    let keno4 = factory.create("keno");

    let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    let arr2 = [1,2,3];

    keno3.setNumbers(arr);
    keno4.setNumbers(arr2);

    assert.ok(keno3, "Check if keno is not null");

    assert.equal(keno3.getNumbers(), arr, "Check keno numbers");

    assert.equal(keno3.getID(), 3, "Check keno id");

    assert.equal(keno4.getNumbers(), 0, "Check keno2 numbers");

    assert.equal(keno4.getID(), 4, "Check keno2 id");
});


QUnit.test("Checking Keno Algorithms Functions", (assert) => {
    let newPerson1 = factory.create("person");
    let newPerson2 = factory.create("person");

    let newGambler1 = factory.create("gambler");
    let newGambler2 = factory.create("gambler");
    let arr = ['1','2','3'];
    let arr2 = [11,22,33];
    newPerson1.setName('Andreas Rigas');
    newPerson1.setAge(20);
    newGambler1.setBetNumbers(arr);
    newGambler1.setBetMoney(3);
    newPerson2.setName('Marios pampou');
    newPerson2.setAge(21);
    newGambler2.setBetNumbers(arr2);

    newGambler1.setPerson(newPerson1);
    newGambler2.setPerson(newPerson2);

    let numbers = ["41", "3", "58", "47", "62", "24", "7", "76", "53", "17", "1", "75", "25", "48", "5", "20", "40", "8", "29", "21"];

    gamblers = [newGambler1.getSerializeData(),newGambler2.getSerializeData()]

    let randomNumbers = getKenoNumbers(gamblers);

    //get only unique values
    let uniqueNumbers = [...new Set(randomNumbers)];

    let reward = findReward(newGambler1.getSerializeData(),numbers);

    let reward2 = getReward(numbers,newGambler1.getSerializeData());

    let list1 = ["41", "3", "58", "47"];
    let list2 = ["24", "7", "76","58","41"];
    let list3 = ["41","58"];
    let interception = commonNumbers(list1,list2);

    assert.equal(randomNumbers.length, 20, "Check random numbers length");

    assert.equal(uniqueNumbers.length, 20, "Check if all numbers are different");

    assert.equal(reward, 7.5, "Check find reward function");

    assert.deepEqual(interception, list3, "Check common numbers function");

    assert.deepEqual(reward2, 7.5, "Check getReward function");

});

QUnit.test("Checking Keno Probabilities Functions", (assert) => {
   let historyCSV = "720741,28/12/2018,21:55,2,4,8,10,16,23,24,29,37,43,49,50b,51,54,57,60,61,65,67,68;720740,28/12/2018,21:50,3,15,21,23,24,28,29,32,36,37,45,46,48,50,61,66,70,75,76b,78;";
   let arrH = [
       ['720741','28/12/2018','21:55','2','4','8','10','16','23','24','29','37','43','49','50','51','54','57','60','61','65','67','68'],
       ['720740','28/12/2018','21:50','3','15','21','23','24','28','29','32','36','37','45','46','48','50','61','66','70','75','76','78']];
   let historyArray = textToArray(historyCSV);
   let historyArray2 = getKenoResults(historyCSV);

   let newPerson1 = factory.create("person");
   let user = factory.create("user");
   

   let arr = ['2','4'];

   newPerson1.setName('Andreas Rigas');
   newPerson1.setAge(20);
   user.setSelectedNumbers(arr);

   user.setPerson(newPerson1);

   let arrayOnlyNumbers = historyArray.map( elem => elem.slice(3));
   
   let relatedGames = getRelatedGames(arrayOnlyNumbers,user.getSelectedNumbers());

   let relatedGames1 = divideToSmallerTasks(arrayOnlyNumbers,user.getSelectedNumbers());

   let object = findPropability(user.getSerializeData(),historyArray);
   
   assert.deepEqual(historyArray, arrH, "Check textToArray function");

   assert.deepEqual(historyArray2, arrH, "Check getKenoResults function");

   assert.equal(relatedGames, 1, "Check getRelatedGames function");

   assert.equal(relatedGames1, 1, "Check divideToSmallerTasks function");

   assert.equal(object.pos, 50, "Check findPropability function possibility");

   assert.equal(object.relatedGames, 1, "Check findPropability function related Games");

   assert.equal(object.selectedNum, user.getSelectedNumbers(), "Check findPropability function selected Numbers");

   assert.equal(object.total, 2, "Check findPropability function total games");
});