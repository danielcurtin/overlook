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
    
    customer1 = new Customer(customers[0], allRooms, allBookings);
    customer2 = new Customer(customers[1], allRooms, allBookings);
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
    expect(customer1.hotel.bookings).to.deep.equal([]);
    expect(customer2.hotel.bookings).to.deep.equal([]);
  });

  it('should only be able to save the customer\'s corresponding bookings', () => {
    allBookings[0].userID = 1;

    customer1 = new Customer(customers[0], allRooms, allBookings);

    expect(customer1.hotel.bookings).to.deep.equal([allBookings[0]]);
  });

  it('should be able to track the amount a customer has spent if they have no bookings', () => {
    customer1.trackSpending();

    expect(customer1.spent).to.equal(0);

    customer2.trackSpending();

    expect(customer2.spent).to.equal(0);
  });

  it('should be able to track the amount a customer has spent if they have bookings', () => {
    allBookings[0].userID = 1;
    allBookings[0].roomNumber = 1;
    
    customer1 = new Customer(customers[0], allRooms, allBookings);
    customer1.trackSpending();

    expect(customer1.spent).to.equal(358.4);

    allBookings[0].userID = 2;
    allBookings[0].roomNumber = 1;
    allBookings[1].userID = 2;
    allBookings[1].roomNumber = 2;

    customer2 = new Customer(customers[1], allRooms, allBookings);
    
    customer2.trackSpending();

    expect(customer2.spent).to.equal(835.78);
  });
});