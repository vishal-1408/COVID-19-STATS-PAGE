var express = require("express"),
    app     = express(),
    axios   = require("axios"),
    parser  = require("body-parser");

app.set("view engine","ejs");
app.use(parser.urlencoded({extend:true}));


// axios.get("https://api.covid19api.com/summary")
//    .then(function(res){
//       console.log(res);
//       var g = res.data.Global;
//       var tc = res.data.Countries.sort(function(a,b){return b.TotalConfirmed-a.TotalConfirmed}).slice(0,5);
//       var td = res.data.Countries.sort(function(a,b){return b.TotalDeaths-a.TotalDeaths}).slice(0,5);
//       var tr = res.data.Countries.sort(function(a,b){return b.TotalRecovered-a.TotalRecovered}).slice(0,5);
//       console.log(tc,td,tr,g);
//Routes

app.get("/",function(req,resp){
axios.get("https://coronavirus-19-api.herokuapp.com/countries")
     .then(function(res){
        //console.log("========================================================");
        var g = res.data[0];
      //  console.log(g);
        var data = res.data.slice(1,);
        //console.log(data);
        var tc = data.sort(function(a,b){return b.cases-a.cases}).slice(0,5);
        var td = data.sort(function(a,b){return b.deaths-a.deaths}).slice(0,5);
        var tr = data.sort(function(a,b){return b.recovered-a.recovered}).slice(0,5);
        var ta = data.sort(function(a,b){return b.active-a.active}).slice(0,5);
        resp.render("home",{g:g,tc:tc,td:td,tr:tr,ta:ta});
              })
     .catch(function(err){
        console.log(err);

     });
});

app.get("/search",function(req,res){
  res.render("search");
})


app.post("/country",function(req,res){
  console.log(req.body);
  axios.get("https://coronavirus-19-api.herokuapp.com/countries/"+req.body.country)
       .then(function(resp){
         console.log(resp.data);
         res.render("country",{country:resp.data});
       });

})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
