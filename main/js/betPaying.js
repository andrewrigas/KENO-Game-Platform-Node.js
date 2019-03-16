$(document).ready( () => {
    let pTable = payTable();
    $('.payingTable').html(pTable);
});

function payTable() {
    let arr = [
        ['2.5'],
        ['5', '1'],
        ['25', '2.5', '0'],
        ['100', '4', '1', '0'],
        ['450', '20', '2', '0', '0'],
        ['1.600', '50', '7', '1', '0', '0'],
        ['5.000', '100', '20', '3', '1', '0', '0'],
        ['15.000', '1.000', '50', '10', '2', '0', '0', '0'],
        ['40.000', '4.000', '200', '25', '5', '1', '0', '0', '0'],
        ['100.000', '10.000', '500', '80', '20', '2', '0', '0', '0', '0'],
        ['500.000', '15.000', '1.500', '250', '50', '10', '1', '0', '0', '0', '0'],
        ['1.000.000', '25.000', '2.500', '1.000', '150', '25', '5', '0', '0', '0', '0', '0']];

    let table = '';
    for (i = 12; i > 0; i--) {
        table += "<table class='payTable w3-card-4'>";
        table += "<tr>";
        table += "<th class='gameTypes' style='width=200px;'> Game Type " + i + "</th>";
        for (j = i; j > 0; j--) {
            table += "<th>" + j + "</th>";
        }
        for (h = i; h < 12; h++) {
            table += "<th> " + '-' + "</th>";
        }
        table += "</tr>";
        table += "<tr>";
        table += "<td style='width=200px;'> KENO <br>Co-efficients </td>";
        for (k = 0; k < i; k++) {
            table += "<td>" + arr[i - 1][k] + "</td>";
        }
        for (h = i; h < 12; h++) {
            table += "<td> " + '-' + "</td>";
        }
        table += "</tr>";
        table += "</table>";
        table += "<br>";
    }

    return table;
}