// style
import './css/styles.css';

// images
import './images/bg-image.jpg';
import './images/residential suite.jpg';
import './images/suite.jpg';
import './images/junior suite.jpg';
import './images/single room.jpg';

// api
import { getData } from './api-calls';

let allCustomers, singleCustomer, allRooms, allBookings;

Promise.all([getData('customers'), getData('customers/22'), getData('rooms'), getData('bookings')])
.then(values => {
    allCustomers = values[0].customers;
    singleCustomer = values[1];
    allRooms = values[2].rooms;
    allBookings = values[3].bookings;
    console.log(allCustomers, singleCustomer, allRooms, allBookings);
});

// Calendar
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

new AirDatepicker('#calendar', {
    locale: localeEn
});