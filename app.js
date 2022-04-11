//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request"); 
const https = require('https');

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/signup.html");
    // console.log("overall, we're together!");
})


app.post('/', (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userEmail = req.body.userEmail;

    var data = {
        members:[
            {
                email_address: userEmail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/19b3675396";

    const options = {
        method: "POST",
        // authentication : username: id
        auth: "rahul27bhardwaj:93d8848ce0a62da3df13d0f29295d49c-us14"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            // res.send("Successfully Subscribed...!!");
            res.sendFile(__dirname + "/success.html");
        }
        else{
            // res.send("Error with signing up, please try again Later...")
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


});


// Redirects when failure occurs
app.post("/failure", (req, res)=>{
    res.redirect("/");
})




app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running");
});


// API Key
// 93d8848ce0a62da3df13d0f29295d49c-us14


//List ID or Unique Audience ID :-  19b3675396