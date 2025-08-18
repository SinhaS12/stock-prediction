import express from "express"
import axios from "axios";
import cors from "cors"

function ema(timeframe, closes){

    let emaArr = [];
    const multiplier = 2/(timeframe+1);

    let sum = 0
    for(let i=0; i<timeframe; i++){
        sum = sum + closes[i];
    }

    const seed = sum/timeframe; // first EMA == SMA only
    const EMA1 = (closes[timeframe]*multiplier) + (seed*(1-multiplier));
    emaArr.push(seed); 
    emaArr.push(EMA1);

    for(let i=(timeframe+1); i<closes.length; i++){
        const EMA = (closes[i]*multiplier) + (emaArr[i-timeframe]*(1-multiplier));
        emaArr.push(EMA);
    }

    return emaArr;

}


function HighestHighs_LowestLows(open, close){

    const high1 = Math.max(...open);
    const high2 = Math.max(...close);

    const low1 = Math.min(...open);
    const low2 = Math.min(...close);

    let highest2;
    let lowest2;
    if(high1 > high2){
        highest2 = high1;
    }else{
        highest2 = high2;
    }

    if(low1 < low2){
        lowest2 = low1;
    }else{
        lowest2 = low2;
    }

    // console.log("Highest M-2: "+highest2);
    // console.log("Lowest M-2: "+lowest2);

    return [lowest2, highest2];
}


function RSI(closes) {
    if (closes.length < 14 + 1) {
        return null; 
    }

    let totalGain = 0;
    let totalLoss = 0;

    
    for (let i = closes.length - 14; i < closes.length; i++) {
        let change = closes[i] - closes[i - 1];

        if (change > 0) {
            totalGain = totalGain + change; 
        } else {
            totalLoss = totalLoss - change;
        }
    }

    let averageGain = totalGain / 14;
    let averageLoss = totalLoss / 14;

    let rs;
 
    rs = averageGain / averageLoss;
    
    let rsi = 100 - (100 / (1 + rs));
    // console.log(rsi);

    return rsi; 
}

function Type(scoreEMA, scoreRSI){
    const sum = scoreEMA + scoreRSI;
    
    if(sum <= 50){
        return "Mildly";
    }else{
        return "Strong";
    }

}

function AvgVol(volumes){
    let sum = 0;
    for(let i=0; i<volumes.length; i++){
        sum += volumes[i];
    }
    const ans = sum/volumes.length;
    return ans
}

function TakeProfit(type, resistance, price){

    if(type == "Bullish"){
        const profit = resistance-price;
        return profit;
        
    }else{
        const profit = price -resistance;
        return profit;
    }

}


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


//Will use when calling binance orderbook
//   const binanceEndTime = endTime*1000;
//   const binanceStartTime = startTime*1000;


  //hitting the BackPAck API
  axios.get(`https://api.backpack.exchange/api/v1/klines?symbol=${symbol}_USDC&interval=${interval}&startTime=${startTime}&endTime=${endTime}`)
    .then(function(response){

      stockDataBACKPACK = response.data;

      // --- Extract closes and volumes into arrays ---
    let closes = []; //day to day price closes array
    let volumes = []; // day to day volumes
    let lows = [];
    let highs = [];
    let opens = [];
    let scoreEMA = 30; //score starts from 30 and will subtract exponentially
    let scoreRSI;


    for (let i = 0; i < stockDataBACKPACK.length; i++) { //populating the arrays
        opens[i] = parseFloat(stockDataBACKPACK[i].open);
        closes[i] = parseFloat(stockDataBACKPACK[i].close);
        volumes[i] = parseFloat(stockDataBACKPACK[i].volume);
        lows[i] = parseFloat(stockDataBACKPACK[i].low);
        highs[i] = parseFloat(stockDataBACKPACK[i].high);
    }
    

    //Price Action
    const avgVol = AvgVol(volumes);

    let day = closes.length;

    //Likely Useless and not real logic -- remove this I guess, discuss
    //Day 30
    const H1 = highs[day];
    const L1 = lows[day];
    //Day 24
    const H2 = highs[day-6];
    const L2 = lows[day-6];

    //Day 18
    const H3 = highs[day-12];
    const L3 = lows[day-12];

    if(H1 > H2 && L1 > L2){
        if(H2 > H3 && L3 > L2){
            // console.log("Bullish");
        }else{
            // console.log("Sideways/uncertain");
        }
    }else if (H2 > H1 && L2 > L1){
        if(H3 > H2 && L3 > L2){
            // console.log("Bearish");
        }else{
            // console.log("Sideways/uncertain");
        }
    }else{
        // console.log("Sideways/uncertain");
    }


    let sma30 = 0;
    let sum = 0;
    for(let i=(closes.length)-30; i<closes.length ; i++){
        sum = sum + closes[i];
    }
    sma30 = sum/30;

    //Highest and Lowest
    const vals = HighestHighs_LowestLows(opens, closes);
    console.log("Lowest: "+vals[0]);
    console.log("Highest: "+vals[1]);


    //ema;
    const ema9 = ema(9, closes);
    const ema24 = ema(24,closes);
    const rsi = RSI(closes);


    // console.log(ema9);
    // console.log(ema24);
    // console.log("Length EMA9: "+ema9.length);
    // console.log("Length EMA24: "+ema24.length);
    const len = ema9.length;

    let bullCount = 0;
    let bearCount = 0;
    let revCount = [];

    // console.log(len-ema24.length+1);

    for(let i=0; i<(ema24.length); i++){
        // console.log("EMA9: "+ema9[(len-ema24.length)+ i]);
        // console.log("EMA24: "+ ema24[i]+ "  \n");


        if(ema9[((len-ema24.length))+i] > ema24[i]){
            bullCount++;
            revCount.push(1);
        }else if(ema9[(len-ema24.length)+i] < ema24[i]){
            bearCount++;
            revCount.push(0);
        }
    }

    //Bullish Test Cases
    // revCount = [0, 0, 0, 0, 0, 0, 1];  
    // revCount = [0, 0, 0, 0, 0, 1, 1];
    // revCount = [0, 0, 0, 0, 1, 1, 1];
    // revCount = [0, 0, 0, 1, 1, 1, 1];
    // revCount = [0, 0, 1, 1, 1, 1, 1];
    // revCount = [0, 1, 1, 1, 1, 1, 1];   //case for day 5 bullish
    
    //Bearish Test Cases
    // revCount = [1, 1, 1, 1, 1, 1, 0];
    // revCount = [1, 1, 1, 1, 1, 0, 0];
    // revCount = [1, 1, 1, 1, 0, 0, 0];
    // revCount = [1, 1, 1, 0, 0, 0, 0];
    // revCount = [1, 1, 0, 0, 0, 0, 0];
    // revCount = [1, 0, 0, 0, 0, 0, 0];   //case for Day 5 bearis

    console.log(bullCount);
    console.log(bearCount);
    console.log(revCount);
    
    console.log(scoreEMA);
    console.log("RSI Score: "+rsi);

    if(bullCount == (ema24.length)){
        scoreEMA = 15;
        console.log("Inside using BullCount: "+scoreEMA);

        if(rsi >= 0 && rsi < 50){  
            scoreRSI = 25
        }else if(rsi >= 50 && rsi < 70){
            scoreRSI = 50;


        }else{
            scoreRSI = 0;
        }

        const type = Type(scoreEMA, scoreRSI);
        console.log("EMA Score: "+scoreEMA+ " RSI Score: "+ scoreRSI);
        console.log(type);
        const takeProfit = TakeProfit("Bullish", vals[1], closes[closes.length-1]);

        res.json({
            trend: type + " Bullish",
            suggestion: "Long",
            resistance: vals[1],
            profit: takeProfit,
            currentPirce: closes[closes.length-1]
        })
    }else if(bearCount == (ema24.length)){
        scoreEMA = 15;
        console.log("Inside Using Bear Count: "+scoreEMA);

        if(rsi >= 50 && rsi <=100){
            scoreRSI = 25;
        }else if(rsi >=30 && rsi < 50){
            scoreRSI = 50;
        }else{
            scoreRSI = 0
        }

        const type = Type(scoreEMA, scoreRSI);
        console.log("EMA Score: "+scoreEMA+ " RSI Score: "+ scoreRSI);
        console.log(type);
        const takeProfit = TakeProfit("Bearish", vals[0], closes[closes.length-1]);
        res.json({
            trend: type+ " Bearish",
            suggestion: "Short",
            resistance: vals[0],
            profit: takeProfit,
            currentPirce: closes[closes.length-1]
        })
    }else{
        const alpha = 0.5 //more alpha gives more value to recent weights
        for(let i=revCount.length-1; i>0; i--){
            const current = revCount[i];
            const prev = revCount[i-1];
            if(current != prev){
                if(current == 1){ //bullish
                    const t =  (revCount.length-1) - i; //day 
                    console.log("Day: " + t)
                    let mult;
                    if(t == 0 ){
                        mult = 1;
                    }else{
                        // console.log("Alpha: "+alpha);
                        const diff = 1-alpha;
                        // console.log("Diff: "+diff);
                        mult = alpha*(Math.pow(diff,t-1));
                        // console.log("Mult: "+mult);
                    }
                    console.log("Score Before: "+scoreEMA);
                    scoreEMA = scoreEMA*mult;
                    console.log("Score After: "+scoreEMA);
                    
                    if(rsi >=0 && rsi < 30){
                        scoreRSI = 50;
                    }else if(rsi >=30 && rsi < 50){
                        scoreRSI = 25;
                    }else {
                        scoreRSI = 0;
                    }
                    
                    const type = Type(scoreEMA, scoreRSI);
                    console.log(type);
                    console.log("EMA Score: "+scoreEMA+ " RSI Score: "+ scoreRSI);

                    const takeProfit = TakeProfit("Bullish", vals[1], closes[closes.length-1]);

                    res.json({
                        trend: type + " Bullish",
                        suggestion: "Long",
                        resistance: vals[1],
                        profit: takeProfit,
                        currentPirce: closes[closes.length-1]
                    })
                    return;
                }else{ //bearish 
                    const t =  (revCount.length-1) - i;
                    console.log("Day: "+t);
                    let mult;
                    if(t == 0 ){
                        mult = 1;
                    }else{
                        // console.log("Alpha: "+alpha);
                        const diff = 1-alpha;
                        // console.log("Diff: "+diff);
                        mult = alpha*(Math.pow(diff,t-1));
                        // console.log("Mult: "+mult);
                    }

                    // console.log("Score Before: "+scoreEMA);
                    scoreEMA = scoreEMA*mult;
                    // console.log("Score After: "+scoreEMA);
                    
                    if(rsi >=0 && rsi <50){
                        scoreRSI = 0;
                    }else if(rsi >=50 && rsi < 70){
                        scoreRSI = 25;
                    }else{
                        scoreRSI = 50;
                    }
                    
                    const type = Type(scoreEMA, scoreRSI);
                    // console.log(type);
                    // console.log("EMA Score: "+scoreEMA+ " RSI Score: "+ scoreRSI);

                    const takeProfit = TakeProfit("Bearish", vals[0], closes[closes.length-1]);
                    res.json({
                        trend: type+ " Bearish",
                        suggestion: "Short",
                        resistance: vals[0],
                        profit: takeProfit,
                        currentPirce: closes[closes.length-1]
                    })
                    return;
                }
            }
        }
    }







    //SMA CODE
    // let lastIndex = closes.length - 1;
    // let lastClose = closes[lastIndex];
    // let lastSMA = sma30;

    // if(lastClose > lastSMA){

    //     res.json({  
    //         trend : "Bullish",
    //         suggestion: "Long"
    //     })
    // } 
    // else {
    //     res.json({ //Price below SMA 
    //         trend : "Bearish",
    //         suggestion: "Short"
    //     })
    // }
    
    })


})

app.listen(3000, function(){
    console.log("Listening on Port", 3000);
})

