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

// Elements
const loginPage = document.querySelector('#login-page');
const loginButton = document.querySelector('#submit-login');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const badLogin = document.querySelector('#bad-login');

const actionPage = document.querySelector('#action-page');
const sidebar = document.querySelector('#side-nav');
const calendarInput = document.querySelector('#calendar');
const navBanner = document.querySelector('#nav-banner');
const profileButton = document.querySelector('#profile-button');
const newBookingsButton = document.querySelector('#new-bookings-button');
const pageType = document.querySelector('#page-type');
const logOutButton = document.querySelector('#log-out');

const customerBookingsDisplay = document.querySelector('#customer-bookings');
const dashboard = document.querySelector('#dashboard-container');

const newBookingsDisplay = document.querySelector('#rooms-container');
const newBookingHeader = document.querySelector('#rooms-header-date');
const roomsContainer = document.querySelector('#new-bookings');

// APIs
import { getData, postBooking } from './api-calls';

let allRooms, allBookings, hotel, customer, dashPage;

Promise.all([getData('customers'), getData('rooms'), getData('bookings')])
.then(values => {
  allRooms = values[1].rooms.map(room => new Room(room));
  allBookings = values[2].bookings.map(booking => new Booking(booking));
  hotel = new Hotel(allRooms, allBookings);
})
.catch(() => {
  badLogin.classList.remove('hidden');
  badLogin.innerText = 'Server Error. Please refresh and try again.';
});


// Event Listeners
loginButton.addEventListener('click', getLogin);
logOutButton.addEventListener('click', resetSite);
navBanner.addEventListener('click', switchPage);
sidebar.addEventListener('click', event => {
  if (event.target.type === 'checkbox') {
    dashPage ? toggleProfileFilter(event) : toggleNewBookingFilter(event);
  };
});
calendarInput.addEventListener('keydown', event => {
  if (event.code === 'Enter') {
    isValidDate(calendarInput.value) ? filterByDate(calendarInput.value) : warnInvalidDate()
  };
});
roomsContainer.addEventListener('click', event => {
  if (event.target.classList.contains('bookRoomBtn')) {
    if (!hotel.selectedDate) {
      newBookingHeader.innerHTML = 'Error Booking- No date selected. Please select a date.';
      calendarInput.focus();
      return;
    };
    saveBooking(event);
  };
});


// Functions
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
    badLogin.classList.remove('hidden');
    return;
  } else {
    Promise.all([getData(`customers/${id}`)])
    .then(value => {
      customer = new Customer(value[0], allRooms, allBookings);
      updateCustomerInfo();
    })
    .catch((err) => customerBookingsDisplay.innerHTML = `<h2 class="apology">${err}. Please refresh and try again</h2>`);

    badLogin.classList.add('hidden');
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

  customer.hotel.reset('selectedDate');
  customer.hotel.reset('selectedType');
  customer.trackSpending();
  
  updateCustomerDisplay('bookings');
};

function updateCustomerDisplay(updateWith) {
  const amountSpent = document.querySelector('#amount-spent');
  
  amountSpent.innerText = `$${customer.spent}`;
  customerBookingsDisplay.innerHTML = '';

  if (customer.hotel.selectedDate && customer.hotel.selectedType) {
    updateWith = 'filteredBoth';
  };

  if (!customer.hotel[updateWith].length) {
    customerBookingsDisplay.innerHTML = '<h2 class="apology">WE ARE SO SORRY! NO RESULTS</h2>';
  };

  customer.hotel[updateWith].forEach(booking => {
    let bookingRoom = customer.hotel.getRoomOfBooking(booking.roomNumber);

    customerBookingsDisplay.innerHTML += 
    `
    <article class="room" tabindex="0">
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

function updateNewBookingDisplay(updateWith) {

  newBookingHeader.innerText = hotel.selectedDate ? `Showing Rooms Available for: ${hotel.selectedDate}` : 'Please Select A Date';
  roomsContainer.innerHTML = '';

  if (hotel.selectedDate && hotel.selectedType) {
    updateWith = 'filteredBoth';
  };

  if (!hotel[updateWith].length) {
    roomsContainer.innerHTML = '<h2 class="apology">WE ARE SO SORRY! NO RESULTS</h2>';
  };

  hotel[updateWith].forEach(room => {
    roomsContainer.innerHTML +=
    `
    <article class="room" tabindex="0">
      <img src="./images/${room.type}.jpg" alt="Picture of ${room.type}">
      <div class="roomBottom">
        <header class="roomInfo">
          <h2 class="roomType">${room.type}</h2>
          <h3 class="sizeAndCount">${room.numBeds} ${room.bed}</h3>
        </header>
        <button class="bookRoomBtn" tabindex="0" data-room-num="${room.number}">Book</button>
      </div>
    </article>
    `;
  });
};

function switchPage(event) {
  const filterRadios = document.querySelectorAll('.filter');

  calendarInput.value = '';
  filterRadios.forEach(radio => radio.checked = false);
  customer.hotel.reset('selectedDate');
  customer.hotel.reset('selectedType');
  hotel.reset('selectedDate');
  hotel.reset('selectedType');

  if (event.target.dataset.active === 'false') {
    event.target.dataset.value === 'new-bookings' ? switchToNewBooking() : switchToProfile();
  };
};

function switchToNewBooking() {
  dashPage = false;
  profileButton.dataset.active = 'false';
  newBookingsButton.dataset.active = 'true';
  pageType.innerText = 'Book a Room';

  updateNewBookingDisplay('allRooms');
  show(newBookingsDisplay);
  hide(dashboard);
};

function switchToProfile() {
  dashPage = true;
  profileButton.dataset.active = 'true';
  newBookingsButton.dataset.active = 'false';
  pageType.innerText = 'My Bookings';

  updateCustomerInfo()
  show(dashboard);
  hide(newBookingsDisplay);
};

function toggleProfileFilter(event) {
  if (customer.hotel.selectedType === event.target.dataset.filter) {
    event.target.checked = false;
    customer.hotel.reset('selectedType');
    customer.hotel.selectedDate ? filterByDate(customer.hotel.selectedDate) : updateCustomerDisplay('bookings');
  } else {
    filterByType(event.target.dataset.filter);
    resetOtherBoxes(event.target.id);
  };
};

function toggleNewBookingFilter(event) {
  if (hotel.selectedType === event.target.dataset.filter) {
    event.target.checked = false;
    hotel.reset('selectedType');
    hotel.selectedDate ? filterByDate(hotel.selectedDate) : updateNewBookingDisplay('allRooms');
  } else {
    filterByType(event.target.dataset.filter);
    resetOtherBoxes(event.target.id);
  };
};

function filterByDate(date) {
  if (!date) {
    if (dashPage) {
      customer.hotel.reset('selectedDate');
      customer.hotel.selectedType ? filterByType(customer.hotel.selectedType) : updateCustomerDisplay('bookings');
    } else {
      hotel.reset('selectedDate');
      hotel.selectedType ? filterByType(hotel.selectedType) : updateNewBookingDisplay('allRooms');
    };
    return;
  };
  
  if ((date[0] + date[1]) === '20') {
    if (dashPage) {
      customer.hotel.selectDate(date);
      updateCustomerDisplay('filteredByDate');
      return;
    } else {
      hotel.roomFilterDate(date);
      updateNewBookingDisplay('filteredByDate');
      return;
    };
  };

  const splitDate = date.split('/');
  const reformattedDate = `${splitDate[2]}/${splitDate[0]}/${splitDate[1]}`;

  if (dashPage) {
    customer.hotel.selectDate(reformattedDate);
    updateCustomerDisplay('filteredByDate');
  } else {
    hotel.roomFilterDate(reformattedDate);
    updateNewBookingDisplay('filteredByDate');
  };
};

function filterByType(filter) {
  if (dashPage) {
    customer.hotel.selectType(filter);
    updateCustomerDisplay('filteredByType');
  } else {
    hotel.roomFilterType(filter);
    updateNewBookingDisplay('filteredByType');
  };
};

function isValidDate(date) {
  let newDate = date.split('/');
  if (newDate[0].length !== 2 || newDate[1].length !== 2 || newDate[2].length !== 4) {
    return false;
  };

  if (parseInt(newDate[0]) < 1 || parseInt(newDate[0]) > 12) {
    return false;
  } else if (parseInt(newDate[1]) < 1 || parseInt(newDate[1]) > 31) {
    return false;
  } else if (parseInt(newDate[2]) < 2000 || parseInt(newDate[2]) > 2999) {
    return false;
  } else {
    return true;
  };
};

function warnInvalidDate() {
  calendarInput.value = '';

  !dashPage ? newBookingHeader.innerText = 'Invalid Date, Please try again.' : null;
};

function resetSite() {
  switchPage();
  show(loginPage);
  hide(actionPage);
};

function saveBooking(event) {
  const selectedRoom = allRooms.find(room => parseInt(event.target.dataset.roomNum) === room.number);

  Promise.all([postBooking(customer.id, hotel.selectedDate, selectedRoom.number)])
  .then(value => {
    customer.hotel.saveBooking(value[0].newBooking);
    hotel.saveBooking(value[0].newBooking);
    replaceButton(event);
  })
  .catch((err) => {
    newBookingHeader.style.color = 'red';
    newBookingHeader.innerText = `#{err}. Please Try Again Later.`;
  });
};

function resetOtherBoxes(id) {
  const filterBoxes = document.querySelectorAll('.filter');

  filterBoxes.forEach(filter => {
    if (filter.id !== id) {
      filter.checked = false;
    };
  });
};

function replaceButton(event) {
  event.target.classList.remove('bookRoomBtn');
  event.target.classList.add('afterBookingStyling');
  event.target.innerText = 'Booked!';
};