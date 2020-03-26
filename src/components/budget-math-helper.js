// Define formatter to format the amounts back to rand currency
const formatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
});

function addCurrencySyntax(number) {
  return formatter.format(number);
}

function removeCurrencySyntax(currencyAmountString) {
  return Number(currencyAmountString.replace(/[^0-9.-]+/g, ''));
}

function getCategoryValueMapFromData(budgetData) {
  const categoryValueMap = new Map();

  for (let i = 0; i < budgetData.length; i += 1) {
    // Add category to appropriate map depending on type
    const categoryString = budgetData[i].category;
    if (!categoryValueMap.has(categoryString)) {
      categoryValueMap.set(categoryString, 0);
    }
    categoryValueMap.set(
      categoryString,
      categoryValueMap.get(categoryString)
      + removeCurrencySyntax(budgetData[i].totalcost),
    );
  }

  // Return category maps under appropriate headers
  return categoryValueMap;
}

function getKeyValueArrayFromMap(dataMap) {
  const keyValueArray = [];

  const mapKeys = [...dataMap.keys()];
  for (let i = 0; i < mapKeys.length; i += 1) {
    keyValueArray.push({
      label: mapKeys[i],
      value: dataMap.get(mapKeys[i]),
    });
  }

  return keyValueArray;
}

function getIncomeAndExpenseDataArrays(budgetData) {
  const newIncomeItems = [];
  const newExpenseItems = [];

  for (let i = 0; i < budgetData.length; i += 1) {
    // Add description/value based on data type
    const typeString = budgetData[i].type;

    if (typeString.includes('income')) newIncomeItems.push(budgetData[i]);
    else newExpenseItems.push(budgetData[i]);
  }

  // Return income/expense arrays under appropriate headers
  return { incomeItems: newIncomeItems, expenseItems: newExpenseItems };
}

function getTotalsForIncomeExpenseAndGross(budgetData) {
  let totalIncome = 0;
  let totalExpenses = 0;

  for (let i = 0; i < budgetData.length; i += 1) {
    const typeString = budgetData[i].type;

    // Remove any funky currency-related parts from number
    const tcNumber = removeCurrencySyntax(budgetData[i].totalcost);

    // Add to income/expense total based on type
    if (typeString.includes('income')) totalIncome += tcNumber;
    else totalExpenses += tcNumber;
  }

  // Return the various totals under appropriate headers
  return {
    totalIncome,
    totalExpenses,
    totalGross: totalIncome - totalExpenses,
  };
}

function getCumulativeTotalPerDateArray(budgetData) {
  // Calculate and map totals per day
  const totalPerDateMap = new Map();
  for (let i = 0; i < budgetData.length; i += 1) {
    if (!totalPerDateMap.has(budgetData[i].date)) {
      totalPerDateMap.set(budgetData[i].date, 0);
    }
    totalPerDateMap.set(
      budgetData[i].date,
      totalPerDateMap.get(budgetData[i].date)
      + removeCurrencySyntax(budgetData[i].totalcost),
    );
  }

  // Calculate/add cumulative totals by iterating through map entries (new map with sorted entries)
  let cumulativeTotal = 0;
  const totalPerDateArray = [];

  const mapKeys = [...totalPerDateMap.keys()].sort();
  for (let i = 0; i < mapKeys.length; i += 1) {
    cumulativeTotal += totalPerDateMap.get(mapKeys[i]);
    totalPerDateArray.push({
      label: mapKeys[i],
      value: cumulativeTotal,
    });
  }

  return totalPerDateArray;
}

export default {
  getCategoryValueMapFromData,
  getKeyValueArrayFromMap,
  getIncomeAndExpenseDataArrays,
  getTotalsForIncomeExpenseAndGross,
  getCumulativeTotalPerDateArray,
  addCurrencySyntax,
};
