<div align="center">Hubla Challenge</div>

## 👋 Welcome

This is the work i have done to showcase some of my skills and my passion for new challenges as well as my capabilities in documentation and time management
## Project Description

### Problem to Solve
This project is for a creator-affiliate model where a creator can sell their products as well as allow affiliates to also sell this product with a selling fee, there is a natural and urgent need of such platform to allow its customers, the sellers, to upload files with financial transactions information regarding fees and profits from the products sales.

### Success Definition
In order to fully satisfy the customers, the platforms needs to provide the following functionalities:

  - A page to allow the upload of a file in .txt format
  - Read and parse the content of the uploaded file, according to it's interpretation definitions, and save the normalized data where it can be available to the customer
  - A page to display to the customer (and their affiliates) their data, showcasing all the transactions from the uploaded files
  - Showcase the financial balance of the creator
  - Showcase the financial balance of the affiliates
  - Handle possible errors from such operations in a user friendly format

This work is the effort to fulfill these requirements

### Solution Description

The solution consists of a platform with a Drag and Drop file upload functionality that parses the data on the client and sends the parsed data to be saved on the server/database. After data has been uploaded and parsed, the customer is redirected to a Dashboard page. This page shows the current user total balance at the top and a list of transactions right below it. 

This table of content displays the transaction type, date, product description and value (formatted for dollars from cents) and seller name. All pertinent to each transaction that user has access.

In order to be able to implement authorization and different levels of access, the platform uses authentication to determine the user role among admin, creator with affiliates or affiliate. With the information of the user role, the platform determines which their data access level. 

As an admin, an user can see the entirety of the transactions uploaded to the platform by any creator or affiliate and no balance is demonstrated, since the admin does not participate in any transaction. As a creator, the platform displays the calculated balance of this user and also demonstrates each of their affiliates balance, discriminated by their name. The creator also has access to their own transactions and of their affiliates transactions with all the mentioned information. And with the least data access level, an affiliate can only see his own balance as well and as the transctions he participated. 

## Project Stack

### Backend (api)
  - Postgres as database
  - Node.js with express and typescript
  - Prisma as ORM
  - Vitest as testing framework for the backend
  - docker as orchestration for api, database and test database services
  
### Frontend (webform)
  - React with Next.js, typescript and tailwind
  - Jest for testing

## Project Setup

### Backend(api)
The backend runs on yarn 3.5.0 in order to fully use the Plug'n'Play feature and faster performance which mounts to a good tradeoff when it comes to new projects, despite it's problems with older libs compatibility and relatively higher complexity of configuration compared to earlier versions of yarn.


1. Inside the api folder, make sure you are using the correct version of yarn
   ```bash
   $ yarn set version 3.5.0
   ```

2. Install all dependencies for each folder
   ```bash
   $ yarn
   ```
   If there is any hiccups with the yarn dependency management in this project, please contact me, or use these troubleshooting resources: [yarn installation](https://yarnpkg.com/getting-started/install), [Editor SDKs](https://yarnpkg.com/getting-started/editor-sdks)

3. Create the .env file from the .env.example. If you would like to run the application on a different port than the default (5000), please change the PORT variable in .env and make the desired port available on the docker-compose api service before building it
   ```bash
   $ cp .env.example .env
   ```

3. Run the docker container to build and run all services available. After building it the first time, you can remove the --build flag, keeping the -d flag for detached mode to keep your terminal free for other purposes
   ```bash
   $ docker-compose up --build -d
   ```
   Inside docker compose there is a second database, called test_database, that will only be used during our integration tests. This was put together on the same file only for simplicity

4. Apply the migrations and initial seed to the database you just created while also generating prisma client
   ```bash
   $ yarn db:migrate
   ```

5. At this point, your backend is up and running. You can access it's swagger documentation on http://localhost:5000/docs

6. For testing use. Check out package.json scripts for tests with UI flag option
   ```bash
   $ yarn test:unit
   $ yarn test:integration
   ```

### Frontend(webform)

The frontend runs on yarn 1.22.15 in order to make use of the out-of-the box project creation solution of Next.js with minimal configuration.

1. Inside the api folder, make sure you are using the correct version of yarn
   ```bash
   $ yarn set version 1.22.15
   ```

2. Install all dependencies for each folder
   ```bash
   $ yarn
   ```

3. Run your frontend with yarn. After this you can access the application at http://localhost:3000
   ```bash
   $ yarn dev
   ```

4. There are several users you can access. If you want access as admin, try: arthur.oliveira@hub.la or david.reis@hub.la. If you want to access as a creator, try jose.carlos@hub.la or an affiliate as thiago.oliveira@hub.la. In addition to these, every seller name in the sales.txt file has a user in that format. For all users, the password is: candidato contratado (as it is)

## Planning

Here are the resources and tools used during planning and development

  - [Entity-Relationship Diagram](https://lucid.app/lucidchart/00a845c0-6279-4f7c-9da5-7abe5c2e8a4b/edit?viewport_loc=-90%2C72%2C2715%2C868%2C0_0&invitationId=inv_10b2d3aa-9a1f-4c89-8af0-a8bebad1698e)

  - [Product Roadmap](https://amethyst-soursop-6b9.notion.site/2cec17b1ec014c7f9e5c8d8ade28df4b?v=a20a25ac4d2e4d6da41a3789e5d6c39d)

  - [NextJs authentication](https://www.youtube.com/watch?v=pvrKHpXGO8E)

  - [swagger implementation](https://levelup.gitconnected.com/the-simplest-way-to-add-swagger-to-a-node-js-project-c2a4aa895a3c)

  - [Integration tests with vitest and prisma](https://www.prisma.io/blog/testing-series-4-OVXtDis201)

  - [Drag and Drop tailwind components](https://flowbite.com/docs/forms/file-input/)

  - [Header Bar component](https://tailwindui.com/components/application-ui/application-shells/stacked)

  - [Sign In Form component](https://tailwindui.com/components/application-ui/forms/sign-in-forms)


## Improvements
  There are a few points worthy of improvement in the application, which i would choose to work on, on follow up refactors or improvements of the platform

  Some are issues that need to be tackled

  - The password exclusion on routes that return seller info. This is being done in the controller layers as of now, but i am sure there are other ways such as the @Exclude decorator using [class-transformer lib](https://github.com/typestack/class-transformer)

  - The navigation system in the frontend application is repeated across two pages creating duplication of code and making the logic of navigation hardcoded. This can definitely be improved

  - The User Feedback on the upload page, after an upload and submission, even though the user is redirected, there should be a tooltip or modal to let them know about the upload prior to that

  Some are improvements that due to a tradeoff choice to not increase complexity unecessarily, could or not be implemented after discussion with the team that i would work in such platform

  - Implementation of Auth0 as authentication manager. It is really interesting to use and allows up to 7000 free Monthly Active Users

  - Create domain testing APIs to abstract the 'Arrange' part of the tests, making the code cleaner to read
