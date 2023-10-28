const REGISTER_STATUS = {
    closed: 'CLOSED',
    insufficientFunds: 'INSUFFICIENT_FUNDS',
    open: 'OPEN'
};

function checkCashRegister(price, cash, cid) {
    let cashRegister = {status: '', change: cid};
    const changeNeeded = parseFloat(cash - price).toFixed(2);
    const changeAvailable = getTotalCashRegisterChange(cid);
    cashRegister.status = getTotalCashRegisterStatus(changeNeeded , changeAvailable);

    if (cashRegister.status === REGISTER_STATUS.insufficientFunds) {
        cashRegister.change = [];

        return cashRegister;
    }

    cashRegister.change = getCustomersChange(changeNeeded , cid);

    if (changeNeeded > getTotalCashRegisterChange(cashRegister.change)){
        cashRegister.status = REGISTER_STATUS.insufficientFunds;
        cashRegister.change = [];
    }

    if (cashRegister.status === REGISTER_STATUS.closed){
        cashRegister.change = [...cid]
    }

    return cashRegister;

  }

  function getCustomersChange(needed , changeInDrawer) {
    const change = [];
    const currencyDictionary = {
        'PENNY': 0.01,
        'NICKEL': 0.05,
        'DIME': 0.10,
        'QUARTER': 0.25,
        'ONE': 1.00,
        'FIVE': 5.00,
        'TEN': 10.00,
        'TWENTY': 20.00,
        'ONE HUNDRED': 100.00
    };
    for (let i = changeInDrawer.length - 1; i >= 0; i--) {
        const coinName = changeInDrawer[i][0];
        const coinTotal = changeInDrawer[i][1];
        const coinValue = currencyDictionary[coinName];
        let coinAmount = (coinTotal / coinValue).toFixed(2);
        let coinsToReturn = 0;

        while (needed >= coinValue && coinAmount > 0) {
            needed = needed - coinValue;
            needed = needed.toFixed(2);
            coinAmount--;
            coinsToReturn++;
        }
        if (coinsToReturn > 0) {
            change.push([coinName , coinsToReturn * coinValue]);
        }

    }

    return change
  }

  function getTotalCashRegisterStatus(needed , available) {
    if (Number(needed) > Number(available)){
        return REGISTER_STATUS.insufficientFunds;
    }
    if (Number(needed) < Number(available)){
        return REGISTER_STATUS.open;
    }
        return REGISTER_STATUS.closed;
  }

  function getTotalCashRegisterChange(changeInDrawer) {
    let total = 0;
    for (let change of changeInDrawer) {
        total = total + change[1];
    }
    return total.toFixed(2)
  }

  console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))