import { bookings } from './test-data';
import Booking from '../src/classes/Booking';
import chai from 'chai';
const expect = chai.expect;

describe('Booking', () => {
  let booking1, booking2;

  beforeEach(() => {
    booking1 = new Booking(bookings[0]);
    booking2 = new Booking(bookings[1]);
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(booking1).to.be.an.instanceOf(Booking);
  });

  it('should have an id, a userID, a date, and a room number', () => {
    expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz');
    expect(booking1.userID).to.equal(9);
    expect(booking1.date).to.equal('2022/04/22');
    expect(booking1.roomNumber).to.equal(15);
  });
});