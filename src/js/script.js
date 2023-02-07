let calcStorage = document.querySelector('#calc-storage'), // input
    calcTransfer = document.querySelector('#calc-transfer'), // input
    allRadio = document.querySelectorAll('input[type="radio"]'),

    calcResStorage = document.querySelector('.calc-res_storage span'),
    calcResTransfer = document.querySelector('.calc-res_transfer span'),
  //? 1 провайдер
    calcPriceBackblaze = document.querySelector('.backblaze-bar__value'), // стовпчик
    calcBackblazeResNumber = document.querySelector('.backblaze-bar__num span'), // ціна номером
  //? 2 провайдер
    calcPriceBunny = document.querySelector('.bunny-bar__value'), // стовпчик
    calcBunnyResNumber = document.querySelector('.bunny-bar__num span'), // ціна номером
    radioBunnyInputs = document.querySelectorAll('.bunny-check[name="bunny-checked"]')
  //? 3 провайдер
    calcPriceScaleway = document.querySelector('.scaleway-bar__value'), // стовпчик
    calcScalewayResNumber = document.querySelector('.scaleway-bar__num span'), // ціна номером
    radioScalewayInputs = document.querySelectorAll('.scaleway-check[name="scaleway-checked"]');
  //? 4 провайдер
    calcPriceVultr = document.querySelector('.vultr-bar__value'), // стовпчик
    calcVultrResNumber = document.querySelector('.vultr-bar__num span'), // ціна номером


reCalcAll(); 

    function calcResultBackblazeBar(minPrice, stPrice, trPrice,) { // 1
      let res = (calcStorage.value * stPrice) + (calcTransfer.value * trPrice);
      ifMinimalPrice(res, minPrice, calcPriceBackblaze, calcBackblazeResNumber);
    }

    function calcResultBunnyBar(trPrice, maxPrice) { // 2 
      let stPrice;
      returnCheckInput(radioBunnyInputs);

      if(inputCheckd == 0) {
        stPrice = 0.01;
      } else {
        stPrice = 0.02;
      }

      let res = (calcStorage.value * stPrice) + (calcTransfer.value * trPrice);

      if (res > maxPrice) {
        calcPriceBunny.style.width = `${maxPrice * 4}px`;
        calcBunnyResNumber.innerHTML = `${maxPrice}`;
      } else {
        // calcPriceBunny.style.width = `${res * 13}px`;
        // calcBunnyResNumber.innerHTML = `${res.toFixed(2)}`;
        calcBasic(res, calcPriceBunny, calcBunnyResNumber)
      }
    }

    function calcResultScalewayBar() { // 3
      let res;
      let trPrice = 0.02;
      returnCheckInput(radioScalewayInputs);
      if (inputCheckd == 0) { // якщо обраний перший чек боксс то ціна така для sotage
         storagePrice = 0.06;
      } else {
         storagePrice = 0.03;
      }

      if (calcStorage.value < 75) { 
        storagePrice = 0
        res = (calcStorage.value * storagePrice) + (calcTransfer.value * trPrice);
      } else {
        res = ((calcStorage.value - 75) * storagePrice) + ((calcTransfer.value - 75) * trPrice);
      }

      if (calcTransfer.value < 75) {
        trPrice = 0
        res = (calcStorage.value * storagePrice) + (calcTransfer.value * trPrice);
      }  else {
        res = ((calcStorage.value - 75) * storagePrice) + ((calcTransfer.value - 75) * trPrice);
      }


      
      calcBasic(res, calcPriceScaleway, calcScalewayResNumber)
      // calcPriceScaleway.style.width = `${res * 4}px`;
      // calcScalewayResNumber.innerHTML = `${res.toFixed(2)}`;
    }

    function calcResultVultrBar(minPrice, stPrice, trPrice) { // 44
      let res = (calcStorage.value * stPrice) + (calcTransfer.value * trPrice);
      ifMinimalPrice(res, minPrice, calcPriceVultr, calcVultrResNumber);
    }


    function returnCheckInput(inputs) {
      for (let elem in inputs) {  // який чекбокс чекнутий
        if (inputs[elem].checked)
        return inputCheckd = elem; // який обраний
      }
    }
    function calcBasic(res, rowWidth, rowNum) {
      rowWidth.style.width = `${res * 4}px`;
      rowNum.innerHTML = `${res.toFixed(2)}`;
    }
    function ifMinimalPrice(res, minPrice, rowWidth, rowNum) {
      if (res < minPrice) {
        rowWidth.style.width = `${minPrice * 4}px`;
        rowNum.innerHTML = `${minPrice}`;
      } else {
        calcBasic(res, rowWidth, rowNum)
      }
    }
    function reCalcAll() {
      calcResultBackblazeBar(7, 0.005, 0.01)
      calcResultBunnyBar(0.01, 10)
      calcResultScalewayBar()
      calcResultVultrBar(5, 0.01, 0.01)
    }


    calcStorage.addEventListener('input', () => { // перераховувать і записувать скіки вибрано
      calcResStorage.innerHTML = `${calcStorage.value}`;
      reCalcAll()
    });
    calcTransfer.addEventListener('input', () => {  // перераховувать і записувать скіки вибрано
      calcResTransfer.innerHTML = `${calcTransfer.value}`;
      reCalcAll()
    })

    allRadio.forEach(e => { // при клікі на будь яке радіо перераховувати все
      e.addEventListener('input', reCalcAll);
    })

    
