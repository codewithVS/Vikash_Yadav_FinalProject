
function subtypes(){
    var x=document.index.protype.value;
    if(x=="Rackets"){
        document.getElementById('subtype').innerHTML="<option>Attacking</option><option>Defensive</option><option>Balanced</option>"
    }
    else if(x=="Shoes"){
        document.getElementById('subtype').innerHTML="<option>Professionals</option><option>Intermediate</option><option>Beginner</option>"
    }
    else if(x=="Shuttle"){
        document.getElementById('subtype').innerHTML="<option>Nylon</option><option>Feather</option>"
    }
    else if(x=="Grips"){
        document.getElementById('subtype').innerHTML="<option>Grip</option><option>Over Grip</option>"
    }
    else if(x=="Strings"){
        document.getElementById('subtype').innerHTML="<option>Power</option><option>Durability</option><option>Balanced</option>"
    }
    else if(x=="Others"){
        document.getElementById('subtype').innerHTML="<option>Clothing</option><option>Bags</option><option>Accessories</option>"
    }
}