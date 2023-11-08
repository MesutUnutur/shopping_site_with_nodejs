const Product = require('../models/product');
const Category = require('../models/category');

exports.getProducts = (req, res, next) => {
    Product.getAll()
        .then((products) => {
            res.render('admin/products',
             {
                titleım: "Admin Products",
                products:products[0],
                path:"/admin/products",
                action: req.query.action
            });
            console.log(req.query.action);
            
        }).catch((err) => {
            console.log(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    Category.getAll()
        .then((categories) => {
            res.render('admin/add-product', 
            {
                titleım:"New product",
                path: "/admin/add-product",
                categories: categories[0]
            });
        }).catch((err) => {
            console.log(err);
        });
}
    

exports.postAddProduct = (req, res, next) => {
    // database kayıt
    const product = new Product();
        
        product.name = req.body.name,
        product.price = req.body.price,
        product.imageUrl = req.body.imageUrl,
        product.categoryid = req.body.categoryid, 
        product.description = req.body.description 

        console.log(req.body);

    product.saveProduct()
        .then(() => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
        });
        
    }
    
    
exports.getEditProduct = (req, res, next) => {
    Product.getById(req.params.productid)
        .then((product) => {
            Category.getAll()
                .then((categories) => {
                    res.render('admin/edit-product', 
                    {
                        titleım:"Edit product",
                        path: "/admin/products",
                        product:product[0][0] ,
                        categories: categories[0]   
                    });
                    console.log(categories);
                }).catch((err) => {
                    console.log(err);
                });
                
            }).catch((err) => {
                console.log(err); 
            });
            
}
        

exports.postEditProduct = (req, res, next) => {
    const product =  new Product()

    product.id = req.body.id
    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryid = req.body.categoryid;
    
    Product.update(product)
        .then(() => {
            res.redirect('/admin/products?action=edit');
        }).catch((err) => {
            console.log(err);
        });
}
    

exports.postDeleteProduct = (req, res, next) =>{
    Product.deleteById(req.body.productid)
        .then(() => {
            res.redirect("/admin/products?action=delete")
        })
        .catch((err) => {
            console.log(err);
        });
}
    
    
    
    
    