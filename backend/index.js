import express from "express"
import axios from "axios";
import cors from "cors"

const app = express();
app.use(cors());
app.get("/:token", async function(req,res){ //route parameter;

  // Getting the todays UTC timestamp
  const date = new Date();
  let stockDataBACKPACK;
  let stockDataBINANCE;

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDate = date.getDate();
  const UTC = Date.UTC(currentYear, currentMonth, currentDate, 0, 0, 0, 0); // .UTC is a staic method bhai date jo hai woh instance hai toh usse call nai kar sakte hum usko i.e, need to use Date.UTC only
  //yeh milliiseconds mein dega bhai
  
  
  //data to pass in backpack API -- mostly same only
  const endTime = (UTC)/1000; // to convert it into seconds 
  const startTime = endTime - (30*24*60*60); //subtracting 30days ka sec
  const interval = "1d";
  const symbol = req.params.token;

  //backpack -- expects seconds and binance millisec

//   console.log(startTime);
//   console.log(endTime);

  const binanceEndTime = endTime*1000;
  const binanceStartTime = startTime*1000;


  //hitting the BackPAck API
  axios.get(`https://api.backpack.exchange/api/v1/klines?symbol=${symbol}_USDC&interval=${interval}&startTime=${startTime}&endTime=${endTime}`)
    .then(function(response){

      stockDataBACKPACK = response.data;

      // --- Extract closes and volumes into arrays ---
    var closes = []; //day to day price closes array
    var volumes = []; // day to day volumes
    for (let i = 0; i < stockDataBACKPACK.length; i++) { //populating the arrays
        closes[i] = parseFloat(stockDataBACKPACK[i].close);
        volumes[i] = parseFloat(stockDataBACKPACK[i].volume);
    }
    
    let sma30 = 0;
    let sum = 0;
    for(let i=(closes.length)-30; i<closes.length ; i++){
        sum = sum + closes[i];
    }
    sma30 = sum/30;

    var lastIndex = closes.length - 1;
    var lastClose = closes[lastIndex];
    var lastSMA = sma30;

    if(lastClose > lastSMA){

        res.json({ //Price above SMA 
            trend : "Bullish",
            suggestion: "Long"
        })
    } 
    else {
        res.json({ //Price below SMA 
            trend : "Bearish",
            suggestion: "Short"
        })
    }
    
    })


})


app.listen(3000, function(){
    console.log("Listening on Port", 3000);
})

