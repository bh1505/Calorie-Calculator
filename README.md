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

