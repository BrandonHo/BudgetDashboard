// Define formatter to format the amounts back to rand currency
const formatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR"
});

function getCategoryValueMapFromData(budgetData) {
  let categoryValueMap = new Map();

  for (let i = 0; i < budgetData.length; i++) {
    // Remove any funky currency-related parts from number
    let tcNumber = formatCurrencyString(budgetData[i].totalcost);
    let categoryString = budgetData[i].category;

    // Add category to appropriate map depending on type
    if (!categoryValueMap.has(categoryString))
      categoryValueMap.set(categoryString, 0);
    categoryValueMap.set(
      categoryString,
      categoryValueMap.get(categoryString) + tcNumber
    );
  }

  // Return category maps under appropriate headers
  return categoryValueMap;
}

function getKeyValueArrayFromMap(dataMap) {
  let keyValueArray = [];

  // Add each key/value pair to array
  for (const [mapKey, mapValue] of dataMap.entries()) {
    keyValueArray.push({
      label: mapKey,
      value: mapValue
    });
  }
  return keyValueArray;
}

function getIncomeAndExpenseDataArrays(budgetData) {
  let newIncomeItems = [];
  let newExpenseItems = [];

  for (let i = 0; i < budgetData.length; i++) {
    // Add description/value based on data type
    let typeString = budgetData[i]["type"];

    if (typeString.includes("income")) newIncomeItems.push(budgetData[i]);
    else newExpenseItems.push(budgetData[i]);
  }

  // Return income/expense arrays under appropriate headers
  return { incomeItems: newIncomeItems, expenseItems: newExpenseItems };
}

function getTotalsForIncomeExpenseAndGross(budgetData) {
  let totalIncome = 0;
  let totalExpenses = 0;

  for (let i = 0; i < budgetData.length; i++) {
    let typeString = budgetData[i]["type"];

    // Remove any funky currency-related parts from number
    let tcNumber = formatCurrencyString(budgetData[i]["totalcost"]);

    // Add to income/expense total based on type
    if (typeString.includes("income")) totalIncome += tcNumber;
    else totalExpenses += tcNumber;
  }

  // Return the various totals under appropriate headers
  return {
    totalIncome: formatter.format(totalIncome),
    totalExpenses: formatter.format(totalExpenses),
    totalGross: formatter.format(totalIncome - totalExpenses)
  };
}

function formatCurrencyString(currencyAmountString) {
  return Number(currencyAmountString.replace(/[^0-9.-]+/g, ""));
}

export default {
  getCategoryValueMapFromData,
  getKeyValueArrayFromMap,
  getIncomeAndExpenseDataArrays,
  getTotalsForIncomeExpenseAndGross
};
