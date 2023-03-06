## Abstract

This app is a website for the "Overlook Hotel" where a customer can log in and view their bookings and how much they've spent. Users can navigate to another page to view rooms available on the date they select, and filter them according to the room type, as well as select a room to book, which will update their account and booked page accordingly.


## Installation Instructions

Clone down this repo and the [API repo](https://github.com/turingschool-examples/overlook-api)

For both the App and the API; 
Install the library dependencies by running:

```bash
npm install
```

Then run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see the Overlook login page.

## Login Credentials

```
username: customer50 (where 50 is the id of the customer - supports any number from 01-50)
password: overlook2021
```

![image](https://user-images.githubusercontent.com/114776048/223245469-b393dbdc-e7f6-4af3-8624-1b7974ecdcc3.png)

## Context
This was my final solo project of Module 2 of the Front End Engineering Program, and it took me ~30 hours to complete.

## Learning Goals
- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Create a robust test suite that thoroughly tests all functionality of a client-side application

## Wins + Challenges
- I mistakenly thought that the user would need to be able to filter both their dashboard's bookings and the new bookings rooms, which was definitely a challenge to handle separately, but also a win because I did get them to function independently of each other.
- My accessibility testing all passed first try, which was a relief because I was really trying to think about it during creation instead of in hindsight.
- A big challenge I was running into was getting one of my tests to pass- the functionality worked on the page but failed a test, so after a lot of troubleshooting later I realized it was an issue with the minimal amount of data I was passing in for the tests, and not actually my method's fault.
