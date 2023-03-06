import { customers, bookings, rooms } from "./test-data";
import Hotel from "../src/classes/Hotel";
import Booking from "../src/classes/Booking";
import Room from "../src/classes/Room";
import chai from "chai";
const expect = chai.expect;

describe('Hotel', () => {
  let hotel, allRooms, allBookings;

  beforeEach(() => {
    allRooms = rooms.map(room => new Room(room));
    allBookings = bookings.map(booking => new Booking(booking));
    hotel = new Hotel(allRooms, allBookings);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should be able to hold rooms', () => {
    expect(hotel.allRooms).to.be.an('array');
    expect(hotel.allRooms.length).to.equal(2);
    expect(hotel.allRooms[0]).to.be.an.instanceOf(Room);
  });

  it('should be able to hold bookings', () => {
    expect(hotel.bookings).to.be.an('array');
    expect(hotel.bookings.length).to.equal(2);
    expect(hotel.bookings[0]).to.be.an.instanceOf(Booking);
  });

  it('should be able to select a type to filter by', () => {
    allBookings[0].roomNumber = 1;

    hotel = new Hotel(allRooms, allBookings);

    expect(hotel.selectedType).to.equal(undefined);

    hotel.selectType('residential suite');

    expect(hotel.selectedType).to.equal('residential suite');
    expect(hotel.filteredByType).to.deep.equal([allBookings[0]]);
  });

  it('should be able to select a date to filter by', () => {
    allBookings[0].date = '2022/02/11';

    hotel = new Hotel(allRooms, allBookings);
    
    expect(hotel.selectedDate).to.equal(undefined);
    
    hotel.selectDate('2022/02/11');

    expect(hotel.selectedDate).to.equal('2022/02/11');
    expect(hotel.filteredByDate).to.deep.equal([allBookings[0]]);
  });

  it('should be able to filter by both date and type', () => {
    allBookings[0].roomNumber = 1;
    allBookings[0].date = '2022/02/11';

    hotel.selectType('residential suite');
    hotel.selectDate('2022/02/11');

    expect(hotel.filteredBoth).to.be.an('array');
    expect(hotel.filteredBoth.length).to.equal(1);
    expect(hotel.filteredBoth[0]).to.deep.equal(allBookings[0]);
  });

  it('should be able to reset the date and type', () => {
    hotel.selectedType = 'suite';
    hotel.selectedDate = '2023/01/01';

    hotel.resetDate();
    hotel.resetType();

    expect(hotel.selectedDate).to.equal(undefined);
    expect(hotel.selectedType).to.equal(undefined);
  });

  it('should be able to save new bookings', () => {
    hotel.selectDate('2023/06/12');
    hotel.saveBooking(allRooms[0]);

    expect(hotel.bookings[0]).to.be.an.instanceOf(Booking);
  });
});