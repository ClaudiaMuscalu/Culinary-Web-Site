
window.onload=my_main;
/* la apasare pe buton schimb de la o tema la alta*/
function butonul_tema()
{
    var x=parseInt(localStorage.getItem("ok"));

    if(x==1)
        localStorage.setItem("ok","0");

    if(x==0)
        localStorage.setItem("ok","1");
    
    functie_tema();
}

function functie_tema()
{
    /* tema pentru ok==1*/
    if(localStorage.getItem("ok")==1)
    {
        let a=document.getElementsByClassName("navbar")[0].style.backgroundColor="#660022";
        let b=document.getElementsByClassName("list");
        let c=document.getElementsByClassName("drop");
        let d=document.getElementsByClassName("dropdown-content")[0].style.backgroundColor="#660022";
        let e=document.getElementsByClassName("chenar")[0];
        e.style.backgroundColor="rgb(230,179,179,0.7)";
        let f=document.getElementById("buton");
        if(f)
        f.style.background="#660022";

        for(let i=0;i<b.length;i++)
            b[i].style.backgroundColor="#660022";

        for(let i=0;i<c.length;i++)
            c[i].style.backgroundColor="#660022";
    }

    /* tema pentru tema initiala */
    if(localStorage.getItem("ok")==0)
    {
        let a=document.getElementById("nav_bar").style.backgroundColor="#230444";
        let b=document.getElementsByClassName("list");
        let c=document.getElementsByClassName("drop");
        let d=document.getElementsByClassName("dropdown-content")[0].style.backgroundColor="#230444";
        let e=document.getElementsByClassName("chenar")[0];
        let f=document.getElementById("buton");
        if(f)
        f.style.background="#230444";
        e.style.backgroundColor="rgba(255,244,228,0.75)";

        for(let i=0;i<b.length;i++)
            b[i].style.backgroundColor="#230444";

        for(let i=0;i<c.length;i++)
            c[i].style.backgroundColor="#230444";
    }
    
}

function my_main()
{
    var x=parseInt(localStorage.getItem("ok"));

    if(x==NaN)
        localStorage.setItem("ok","0");
    functie_tema();

    if(x==1)
        localStorage.setItem("ok","1");
    else
        localStorage.setItem("ok","0");
        
    event_mouse();  
    var y=document.getElementsByTagName("p")[0];
    if(y)
    y.onclick=culoare_titlu;
    var z=document.getElementById("buton_send");
    if(z)
    z.onclick=afis_alert;
    getComments();
        
}


function event_mouse()
{
  let test = document.querySelector('#ingrediente');//selector CSS

if(test)
{
test.addEventListener("mouseenter", function( event ) {   event.target.style.color = "rgb(111, 0, 0)";}, false);
}

if(test)
{
test.addEventListener("mouseover", function( event ) {
       
    event.target.style.color = "rgb(254, 24, 255)"; 
    
    setTimeout(function() {
    event.target.style.color = ""; 
}, 500);
}, false);
}
}
 
//modificare de atribut 
function culoare_titlu()
{
    document.getElementsByTagName("p")[0].setAttribute("class", "stil-titlu"); 

}

function afis_alert()
{
    var sir=document.getElementById("name").value;
    alert(sir + ", rezervarea a fost facută cu succes. Te așteptăm pe acest site ori de câte ori ești dornic de o nouă rețetă.");
}

 
function submitData()
  {
      let nume = document.getElementById("name").value;
      let comment = document.getElementById("comment").value;

      if(nume!=undefined && comment!=undefined)
      {
        fetch("http://localhost:3000/blog", {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({nume: nume, comment:comment})
        }).then((data) => {
            return data.json()
        }).then((json)=>{
            if(json.Status === "OK"){
            console.log(json);
            let div = document.getElementById("comentarii");
            div.innerHTML = "Sent";
            div.style.padding = "15px";
            div.style.marginTop = "0px";
            div.style.fontFamily = "'Playfair Display', serif";
            }
            else
            {
                console.log("nu merge");
            }
        })
      }
      else
      {
            let div = document.getElementById("comentarii");
            div.innerHTML = "Fill all fields";
            div.style.padding = "15px";
            div.style.marginTop = "0px";
            div.style.fontFamily = "'Playfair Display', serif";
      }
  }

  function getComments(){
    fetch("http://localhost:3000/blog")
    .then((data) => { return data.json() })
    .then((json) => displayComments(json))
}

function displayComments(data){
    let responseArea = document.getElementById('comentarii');
    if(responseArea)
    {
        for (let i = 0; i<data.length; i++)
    {
        let Nume = document.createElement('P');
        Nume.innerText = data[i]["nume"];
        let commentContent = document.createElement('P');
        commentContent.innerText = data[i]["comment"];
        let someRespone = document.createElement('DIV')
        someRespone.classList.add("container1");
        let varr=document.createElement('IMG');
        varr.setAttribute("src","user.png");
        someRespone.appendChild(varr);
        someRespone.appendChild(Nume)
        someRespone.appendChild(document.createElement('BR'))
        someRespone.appendChild(commentContent);
        someRespone.style.border = "1px solid black";
        responseArea.appendChild(someRespone);

    }
   }
    
}

  
