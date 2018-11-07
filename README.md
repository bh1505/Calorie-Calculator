# Calorie Calculator

## Overview

Calorie Calculator is a web app that will allow users to keep track of the number of calories they have eaten on a given day. 
Users will be allowed to register their own accounts where they can input their daily caloric and 
monetary goals and add the foods they have have eaten throughout the day in a personal catalog. 
This app will be a useful tool for those who are aiming to cut down on weight, to gain muscle, or to manage their expenses.

Each user will have their own catalog and will have the ability to set caloric and monetary goals for the day. 
Once that's in place, 
as the day goes by, the user can add foods they have eaten to their catalog. The user will be prompted to enter the name
of the food, the time it was consumed, the price, and most importantly, the total calories. As the user continues 
to add new items, the app will notify the user on certain milestones, such as "You have reached half of your goal!" or 
"That just put you over your goal!". The user will be able to moderate their choices via a counter that displays how many 
more calories they have left to reach their goal as well as another one that displays their total amount of money spent.
For each day a user completes, that information will be stored so the user may
look up their activity for a specific day or track their overall progress.

## Data Model

(TODO: a description of your application's data and their relationships to each other)

The application will store Users and a dictionary-like object for each user.
The dictionary object will have keys set to the specified date of the catalog entry.
Each key will be mapped to a list of foods (items) the user has ate on that day.
The lists will also contain properties:
- calorieGoal (the caloric goal for the day)
- calorieCount (the current caloric count for the day)
- moneyGoal (the monetary goal for the day)
- moneyCount (the current monetary count for the day)

(TODO: sample documents)

An Example User:

```
{
  username: "user123",
  hash: //password hash,
  catalog: //an object with key (date) and value (list of food items) pairs
}
```

An Example catalog (dictionary) with Embedded Items:

```
{
  username: //user,
  catalog: { '2018-11-07' : [ {name: "cookie", time: "20", price: "2", cals: "250"},
                              {name: "chicken and rice", time: "14", price: "10", cals: "500"} ],
             '2018-11-06' : [ {name: "Chipotle Burrito", time: "12", price: "10", cals: "800"} ]
           }
}
```

## [Link to Commented First Draft Schema](src/db.js)

## Wireframes

(TODO: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/login 

![alt text](documentation/login.pdf)

/goals

![alt text](documentation/goals.pdf)

/home 

![alt text](documentation/home.pdf)

/add

![alt text](documentation/add.pdf)

/lookup

![alt text](documentation/lookup.pdf)

## Site map

![alt text](documentation/sitemap.pdf)

## User Stories or Use Cases

1. As a non-registered user, I can register a new account with site
2. As a user, I can log in to the site
3. As a user, I can add a new entry to my catalog, inputting my goals for today's date.
4. As a user, I can populate this new entry with food items I have ate throughout the day.
5. As a user, I can view what I have eaten today, my goals for the day, the amount of calories I
have ate, and the amount of money I have spent.
6. As a user, I can lookup previous entries in my catalog by providing a past date.

## Research Topics

- (5 points) Integrate user authentication 
  - I will use bcrypt.js in order to hash passwords. 
  - I have decided to use this so multiple people can use this app since no two people will
  have the same food history. 
  - Calorie Calculator involves private information that people may
  not feel comfortable in sharing. 
  - This allows a user to store several days of information and also lookup past eating/spending activity.
- (2 points) Use a CSS framework: Bootstrap
  - I am a bit familiar with Bootstrap.
  - I want to use it to give my site some life and pleasing to look at.
  - I intend to configure a theme. 
- (3 points) Perform client side form validation 
  - Since my app requires several entries from the user when adding a new food item, for example,
  form validation is important in maintaining consistent data, especially when summing today's calories eaten.
  - For example, if you put value for Time greater than 23, an error message will appear in the DOM.
- (1 point) Use jQuery as an external API
  - Will use it to create simple animated notifications, such as when the user surpasses their caloric goal.
 
 11 points out of 8 required points.
 
 ## [Link to Initial Main Project File](src/app.js)

