var productName=document.getElementById('productName');
var productPrice=document.getElementById('productPrice');
var productCategory=document.getElementById('productCategory');
var productDisc=document.getElementById('productDisc');
var productImage=document.getElementById('productImage');
var tableBody=document.getElementById('tableBody');
var mainBtn=document.getElementById('mainBtn');
var inAddProduct=true;


var productContainer=[];
var mainIndex;
if(localStorage.getItem('products')!=null){
    productContainer=JSON.parse(localStorage.getItem('products'));
    displayProduct();
}



function addUpdateProduct(){
    var product={
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        discription:productDisc.value,
        image:productImage.files[0]?.name
    }
console.log(product);

    if( inAddProduct){
        addProduct(product);
    }
    else{
        updateProduct(product);
    }

  
   // console.log(productContainer);
   
   localStorage.setItem('products',JSON.stringify(productContainer))
    displayProduct();
    clear();
    }
    
    function addProduct(product){
        productContainer.push(product);
    } 

    function updateProduct(product){
        productContainer.splice(mainIndex,1,product)
        mainBtn.innerHTML='Submit'; 
        inAddProduct=true;
    }

    function displayProduct(){
        var cartona='';
        for(var i=0;i<productContainer.length;i++){
            cartona+=`
            <tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td><img src="images/${productContainer[i].image}" alt="" class='image'></td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].discription}</td>
            <td><button class="btn btn-warning" onclick="patchProduct(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>
            `
        }
        tableBody.innerHTML=cartona;
    }

    function clear(){
        productName.value='';
        productPrice.value='';
        productCategory.value='';
        productDisc.value='';
    }

    function deleteProduct(productIndex){
    //    window.alert('hii waleed'+productIndex); 
       productContainer.splice(productIndex,1);
       localStorage.setItem('products',JSON.stringify(productContainer));
       displayProduct();
    }

    function patchProduct(productIndex){
        mainIndex=productIndex;
        var product=productContainer[productIndex];

        productName.value=product.name;
        productPrice.value=product.price;
        productCategory.value=product.category;
        productDisc.value=product.discription;
        
        mainBtn.innerHTML='Update Product';
        inAddProduct=false;
}