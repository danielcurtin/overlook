import { bookings, customers, rooms } from './test-data';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import Room from '../src/classes/Room';
import Hotel from '../src/classes/Hotel';
import chai from 'chai';
const expect = chai.expect;

describe('Customer', () => {
  let customer1, customer2, allBookings, allRooms, hotel;

  beforeEach(() => {
    allRooms = rooms.map(room => new Room(room));
    allBookings = bookings.map(booking => new Booking(booking, allRooms));
    hotel = new Hotel(allRooms, allBookings);
    
    customer1 = new Customer(customers[0], hotel);
    customer2 = new Customer(customers[1], hotel);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
    expect(customer2).to.be.an.instanceOf(Customer);
  });

  it('should be able to have any valid pair of name and id', () => {
    expect(customer1.id).to.equal(1);
    expect(customer1.name).to.equal('Leatha Ullrich');

    expect(customer2.id).to.equal(2);
    expect(customer2.name).to.equal('Rocio Schuster');
  });

  it('should be able to save the customers bookings', () => {
    expect(customer1.allCustomerBookings).to.deep.equal([]);
    expect(customer2.allCustomerBookings).to.deep.equal([]);
  });

  it('should only be able to save the customer\'s corresponding bookings', () => {
    customer1.hotel.allBookings[0].userID = 1;

    customer1.resetBookings();

    expect(customer1.allCustomerBookings).to.deep.equal([allBookings[0]]);
  });

  it('should be able to track the amount a customer has spent if they have no bookings', () => {
    customer1.trackSpending();

    expect(customer1.spent).to.equal(0);

    customer2.trackSpending();

    expect(customer2.spent).to.equal(0);
  });

  it('should be able to track the amount a customer has spent if they have bookings', () => {
    customer1.hotel.allBookings[0].userID = 1;
    customer1.hotel.allBookings[0].roomNumber = 1;
    
    customer1.resetBookings();
    customer1.trackSpending();

    expect(customer1.spent).to.equal(358.4);

    customer2.hotel.allBookings[0].userID = 2;
    customer2.hotel.allBookings[0].roomNumber = 1;
    customer2.hotel.allBookings[1].userID = 2;
    customer2.hotel.allBookings[1].roomNumber = 2;
    
    customer2.resetBookings();
    customer2.trackSpending();

    expect(customer2.spent).to.equal(835.78);
  });

  it('should be able to select a filter', () => {
    customer1.selectType('suite');

    expect(customer1.selectedType).to.equal('suite');

    customer2.selectType('single room');

    expect(customer2.selectedType).to.equal('single room');
  });

  it('should be able to select a date', () => {
    customer1.selectDate('2022/02/11');

    expect(customer1.selectedDate).to.equal('2022/02/11');

    customer2.selectDate('2023/10/05');

    expect(customer2.selectedDate).to.equal('2023/10/05');
  });

  it('should be able to save new bookings', () => {
    customer1.selectDate('2023/06/12');
    customer1.saveBooking(allRooms[0]);

    expect(customer1.allCustomerBookings[0]).to.be.an.instanceOf(Booking);
  });
});