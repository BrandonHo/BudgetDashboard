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

  // Sort key-value pairs according to value
  keyValueArray.sort((a, b) => {
    if (a.value < b.value) {
      return 1;
    }
    if (b.value < a.value) {
      return -1;
    }
    return 0;
  });

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

  const mapKeys = [...totalPerDateMap.keys()];
  mapKeys.sort((a, b) => {
    // Date is string with DD/MM format
    const dayA = Number(a.split('/')[0]);
    const dayB = Number(b.split('/')[0]);

    if (dayA > dayB) {
      return 1;
    }
    if (dayB > dayA) {
      return -1;
    }
    return 0;
  });

  for (let i = 0; i < mapKeys.length; i += 1) {
    cumulativeTotal += totalPerDateMap.get(mapKeys[i]);
    totalPerDateArray.push({
      label: mapKeys[i],
      value: cumulativeTotal,
    });
  }

  return totalPerDateArray;
}

function getGrossCategoriesAndValues(incomeItems, expenseItems) {
  const dateToTotalMap = new Map();

  // Add income items to map
  for (let incomeItemIndex = 0; incomeItemIndex < incomeItems.length; incomeItemIndex += 1) {
    if (!dateToTotalMap.has(incomeItems[incomeItemIndex].date)) {
      dateToTotalMap.set(incomeItems[incomeItemIndex].date, 0);
    }
    dateToTotalMap.set(
      incomeItems[incomeItemIndex].date,
      dateToTotalMap.get(incomeItems[incomeItemIndex].date)
      + removeCurrencySyntax(incomeItems[incomeItemIndex].totalcost),
    );
  }

  // Add expense items to map
  for (let expenseItemIndex = 0; expenseItemIndex < expenseItems.length; expenseItemIndex += 1) {
    if (!dateToTotalMap.has(expenseItems[expenseItemIndex].date)) {
      dateToTotalMap.set(expenseItems[expenseItemIndex].date, 0);
    }
    dateToTotalMap.set(
      expenseItems[expenseItemIndex].date,
      dateToTotalMap.get(expenseItems[expenseItemIndex].date)
      - removeCurrencySyntax(expenseItems[expenseItemIndex].totalcost),
    );
  }

  // Sort map keys for processing
  const mapKeys = [...dateToTotalMap.keys()];
  mapKeys.sort((a, b) => {
    // Date is string with DD/MM format
    const dayA = Number(a.split('/')[0]);
    const dayB = Number(b.split('/')[0]);

    if (dayA > dayB) {
      return 1;
    }
    if (dayB > dayA) {
      return -1;
    }
    return 0;
  });

  // Construct array with cumulative totals from map
  let cumulativeTotal = 0;
  const dateCategories = [];
  const dateValues = [];
  for (let keyIndex = 0; keyIndex < mapKeys.length; keyIndex += 1) {
    cumulativeTotal += dateToTotalMap.get(mapKeys[keyIndex]);
    dateCategories.push({
      label: mapKeys[keyIndex],
    });
    dateValues.push({
      value: cumulativeTotal,
    });
  }

  return { categories: dateCategories, values: dateValues };
}

export default {
  getCategoryValueMapFromData,
  getKeyValueArrayFromMap,
  getIncomeAndExpenseDataArrays,
  getTotalsForIncomeExpenseAndGross,
  getCumulativeTotalPerDateArray,
  addCurrencySyntax,
  getGrossCategoriesAndValues,
};
