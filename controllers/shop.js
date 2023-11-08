const Category = require('../models/category');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.getAll()
    .then((products) => {
            Category.getAll()
                .then((categories) => {
                    res.render('shop/index',
                    {
                        titleım: "Shopping",
                        products:products[0],
                        categories : categories[0],
                        path:"/"    
                    });
                
                })
                .catch((err) => {
                console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}


exports.getProducts = (req, res, next) => {
    const categories = Category.getAll();
    Product.getAll()
        .then((products) => {
            res.render('shop/products',
             {
                titleım: "Products",
                productsımione:products[0],
                categories:categories,
                path:"/products"    
            });
        })
        .catch((err)=>{
            console.log(err);
        });

}

exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const products = Product.getProductsByCategoryId(categoryid);
    const categories = Category.getAll();

    res.render('shop/products',
     {
        titleım: "Products",
        productsımione:products,
        categories:categories,
        selectedCategory: categoryid,
        path:"/products"    
    });
}

exports.getProduct = (req, res, next) => {
    Product.getById(req.params.productid)
        .then((product) =>{

            res.render("shop/product-detail",{
                titleım: product[0][0].name,
                product: product[0][0],
                path: "/products"
            })
            console.log(product[0][0]);
        })
        .catch((err) =>{
            console.log(err);
        })
}

exports.getProductDetails = (req, res, next) => {
    res.render('shop/details',
     {
        titleım: "Details",
        path:"/details"    
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart',
     {
        titleım: "Cart",
        path:"/cart"    
    });
}
exports.getOrders = (req, res, next) => {
    res.render('shop/orders',
     {
        titleım: "Orders",
        path:"/orders"    
    });
}
