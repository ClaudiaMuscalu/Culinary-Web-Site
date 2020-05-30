window.onload = main;

function main()
{
    afisareLiteraCuLitera();
}

// cerinta 1 punct
// Task nivel 2 - cerinta 3
function afisareLiteraCuLitera()
{
    var titlu = "Contacte";
    
    var i = 0;
    var j = titlu.length - 1;
   
    var interval = setInterval(function()
    {
        var id_i = "id" + String(i + 1);
        var id_j = "id" + String(j + 1);

        document.getElementById(id_i).innerHTML = titlu[i];
        document.getElementById(id_j).innerHTML = titlu[j];
       
        i++;
        j--;

        if (i >= j)
        {
            clearInterval(interval);
        }
    }, 100);
}