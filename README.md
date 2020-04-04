# Budget Dashboard

A dashboard which retrieves, processes, and displays budget-related data from a google spreadsheet. A live demonstration of the budget dashboard can be found [here](https://brandonho.github.io/BudgetDashboard/).

### Install Steps

1. Clone repository.
2. Run ```npm install``` to install required dependencies.
3. Run ```npm start``` to run the application in development mode. Visit http://localhost:3000 to view it in the browser.

### Google Sheets API (Optional)

The application is designed to use dummy data if a Google Sheets API key and Google spreadsheet ID is not supplied in a .env file
in the dashboard directory.

Google Sheets API Key:
1. Go to [Google Developer Console](https://console.developers.google.com/apis)
2. Create a new project
3. Enable the Google Sheets API
3. Generate your API key

Google Spreadsheet ID:
1. Create a Google Spreadsheet (with the same format as this [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1x6IFOL0hs8CSlq7oARXT3tvIanBJlYNZqbvAGDOM9sI))
2. Change sheet name to 'Budget' (or simply change the code in the app.js file to read a specified sheet name)
2. Expose the created spreadsheet to the public
3. The spreadsheet ID is the portion of the website address between ```docs.google.com/spreadsheets/d/``` and the following ```/```

Once both API key and spreadsheet ID have been obtained, create a .env file in the dashboard directory, and add the following
lines to the file:

```REACT_APP_API_KEY='Your API KEY'```

```REACT_APP_SS_ID='Your spreadsheet ID'```
 
