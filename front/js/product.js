//----------------------------------Fonction récupération de l'ID de la camera dans l'URL----------------------------------

function getId() {
    // Récupération de la chaîne de requête dans l'URL 
    let urlSearch = new URLSearchParams (window.location.search); 
    // Récuperation de l'Id
    let  productId = urlSearch.get("id"); 
    return productId;     
}
  
//----------------------------------Fonction récupération de la caméra correspondant à l'Id----------------------------------

 function getAssociatedCamera(cameras,idCamera) {
    
    let findCamera = cameras.find(cameras => cameras['_id'] === idCamera);
    console.log('findCamera',findCamera);
    return findCamera;    
}



//----------------------------------Création de la structure html de la caméra choisie----------------------------------

function cardCamera(findCamera){

    const productDescription= document.getElementById("productDescription");
    let divParentParent = document.createElement("div");        
    productDescription.appendChild(divParentParent);
    divParentParent.classList.add("row", "mx-auto", "my-3", "w-75");

    let divParent = document.createElement("div");
    divParentParent.appendChild(divParent);
    divParent.classList.add("card", "col", "m-auto", "p-5");

    let imageCamera = document.createElement("img");
    divParent.appendChild(imageCamera);
    imageCamera.classList.add("card-image-top", "photo", "img-fluid");
    imageCamera.src = findCamera.imageUrl;

    let divCardBody = document.createElement("div");
    divParent.appendChild(divCardBody);
    divCardBody.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");


    // Création des enfants de la div CardBody

    let titleCamera = document.createElement("h3");
    divCardBody.appendChild(titleCamera);
    titleCamera.classList.add("card-title");
    titleCamera.textContent = findCamera.name;

    let descriptionCamera = document.createElement("p");
    divCardBody.appendChild(descriptionCamera);
    descriptionCamera.classList.add("card-text", "text-justify");
    descriptionCamera.textContent = findCamera.description;  
    
    //Appel fonction affichage du choix de l'objectif

    chooseLense(divCardBody, findCamera);

    //Appel fonction choix de la quantité

    selectQuantity(divCardBody,findCamera);
 
    // Création du prix  

    let textPriceCamera = document.createElement("p");
    divCardBody.appendChild(textPriceCamera);
    textPriceCamera.classList.add("text-left", "fw-bold","my-3");    
    textPriceCamera.id = "textPriceCamera";
    calculatedPrice(findCamera);

    /* let linkProduct = document.createElement("a");
    textPriceCamera.appendChild(linkProduct); */
    // Création du bouton 
    let buttonBuy = document.createElement("button");
    divCardBody.appendChild(buttonBuy);
    buttonBuy.classList.add("btn", "btn-primary", "align-self-center");
    buttonBuy.textContent = "Ajouter au panier"; 
    addCamera(buttonBuy);      
                                                                                                                                                                                                                                                        
} 
  //----------------------------------Fonction choix des objectifs ----------------------------------

function chooseLense(divCardBody, findCamera) {

    let textChooseLens = document.createElement("p");
    divCardBody.appendChild(textChooseLens);
    textChooseLens.classList.add("text-left", "fw-bold","my-3");
    textChooseLens.textContent = "Choisir l'objectif : ";

    let choiceLens = document.createElement("select");
    divCardBody.appendChild(choiceLens);
    choiceLens.classList.add("col-md-4","align-self-center", "mb-5");
    choiceLens.id = "list";
    
    let numberLenses = findCamera.lenses;
    for (let i = 0; i < numberLenses.length; i++) {
         let optionLens = document.createElement("option");
         choiceLens.appendChild(optionLens);
         optionLens.textContent = findCamera.lenses[i];
         /* optionLens.id = "optionLens"; */
    }
}

  //----------------------------------Fonction ajout choix de la quantité----------------------------------

function selectQuantity(divCardBody,findCamera) {
    
    let textChooseQuantity = document.createElement("p");
    divCardBody.appendChild(textChooseQuantity );
    textChooseQuantity.classList.add("text-left", "fw-bold","my-3");
    textChooseQuantity.textContent = "Indiquez la quantité souhaitée : ";

    let chooseQuantity = document.createElement("select");
    divCardBody.appendChild(chooseQuantity);
    chooseQuantity.classList.add("col-md-2","align-self-center", "mb-5", "number");
    chooseQuantity.id="selectQty";

    let quantity = 11;
    for (let i = 0; i < quantity; i++) {
         let optionQuantity = document.createElement("option");
         chooseQuantity.appendChild(optionQuantity);
         optionQuantity.textContent = i;
         optionQuantity.id='qty';
    }

}    

//----------------------------------Calcul du prix total de la commande selon quantité choisie----------------------------------

function calculatedPrice(findCamera){
     
    let selectQty = document.getElementById('selectQty'); 
    let textPriceCamera = document.getElementById('textPriceCamera');
    selectQty.addEventListener('change',function(){  
    let playerQty = selectQty.value;  
    let totalPrice = playerQty*findCamera.price/100;    
    textPriceCamera.textContent = "Prix Total : " + totalPrice +" €";     
})
}

//----------------------------------Ajout des articles dans le panier----------------------------------



function addCamera(buttonBuy) {
    
    // ajout des données au click sur le bouton acheter
    buttonBuy.addEventListener('click', function () {
          
        let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
        let selectQty = document.getElementById('selectQty').value;
        let idCamera = getId(); 
        let entry = {idCamera,selectQty};
        let idExist=false;

        // Si le panier n'est pas vide
        if(existingEntries) {

            // Boucle sur les éléments du panier
            existingEntries.forEach(item => {

                // Si l'élément  a la même id que la caméra à ajouter on modifie la quantité et on set idExist à true
                if(item.idCamera==idCamera){
                    let qtyInt = parseInt(item.selectQty);                    
                    let parseSelectQty = parseInt(selectQty);
                    qtyInt += parseSelectQty;  
                    console.log(qtyInt);
                    idExist=true;
                    item.selectQty=qtyInt;
                }
            });

            // Si id de la caméra à ajouter n'existe pas dans le panier on ajoute une ligne
            if(!idExist){
                existingEntries.push(entry);
            }
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        }else{
            existingEntries = [];
            existingEntries.push(entry);         
            localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        }       
    });
    }
/* 
 function addCamera(buttonBuy) {
    
    // ajout des données au clik sur le bouton acheter
    buttonBuy.addEventListener('click', function () {
          
        let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
        let selectQty = document.getElementById('selectQty').value;
        let idCamera = getId(); 
        let entry = {idCamera,selectQty};
        
      // vérifie si le localstorage est vide et si oui créé un array
        if(!existingEntries) {
        existingEntries = [];     
        /* localStorage.setItem("entry", JSON.stringify(entry)); */
       /*  existingEntries.push(entry);         
        localStorage.setItem("allEntries", JSON.stringify(existingEntries));
        console.log("création du storage",localStorage) */

     // si le LocalStorage n'est pas vide
  /*   }else{ 
       
        for(let i=0;i<existingEntries.length;i++){
            // si la caméra et l'objectif sont présents, rajouter la quantité sélectionnée
                if (existingEntries[i].idCamera == idCamera){ 
                    
                console.log("camera presente rajouter quantité")
                let qtyInt = parseInt(existingEntries[i].selectQty);
                console.log("quantité presente dans le panier",qtyInt);
                let parseSelectQty = parseInt(selectQty);
                qtyInt += parseSelectQty;
                existingEntries[i].selectQty= qtyInt;                 
                localStorage.setItem("allEntries", JSON.stringify(existingEntries)); 
                console.log("contenu localeStorage",existingEntries); 
                }else{
                console.log("tableau existe mais pas la camera et sa quantité")  ;
                existingEntries.push(entry);         
                localStorage.setItem("allEntries", JSON.stringify(existingEntries));
                console.log("création du storage",localStorage)}
        }
    }        
});
}  */         
      

//----------------------------------Requête API----------------------------------

const getCameraByID = async function(){  
    try{
        let response =await fetch ("http://localhost:3000/api/cameras")
        if (response.ok) {
            let cameras = await response.json()
            console.log('data',cameras)
            //Récuperation de l'ID
            let idCamera = getId();
            console.log('idCamera',idCamera);
            //Récupération de la camera associée
           let camById= getAssociatedCamera(cameras,idCamera);
           console.log('camById',camById);
           //Appel fonction création de la Card caméra
           cardCamera(camById); 

        } else {
            console.error('retour du serveur: ', response.status)
        }
    } catch(e) {
        console.log(e)
    }
}
//----------------------------------Appel de la requête----------------------------------

    getCameraByID();
   


