$(document).ready( () => {

    let selectTable = createTable("selectNumTable");
    let gameTable = createTable("gameNumTable");
    $('.selectTable').html(selectTable);
    $('.gameTable').html(gameTable);
   

});

function createTable(className) {
    let table;
    for (i = 0; i < 8; i++) {
        table += "<tr>";
        for (k = 1; k <= 10; k++) {
            n = k + i * 10;
            table += "<td> <div id='"+className+n+"' class='"+className+"' >" + n + "</div></td>";
        }
        table += "</tr>";
    }
    return table;
}