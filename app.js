
const express = require('express');
const bodyParser = require('body-parser');
const ld = require('lodash');
const mongoose = require('mongoose');
const app = express();

const about_title = "To-Do List";
const about_content = "This is an to-do list web app which remind's you to do your work on time and be more productive ";
const author = "~Priyansh Sharma";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));




// mongoose 

mongoose.connect('mongodb+srv://Priyansh-123:Test191147@cluster0.c2tjd.mongodb.net/ToDoListDB', {
    useNewUrlParser: true
});

const item_Schema = new mongoose.Schema({
    Name: {
        type: String,
        require: [true, "Can't leave this field empty"]
    }
});

const Item = mongoose.model("Item", item_Schema);

const I1 = new Item({
    Name: "Workout"
})

const I2 = new Item({
    Name: "Web Develpement Project"
})

const I3 = new Item({
    Name: "Healthy Lunch"
})

const defaultList = [I1, I2, I3];

const listSchema = new mongoose.Schema({
    Name: String,
    items: [item_Schema]
})


const List = mongoose.model("List", listSchema);



app.get("/", function (req, res) {


    Item.find({}, function (err, items) {

        if (items.length === 0) {

            Item.insertMany(defaultList, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Database Created.......");
                }
            })

            res.redirect('/');
        } else {
            res.render("list", {
                listTitle: "Today",
                listItems: items
            });
        }

    })

    // const day = date.getDate();

});


app.post("/", function (req, res) {

    const itemName = req.body.newTodo;
    const listName = req.body.listSubmit;


    const item = new Item({
        Name: itemName
    });

    if (listName == "Today") {
        item.save();
        res.redirect('/');
    }else{
        List.findOne({Name:listName},function(err,foundItem){
            foundItem.items.push(item);
            foundItem.save();
            res.redirect("/"+listName);
        })
    }

});


app.post("/delete", function (req, res) {
    const checkedItem = req.body.checkbox;
    const listName = req.body.listName;

    if(listName=="Today"){
        Item.findByIdAndRemove(checkedItem, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Item deleted.......")
                res.redirect("/");
            }
        });
    }else{
        List.findOneAndUpdate({Name : listName},{$pull : {items: {id:checkedItem}}},function(err,foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        })
    }

   
})


app.get('/:customListName', function (req, res) {
    const routeName = ld.capitalize(req.params.customListName);

    List.findOne({
        Name: routeName
    }, function (err, foundItem) {
        if (!err) {
            if (!foundItem) {
                // Then create 
                const list = new List({
                    Name: routeName,
                    items: defaultList
                })
                list.save();
                res.redirect('/' + routeName);

            } else {
                res.render("list", {
                    listTitle: foundItem.Name,
                    listItems: foundItem.items
                })
            }
        }
    })

})


app.get('/MeriJankari', function (req, res) {
    res.render('MeriJankari', {
        abtitle: about_title,
        abcont: about_content,
        authname: author
    })
})



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function () {
    console.log("Server has started successfully");
});


// App link -> https://stormy-river-26603.herokuapp.com/