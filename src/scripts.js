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
import Room from './classes/Room';
import Booking from './classes/Booking';

// Calendar
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

new AirDatepicker('#calendar', {
  locale: localeEn,
  autoClose: true
});

// APIs
import { getData } from './api-calls';

let allCustomers, allRooms, allBookings, customer;

Promise.all([getData('customers'), getData('rooms'), getData('bookings')])
.then(values => {
  allCustomers = values[0].customers;
  allRooms = values[1].rooms.map(room => new Room(room));
  allBookings = values[2].bookings.map(booking => new Booking(booking, allRooms));
});

// Elements
const loginPage = document.querySelector('#login-page');
const loginButton = document.querySelector('#submit-login');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');

const actionPage = document.querySelector('#action-page');
const navBanner = document.querySelector('#nav-banner');
const logOutButton = document.querySelector('#log-out');

const customerBookings = document.querySelector('#customer-bookings');

const dashboard = document.querySelector('#dashboard-container');
const newBooking = document.querySelector('#new-booking');


loginButton.addEventListener('click', getLogin);
logOutButton.addEventListener('click', resetSite);
navBanner.addEventListener('click', switchPage);


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
    console.log('Login Failed!');
    return;
  } else {
    Promise.all([getData(`customers/${id}`)])
    .then(value => {
      customer = new Customer(value[0], allRooms, allBookings);
      updateCustomerInfo();
    });

    hide(loginPage);
    show(actionPage);

    usernameInput.value = '';
    passwordInput.value = '';
  };
};

function updateCustomerInfo() {
  customer.trackSpending();
  
  updateCustomerDisplay();
};

function updateCustomerDisplay() {
  const helloCustomer = document.querySelector('#hello-customer');
  const amountSpent = document.querySelector('#amount-spent');

  helloCustomer.innerText = `${customer.name.split(' ')[0]}`;
  amountSpent.innerText = `$${customer.spent}`;
  customerBookings.innerHTML = '';

  customer.bookings.forEach(booking => {
    let bookingRoom = booking.getRoom();

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

function switchPage(event) {
  if (event.target.dataset.active === 'false') {
    event.target.dataset.value === 'new-bookings' ? switchToNewBooking() : switchToProfile();
  };
};

function switchToProfile() {
  const profileButton = document.querySelector('#profile-button');
  const newBookingsButton = document.querySelector('#new-bookings-button');
  const pageType = document.querySelector('#page-type');
  profileButton.dataset.active = 'true';
  newBookingsButton.dataset.active = 'false';
  pageType.innerText = 'My Bookings';
  show(dashboard);
  hide(newBooking);
};

function switchToNewBooking() {
  const profileButton = document.querySelector('#profile-button');
  const newBookingsButton = document.querySelector('#new-bookings-button');
  const pageType = document.querySelector('#page-type');
  profileButton.dataset.active = 'false';
  newBookingsButton.dataset.active = 'true';
  pageType.innerText = 'Book a Room';
  show(newBooking);
  hide(dashboard);
};

function resetSite() {
  show(loginPage);
  hide(actionPage);
};