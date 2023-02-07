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

//input[name="input_name"]

reCalcAll();
    calcStorage.addEventListener('input', () => {
      calcResStorage.innerHTML = `${calcStorage.value}`;
    });
    calcTransfer.addEventListener('input', () => {
      calcResTransfer.innerHTML = `${calcTransfer.value}`;
    })
    allRadio.forEach(e => {
      e.addEventListener('input', reCalcAll);
    })

    function calcResultBackblazeBar() {
      let minimumPrice = 7;
      let storagePrice = 0.005;
      let transferPrice = 0.01;
      let res = (calcStorage.value * storagePrice) + (calcTransfer.value * transferPrice);
      if (res < minimumPrice) {
        calcPriceBackblaze.style.width = `${minimumPrice * 13}px`;
        calcBackblazeResNumber.innerHTML = `${minimumPrice}`;
      } else {
        calcPriceBackblaze.style.width = `${res * 13}px`;
        calcBackblazeResNumber.innerHTML = `${res.toFixed(2)}`;
      }
    }
    function calcResultBunnyBar() {
      let maxPrice = 10;
      let storagePrice;
      let transferPrice = 0.01;

      for (let elem in radioBunnyInputs) {
        if (radioBunnyInputs[elem].checked)
        inputCheckd = elem; // який обраний
      }
      if(inputCheckd == 0) {
        storagePrice = 0.01;
      } else {
        storagePrice = 0.02;
      }

      let res = (calcStorage.value * storagePrice) + (calcTransfer.value * transferPrice);
      if (res > maxPrice) {
        calcPriceBunny.style.width = `${maxPrice * 13}px`;
        calcBunnyResNumber.innerHTML = `${maxPrice}`;
      } else {
        calcPriceBunny.style.width = `${res * 13}px`;
        calcBunnyResNumber.innerHTML = `${res.toFixed(2)}`;
      }
    }
    function calcResultScalewayBar() {
      // let maxPrice = 10;
      // let storagePrice = 0.02;
      let transferPrice = 0.02;
      let res;

      for (let elem in radioScalewayInputs) {
        if (radioScalewayInputs[elem].checked)
        inputCheckd = elem; // який обраний
      }

      if (calcStorage.value < 75) {
        storagePrice = 0
        res = (calcStorage.value * storagePrice) + (calcTransfer.value * transferPrice);
      } else {
        
        if(inputCheckd == 0) {
          storagePrice = 0.06;
        } else {
          storagePrice = 0.03;
        }
        res = ((calcStorage.value - 75) * storagePrice) + ((calcTransfer.value - 75) * transferPrice);
      }
      if (calcTransfer.value < 75) {
        transferPrice = 0
        res = (calcStorage.value * storagePrice) + (calcTransfer.value * transferPrice);
      } else {
        res = ((calcStorage.value - 75) * storagePrice) + ((calcTransfer.value - 75) * transferPrice);
      }
      calcPriceScaleway.style.width = `${res * 13}px`;
      calcScalewayResNumber.innerHTML = `${res.toFixed(2)}`;
    }


    function reCalcAll() {
      calcResultBackblazeBar()
      calcResultBunnyBar()
      calcResultScalewayBar()
    }


    calcStorage.addEventListener('input', () => {
      reCalcAll()
    });
    calcTransfer.addEventListener('input', () => {
      reCalcAll()
    })
    
