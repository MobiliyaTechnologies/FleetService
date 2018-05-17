# Fleet Service for Device/Vehicle/Fleet Management


`Fleet Service` is REST API server implementation built on top `Node.js` and `Express.js` with `Sequelize` for `SQL Server` integration.


You need to have [Node.js](https://nodejs.org), [SQL Server Management Studio ](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-2017) and [Visual Studio](https://www.visualstudio.com/downloads/) installed.


### Installation
npm install 

### Run server
npm start

### Testing the API
Test REST API using [Postman](https://www.getpostman.com/apps)
```sh
http POST http://localhost:3302/
```

### Publishing a NodeJS app to Azure
1.In Visual Studio, create a new project, and for the type, select 'From Existing Node.js code'.<br/>
2.Add project from your project home folder( ‘c:\users\..\projects’).<br/>
3.At the top of the project, right click and select publish: In the resulting popup, select ‘Microsoft Azure App Service’<br/>
4.Download the PublishSettings File of Fleet Service from the Azure Portal and use it for deployment.<br/>
Once it is download, you can import it in your Visual Studio Publish Web Application wizard.Finally you can start publish by selecting “Publish” option.<br/>
After setting things up remotely, Visual Studio will proceed to publish the app to Azure.<br/>

### Documentation

Check out the
[api docs](https://fleet-service.azurewebsites.net/docs) we have written so far for more documentation.
Use below credentials to access the api documentation.<br/>
Username:admin<br/>
Password:fleet@123<br/>
