

//Liens avec l'API

let request = new XMLHttpRequest();
 request.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        let response = JSON.parse(this.responseText);  
        displayProducts(response)
    }     
   
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send(); 

const displayProducts = (response) =>{
    for(let product of response){
        let cameraPrice = new Intl.NumberFormat('fr-FE', { style: 'currency', currency: 'EUR',  minimumFractionDigits: 2 }).format(product.price/100);
        let item = `<li class = "list-inline-item mb-4">   
                        <div class="card" style="width: 18rem;">
                            <img src="${product.imageUrl}" class="card-img-top" alt="..." width = "286px" height="190px">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-price">${cameraPrice}</p>
                                <a href="#" class="btn btn-primary">Découvrir</a>
                            </div>
                        </div>
                     </li>`;
    document.querySelector("#listCamera").innerHTML += item                                                                
    }    
}


/* 
class Article {
    constructor(jsonArticle){
        jsonArticle && Object.assign (this, jsonArticle)
        
    }
}

fetch("http://localhost:3000/api/cameras")
    .then(data => data.json())  
    .then(jsonListArticle => { 
        for(let jsonArticle of jsonListArticle){
            let article = new Article (jsonArticle);
            document.querySelector("#listCamera").innerHTML += `<li class = "list-inline-item mb-4">   
                                                                    <div class="card" style="width: 18rem;">
                                                                        <img src="${article.imageUrl}" class="card-img-top" alt="..." width = "286px" height="190px">
                                                                        <div class="card-body">
                                                                            <h5 class="card-title">${article.name}</h5>
                                                                            <p class="card-price">${article.price/100} €</p>
                                                                            <a href="#" class="btn btn-primary">Découvrir</a>
                                                                        </div>
                                                                    </div>
                                                                </li>`;
                                                                
        }        
    }); 
              
            */
     
    
    
    
