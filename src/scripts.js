// Styling
import './css/styles.css';

// Images
import './images/bg-image.jpg';
import './images/residential suite.jpg';
import './images/suite.jpg';
import './images/junior suite.jpg';
import './images/single room.jpg';

// Classes
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import Room from './classes/Room';
import Booking from './classes/Booking';

// Calendar
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

new AirDatepicker('#calendar', {
  locale: localeEn,
  autoClose: true,
  onSelect: object => filterByDate(object.formattedDate)
});

// APIs
import { getData } from './api-calls';

let allCustomers, allRooms, allBookings, hotel, customer, dashPage;

Promise.all([getData('customers'), getData('rooms'), getData('bookings')])
.then(values => {
  allCustomers = values[0].customers;
  allRooms = values[1].rooms.map(room => new Room(room));
  allBookings = values[2].bookings.map(booking => new Booking(booking));
  hotel = new Hotel(allRooms, allBookings);
});

// Elements
const loginPage = document.querySelector('#login-page');
const loginButton = document.querySelector('#submit-login');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');

const actionPage = document.querySelector('#action-page');
const sidebar = document.querySelector('#side-nav');
const navBanner = document.querySelector('#nav-banner');
const profileButton = document.querySelector('#profile-button');
const newBookingsButton = document.querySelector('#new-bookings-button');
const pageType = document.querySelector('#page-type');
const logOutButton = document.querySelector('#log-out');

const customerBookings = document.querySelector('#customer-bookings');

const dashboard = document.querySelector('#dashboard-container');
const newBooking = document.querySelector('#new-booking');


loginButton.addEventListener('click', getLogin);
logOutButton.addEventListener('click', resetSite);
navBanner.addEventListener('click', switchPage);
sidebar.addEventListener('click', event => {
  if (event.target.type === 'radio') {
    if (customer.selectedType === event.target.dataset.filter) {
      event.target.checked = false;
      customer.resetType();
      customer.selectedDate ? filterByDate(customer.selectedDate) : updateCustomerDisplay('allCustomerBookings');
    } else {
      filterByType(event.target.dataset.filter);
    };
  };
});


function hide(element) {
  element.classList.add('hidden');
};

function show(element) {
  element.classList.remove('hidden');
};

function getLogin(event) {
  event.preventDefault();
  const userAttempt = usernameInput.value;
  const passAttempt = passwordInput.value;

  let catchID = userAttempt.split('');
  let id = catchID[catchID.length -2] + catchID[catchID.length - 1];


  if ((parseInt(id) < 1 || parseInt(id) > 50) || (userAttempt !== `customer${id}` || passAttempt !== 'overlook2021')) {
    console.log('Login Failed!'); // ERROR HANDLING LATER ------------------------------------------
    return;
  } else {
    Promise.all([getData(`customers/${id}`)])
    .then(value => {
      customer = new Customer(value[0], hotel);
      updateCustomerInfo();
    });

    hide(loginPage);
    show(actionPage);
    dashPage = true;

    usernameInput.value = '';
    passwordInput.value = '';
  };
};

function updateCustomerInfo() {
  const helloCustomer = document.querySelector('#hello-customer');

  helloCustomer.innerText = `${customer.name.split(' ')[0]}`;

  customer.resetBookings(allBookings);
  customer.trackSpending(allRooms);
  
  updateCustomerDisplay('allCustomerBookings');
};

function updateCustomerDisplay(updateWith) {
  const amountSpent = document.querySelector('#amount-spent');
  
  amountSpent.innerText = `$${customer.spent}`;
  customerBookings.innerHTML = '';

  if (customer.selectedDate && customer.selectedType) {
    updateWith = 'filteredBoth';
  };

  if (!customer[updateWith].length) {
    customerBookings.innerHTML = '<h2 class="apology">WE ARE SO SORRY! NO BOOKINGS FOUND 😭</h2>';
  }

  customer[updateWith].forEach(booking => {
    let bookingRoom = customer.hotel.getRoomOfBooking(booking.roomNumber);

    customerBookings.innerHTML += 
    `
    <article class="room">
      <img src="./images/${bookingRoom.type}.jpg" alt="Picture of ${bookingRoom.type}">
      <div class="roomBottom">
        <header class="roomInfo">
          <h2 class="roomType">${bookingRoom.type}</h2>
          <h3 class="sizeAndCount">${bookingRoom.numBeds} ${bookingRoom.bed}</h3>
        </header>
        <header class="bookedDate">
          <h2 class="bookedDateHead">Booked</h2>
          <h3 class="dateBooked">${booking.date}</h3>
        </header>
      </div>
    </article>
    `;
  });
};

function updateNewBookingDisplay() {
  
};

function switchPage(event) {
  if (event.target.dataset.active === 'false') {
    event.target.dataset.value === 'new-bookings' ? switchToNewBooking() : switchToProfile();
  };
};

function switchToNewBooking() {
  dashPage = false;
  profileButton.dataset.active = 'false';
  newBookingsButton.dataset.active = 'true';
  pageType.innerText = 'Book a Room';
  show(newBooking);
  hide(dashboard);
};

function switchToProfile() {
  dashPage = true;
  profileButton.dataset.active = 'true';
  newBookingsButton.dataset.active = 'false';
  pageType.innerText = 'My Bookings';
  show(dashboard);
  hide(newBooking);
};

function filterByDate(date) {

  if (!date) {
    if (dashPage) {
      customer.resetDate();
      customer.selectedType ? filterByType(customer.selectedType) : updateCustomerDisplay('allCustomerBookings');
    } else {
      updateNewBookingDisplay()
    }
    return;
  };

  if ((date[0] + date[1]) === '20') {
    customer.selectDate(date);
    updateCustomerDisplay('filteredByDate');
    return;
  };

  const splitDate = date.split('/');
  const reformattedDate = `${splitDate[2]}/${splitDate[0]}/${splitDate[1]}`;

  if (dashPage) {
    customer.selectDate(reformattedDate);
    updateCustomerDisplay('filteredByDate');
  } else {
    // hotel.selectDateBookings(reformattedDate);
    // display here
  }
};

function filterByType(filter) {
  if (dashPage) {
    customer.selectType(filter);
    updateCustomerDisplay('filteredByType');
  }
};

function resetSite() {
  show(loginPage);
  hide(actionPage);
};