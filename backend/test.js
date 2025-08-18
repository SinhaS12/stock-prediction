//RSI code 

function calculateRSI(data) {
    let gains = [];
    let losses = []; 

    for (let i = closes.length - 14; i <= closes.length-1; i++) {  
        const change = closes[i] - closes[i - 1];
        if (change >= 0) {
            gains.push(change);
            losses.push(0);
        } else {
            gains.push(0);
            losses.push(-change);
        }
    }

    let totalGain = 0;
    let totalLoss = 0;
    for (let i = 0; i < 14; i++) { //this loop runs only 14 times
        totalGain += gains[i];
        totalLoss += losses[i];
    }
    avgGain = totalGain / 14;
    avgLoss = totalLoss / 14;

    let rsiArray = []; //why array ?

    // First RSI
    let rs = avgGain / avgLoss;
    // rsiArray[14] = 100 - (100 / (1 + rs)); //correct logic is this one
    rsiArray[14] = 100(avgGain)/(avgGain + avgLoss); //wrong logic

    return rsiArray;

}

//where is step 2 of the calculation ??

















function isVolumeConfirmed(data, index, period = 20, multiplier = 1.5) {
  if (index < period) return false; // not enough history

  let sum = 0;
  for (let i = index - period; i < index; i++) {
    sum += data[i].volume;
  }

  let avgVolume = sum / period;
  let todayVolume = data[index].volume;

  if (todayVolume > multiplier * avgVolume) {
    return true;  // volume spike confirmed
  } else {
    return false; // no spike
  }
}



    let suggestion = "";

    //Major Support or Major Resistance
    function TradeOpportunities() { //this is right and sensible
        let majorSupport = vals[0];
        let majorResistance = vals[1];

   


        if(trend == "Bullish"){ 
            suggestion = Trend is bullish and next major resistance is at ${majorResistance} and you can capture ${majorResistance - lastClose}.;  
        }
        if(trend == "Bearish"){ 
            suggestion = Trend is bullish and next major resistance is at ${majorResistance} and you can capture ${lastClose - majorSupport}.;  
        }
}




    return {
        trend,
        rsi,
        rsiSignal,
        volumeSignal,
        suggestion,
        // suggestion: trend === "Bullish" && rsi < 70 && volumeConfirmed 
        //             ? "LONG"
        //             : trend === "Bearish" && rsi > 30 && volumeConfirmed
        //             ? "SHORT"
        //             : "WAIT"
        //     };
    
    }






    
    


function ema(timeframe, closes) {
    let emaArr = [];
    const multiplier = 2 / (timeframe + 1);

    let sum = 0;
    for (let i = 0; i < timeframe; i++) {
        sum += closes[i];
    }
    const seed = sum / timeframe;
    emaArr[timeframe - 1] = seed; 


    for (let i = timeframe; i < closes.length; i++) {
        const prevEMA = emaArr[i - 1]; 
        const currentEMA = (closes[i] - prevEMA) * multiplier + prevEMA;
        emaArr[i] = currentEMA;
    }

    return emaArr;
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
    console.log(rsi);

    return rsi; 
}