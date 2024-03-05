
const fs = require("fs");
class ProductManager {
    //constructor
    constructor (path){
        this.path = path;
        try{
            let savedFile = searchAndRead(this.path);
            this.listOfProducts = JSON.parse(savedFile);
        }catch(error){
            this.products = [];
            this.actualCode = 0;
        }
    }

   //metodos
    addProduct ( {title, description, price, thumbnail, code, stock } ){

        if( code === 0 ){
            console.error("El código debe ser mayor que 0")
            return;
        }else if (this.products.find( product => product.code === code)){
            console.error("El código del producto ya existe");
            return;
        }
        if ( title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined){
            console.error("El producto posee campos vacios");
            return;
        }

        let newProduct = {
            id: this.actualCode + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct);
        this.actualCode++;

        updateListOfProducts({path: this.path,products: this.products,actualCode: this.actualCode});
        return;
    }

    updateProduct = async (id,aProduct) => {
        let flag = false;
        let updatedProduct = this.products.map( product =>{
            if(product.id === id){
                product.title = aProduct.title;
                product.description = aProduct.description;
                product.price = aProduct.price;
                product.thumbnail = aProduct.thumbnail;
                product.code = aProduct.code;
                product.stock = aProduct.stock;
            }

        })
        if (flag === false){
            console.error(`No existe el producto de ID: ${id}`);
            return;
        }else{
            newAndWrite(this.path,{path:this.path, products:updatedProduct, actualCode:this.actualCode});
            console.log("Producto actualizado.")
            return updatedProduct;
        }
    }

    updateListOfProduct = async (updatedList) =>{
        newAndWrite(this.path,updatedList);
        console.log("Lista de productos actualizada");
        return;
    }

    deleteProduct = async (id) =>{
        let withoutProduct = this.products.filter( product => product.id !== id);
        newAndWrite(this.path,{path:this.path, products: withoutProduct, actualCode: this.actualCode});
        console.log("Producto eliminado");
    }

    getProducts (){
        let alreadyExist = searchAndRead(this.path);
        if (alreadyExist === undefined ){
            return this.products;
        }else{
            return alreadyExist.products;
        }
    }

    getProductsById (id){
        let allProducts = searchAndRead(this.path);
        if (allProducts === undefined){
            console.error("No se encontraron productos registrados en el archivo.")
            return allProducts;
        }else{
            let findedProduct = allProducts.products.find( product => product.id === id);
            if(findedProduct === undefined){
                console.error("No existe este producto");
            }
            return findedProduct;
        }
    }
}

searchAndRead = async (path) =>{

    try{
        let searchedFile = await fs.promises.readFile(path, "utf-8");
        let foundedFile = JSON.parse(searchedFile);
        console.log("Se ha leido un archivo");
    }catch(error){
        let foundedFile = undefined;
        console.error("No se encontró ningún archivo.");
    }finally{
        return foundedFile;
    }
}

newAndWrite = async (path,content) =>{
    try{
        await fs.promises.writeFile(path,content);
        console.log("Archivo escrito correctamente.");
        return;
    }catch(error){
        console.error("Error al escribir el archivo.");
        return;
    }
}




//creación de instancia de clase ProductManager
let someProducts = new ProductManager('./newFile');

console.log("Prueba 1");
let actualProducts = someProducts.getProducts();
console.log(actualProducts);



console.log("Prueba 2");
let productWasAdd = someProducts.addProduct({title:"producto prueba",description:"este es un producto prueba",price:200,thumbnail:"sin imagen",code:"abc123",stock:25});
console.log(someProducts.getProducts());


console.log("Prueba extra 1");
let productWasAdd2 = someProducts.addProduct({title:"producto prueba",description:"este es un producto prueba",price:200,thumbnail:"sin imagen",code:"abc123",stock:25});

console.log("Prueba extra 2");
console.log(someProducts.getProducts());

console.log("Prueba 3");
console.log(someProducts.getProductsById(1));
console.log(someProducts.getProductsById(77));

console.log("Prueba 4");
let modifiedProduct = {
    tittle: "cambio de titulo",
    description: "cambio de descripcion",
    price: "cambio de precio",
    thumbnail: "sin imagen",
    code: "cambio de código",
    stock: 30
}
updateProduct(1,modifiedProduct);
console.log(someProducts.getProducts());

console.log("Prueba 5");
deleteProduct(1);
console.log(someProducts.getProducts());

console.log("Prueba extra");
let productWasAdd3 = someProducts.addProduct({title:"producto prueba",description:"este es un producto prueba",price:200,thumbnail:"sin imagen",code:"abc125"});