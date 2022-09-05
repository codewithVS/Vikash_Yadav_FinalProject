const express = require('express')

const app = express()
const port = 80
const path = require("path");
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/statics'));
app.use('/public', express.static(__dirname + '/public'));
var mongoose = require('mongoose');
const { userInfo } = require('os');
mongoose.connect('mongodb://localhost:27017/MyBadmintonWorld', { useNewUrlParser: true });
var db = mongoose.connection;// establish connection to MongoDB
db.on('error', () => { console.log('Error in database connection'); });
db.once('open', () => { console.log('database is open for once'); });
const User = mongoose.model('Users', {
  password: { type: String },
  email: { type: String },
  

});

const product = mongoose.model('products', {
  type: { type: String },
  productType: {type: String},
  productSubType: {type: String},
  email: {type: String}
  });

const cartitems = mongoose.model('cart', {
  name: {type : String},
  type: { type: String },
    email: {type: String}

  });



app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

var username = null;




app.get('/index', (req, res) => {
  res.render(path.join(__dirname, '/statics/index.html'),{name:username});
})
// app.get('/FeatherShuttle', (req, res) => {
//   res.render(path.join(__dirname, '/statics/totalitems.html'),{name:username});
// })


app.get('/about', (req, res) => {
  res.render(path.join(__dirname, '/statics/about.html'),{name:username});
})

app.get('/contact', (req, res) => {
  res.render(path.join(__dirname, '/statics/contact.html'),{name:username});
})
app.get('/blog', (req, res) => {
  res.render(path.join(__dirname, '/statics/blog.html'),{name:username});
})



app.get('/login', (req, res) => {
  res.render(path.join(__dirname, '/statics/login.html'), { name: username });
})



app.get('/index1', (req, res) => {
  username = null;
  res.render(path.join(__dirname, '/statics/index.html'),{name:username});
})

app.post('/s1', (req, res) => {

  var email = req.body.email;
  var pass = req.body.password;
  console.log(email)
  username = email;
  User.find({ password: pass }, { email: email }, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Second function call : ", docs.length);
      if (docs.length >= 1) {
        console.log("true");
        res.render(path.join(__dirname, '/statics/index.html'), { name:username  })
      }
      else {
        var mes = false
        res.render(path.join(__dirname, '/statics/login.html'), { name: null });

      }
    }
  });
})


function rdata(req){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var password = req.body.password;
  var mobile = req.body.mobile;
  var dob = req.body.dob;
  var address = req.body.address;
  var type="account"

  console.log(fname+lname+email+password)
  var data = {
    'lname': lname,
    'fname': fname,
    'email': email,
    'password':password,
    'mobile': mobile,
    'dob': dob,
    'address': address,
    'type':type,
}
db.collection('users').insertOne(data,(err,collection)=>{
    if(err) throw err;
    console.log('successfully insert data');
});
}

app.get('/register', (req, res) => {
  res.render(path.join(__dirname, '/statics/register.html'),{name:username})
})

app.post('/s', (req, res) => {
  var email = req.body.email;
  User.find({email:email }, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("Second function call : ", docs.length);
        if (docs.length>=1){
          res.render(path.join(__dirname, '/statics/register.html'),{name:username})
        }
        else{
          rdata(req)
          res.render(path.join(__dirname, '/statics/login.html'),{name:null})
        }
    }
  });

})

// app.get('/index', (req, res) => {
//     res.sendFile(path.join(__dirname, '/statics/index.html'))
// })

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, '/statics/about.html'))
// })



// -----------------------------add file

app.get('/additem', (req, res) => {
  // res.sendFile(path.join(__dirname, '/statics/additem.html'))
  res.render(path.join(__dirname, '/statics/additem.html'),{name:username})

})

const fileUpload = require('express-fileupload')
app.use(fileUpload())


app.post('/ab', (req, res) => {

  const uploadedFile = req.files.image;
  console.log(uploadedFile);
  const uploadPath = __dirname+ "/statics/uploads/products" + uploadedFile.name;

  uploadedFile.mv(uploadPath, function (err) {
    if (err) {
      console.log(err);
    } 
  });

  var name = req.body.name;
  var image = uploadedFile.name;
  var price = req.body.Price;
  var probrand=req.body.probrand;
  var protype=req.body.protype;
  var type="product";
  var prosubtype=req.body.prosubtypes;
  
  console.log(image)
  var data = {
    'name': name,
    'image': uploadedFile.name,
    'price': price,
    'email': username,
    'productBrand':probrand,
    'productType':protype,
    'productSubType':prosubtype,
    'type':type,    

}
db.collection('products').insertOne(data,(err,collection)=>{
    if(err) throw err;
    console.log('successfully insert data');
});


//-------------------------------- Account ----------------------------------------

User.find( { email:username}, function (err, docs) {
  console.log(username);
  details=Object.values(docs);
  // console.log(nn)
  res.render(path.join(__dirname, '/statics/account.html'),{name:details});
}).select();})


// product.find( { email:username}, function (err, docs) {
//   console.log(username);
//   details=Object.values(docs);
//   // console.log(nn)
//   res.render(path.join(__dirname, '/statics/account.html'),{name:details});
// }).select();})

// ---------------------- get user total items uploaded  -----------------------------
app.get('/items', (req, res) => {

  product.find( {email: username}, function (err, docs) {
    console.log(username);
    nn=Object.values(docs);
    console.log(nn);
    res.render(path.join(__dirname, '/statics/items.html'),{name:nn});

  }).select();
})



//----------------------------Get Total Items Uploaded on website-------------------

app.get('/totalitems', (req, res) => {

  product.find( {type: 'product'}, function (err, docs) {
    console.log(username);
    nn=Object.values(docs);
    // console.log(nn)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:nn});
  }).select();
})





// ----------------------------------------------Insert into cart items ------------------------

app.post('/cart12', (req, res) => {


  var name = req.body.name;
  var image = req.body.img;
  var price = req.body.Price;
  var type = "cart";
  
  console.log(name+image+price+type);
  var data = {
    'name': name,
    'image': image,
    'price': price,
    'email': username,
    'type' : type,

}
db.collection('carts').insertOne(data,(err,collection)=>{
    if(err) throw err;
    console.log('successfully insert data');
});
res.render(path.join(__dirname, '/statics/totalitems.html'),{name:nn});
})

//-------------------------------------get cart items --------------------------

app.get('/cart', (req, res) => {

  cartitems.find( {email:username, type: "cart"}, function (err, docs) {
    console.log(username);
    cartitem=Object.values(docs);
    console.log(cartitem);
    res.render(path.join(__dirname, '/statics/cart.html'),{name:cartitem});

  }).select();
})

//------------------------------------------Remove item from cart-------------------
app.post('/remove', (req, res) => {

  var pname = req.body.pname;
  console.log(pname)

  cartitems.findOneAndRemove( {email: username, name: pname}, function (err, docs) {
  
  })
  cartitems.find( {email: username,name: pname}, function (err, docs) {
    // console.log(username);
    cartitem=Object.values(docs);
    // console.log(cartitem);
    res.render(path.join(__dirname, '/statics/cart.html'),{name:cartitem});

  }).select();

})

//-------------------Remove items from user total items -------------------------

app.post('/removeitem', (req, res) => {

  var pname = req.body.pname;
console.log(pname)  

  product.findOneAndRemove( {email: username, name: pname}, function (err, docs) {
  
  })
    product.find( {email: username , name:pname}, function (err, docs) {
    // console.log(username);
    nn=Object.values(docs);
    // console.log(cartitem);
    res.render(path.join(__dirname, '/statics/items'),{name:nn});

  }).select();

})


//-----------------------------------Account Details ---------------------------------------


app.get('/account', (req, res) => {

  User.find( { email:username, type : 'account'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/account.html'),{name:details});
  }).select();
})

//--------------------------------Rackets ------------------

app.get('/Rackets', (req, res) => {

  product.find( { productType : 'Rackets'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/RacketsAttacking', (req, res) => {

  product.find( { productType : 'Rackets' , productSubType : 'Attacking'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/RacketsDefensive', (req, res) => {

  product.find( { productType : 'Rackets' , productSubType : 'Defensive'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/RacketsBalanced', (req, res) => {

  product.find( { productType : 'Rackets' , productSubType : 'Balanced'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

//------------------------Shoes------------------------------------

app.get('/Shoes', (req, res) => {

  product.find( { productType : 'Shoes'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/ShoesProfessionals', (req, res) => {

  product.find( { productType : 'Shoes' ,productSubType : 'Professionals'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/ShoesIntermediate', (req, res) => {

  product.find( { productType : 'Shoes', productSubType : 'Intermediate'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/ShoesBeginner', (req, res) => {

  product.find( { productType : 'Shoes', productSubType : 'Beginner'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

//-----------------------Shuttle-------------------------------
app.get('/Shuttle', (req, res) => {

  product.find( { productType : 'Shuttle'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/ShuttleNylon', (req, res) => {

  product.find( { productType : 'Shuttle' ,productSubType : 'Nylon'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/ShuttleFeather', (req, res) => {

  product.find( { productType : 'Shuttle', productSubType : 'Feather'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})
//----------------------------------Grips--------------------------------
app.get('/Grips', (req, res) => {

  product.find( { productType : 'Grips'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/Grip', (req, res) => {

  product.find( { productType : 'Grip' ,productSubType : 'Grip'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/Over Grip', (req, res) => {

  product.find( { productType : 'Grip', productSubType : 'Over Grip'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

//-------------------------------Strings-----------------------

app.get('/Strings', (req, res) => {

  product.find( { productType : 'Strings'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/StringsPower', (req, res) => {

  product.find( { productType : 'Strings' ,productSubType : 'Power'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/StringsDurability', (req, res) => {

  product.find( { productType : 'Strings', productSubType : 'Durability'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/StringsBalanced', (req, res) => {

  product.find( { productType : 'Strings', productSubType : 'Balanced'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

//--------------------------------Others--------------------------------

app.get('/Others', (req, res) => {

  product.find( { productType : 'Others'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/Clothing', (req, res) => {

  product.find( { productType : 'Others' ,productSubType : 'Clothing'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/Bags', (req, res) => {

  product.find( { productType : 'Others', productSubType : 'Bags'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/Accessories', (req, res) => {

  product.find( { productType : 'Others', productSubType : 'Accessories'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})




//---------------------------------------------------------------------------------------------


//----------------        Brands          ---------------------------------------


//-------------------------------------------------------------------------------------------
app.get('/Brand', (req, res) => {

  product.find( { productBrand : '' }, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})




app.get('/Yonex', (req, res) => {

  product.find( { productBrand : 'Yonex'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/Lining', (req, res) => {

  product.find( { productBrand : 'Lining'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/Ashaway', (req, res) => {

  product.find( { productBrand : 'Ashaway'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/Asics', (req, res) => {

  product.find( { productBrand : 'Asics'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})

app.get('/Carlton', (req, res) => {

  product.find( { productBrand : 'Carlton'}, function (err, docs) {
    console.log(username);
    details=Object.values(docs);

    console.log(details)
    res.render(path.join(__dirname, '/statics/totalitems.html'),{name:details});
  }).select();
})







//------------------------------end--------------------------------
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
