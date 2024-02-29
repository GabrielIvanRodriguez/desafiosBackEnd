class ProductManager {
    //constructor
    constructor (){
        this.products = [];
        this.actualCode = 0;
    }
   //metodos
    addProduct( {title, description, price, thumbnail, code, stock } ){
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
        };
        this.products.push(newProduct);
        this.actualCode++;
        return;
    }

    getProducts (){
        return this.products;
    }

    getProductsById (id){
        let findProduct = this.products.find( product => product.id === id);
        if(findProduct){
            return findProduct;
        }else{
            console.error("No existe este producto");
            return;
        }
    }
}


let someProducts = new ProductManager();

console.log("Prueba 1");
let actualProducts = someProducts.getProducts();
console.log(actualProducts);

console.log("Prueba 2");
let productWasAdd = someProducts.addProduct({title:"producto prueba",description:"este es un producto prueba",price:200,thumbnail:"sin imagen",code:"abc123",stock:25});
console.log(someProducts.getProducts())

console.log("Prueba 3");
let productWasAdd2 = someProducts.addProduct({title:"producto prueba",description:"este es un producto prueba",price:200,thumbnail:"sin imagen",code:"abc123",stock:25});

console.log("Prueba 4");
console.log(someProducts.getProductsById(1));
console.log(someProducts.getProductsById(77));

console.log("Prueba extra");
let productWasAdd3 = someProducts.addProduct({title:"producto prueba",description:"este es un producto prueba",price:200,thumbnail:"sin imagen",code:"abc125"});