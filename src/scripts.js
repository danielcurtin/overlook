import './css/styles.css';
import './images/bg-image.jpg';
import getData from './api-calls';

let allCustomers, singleCustomer, allRooms, allBookings;

Promise.all([getData('customers'), getData('customers/22'), getData('rooms'), getData('bookings')])
.then(values => {
    allCustomers = values[0].customers;
    singleCustomer = values[1];
    allRooms = values[2].rooms;
    allBookings = values[3].bookings;
    console.log(allCustomers, singleCustomer, allRooms, allBookings);
});