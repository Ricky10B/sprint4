// Variables
const form = document.querySelector('form');
const chart = document.getElementById('table_div');
let datos = [
    ['Ricky',  {v: 23, f: '23'}, "Normal"],
    ['Milton',   {v:20,   f: '20'},  "Normal"],
    ['Richard', {v: 29, f: '29'}, "Overweight"],
    ['Fernando',   {v: 18,  f: '18'},  "Normal"],
    ['Diego',   {v: 18,  f: '25'},  "Overweight"]
]

google.charts.load('49', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

// Listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    const name = document.getElementById('exampleFormControlInput1').value
    const talla = document.getElementById('exampleFormControlInput3').value
    const peso = document.getElementById('exampleFormControlInput4').value

    let imc = peso / (Math.pow((talla / 100), 2));

    let condicion;

    if(imc < 18){
        condicion = 'Underweight';
    }else if(imc >= 18 && imc < 25){
        condicion = 'Normal';
    }else if(imc >= 25 && imc < 30){
        condicion = 'Overweight';
    }else{
        condicion = 'Obesity';
    }

    imc = String(imc).substring(0, String(imc).indexOf('.'));
    drawTable(name, imc, condicion)
    chart.scrollIntoView()
})

function drawTable(name = '', imc = '', condicion = '') {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'BMI');
    data.addColumn('string', 'Condition');

    if(name.trim() !== '' && imc.trim() !== '' && condicion.trim() !== ''){
        datos.push([name,   {v: Number(imc),  f: imc},  condicion]);
    }

    data.addRows(datos);

    var table = new google.visualization.Table(chart);

    table.draw(data, {showRowNumber: true, width: '80%', height: '100%'});
}
