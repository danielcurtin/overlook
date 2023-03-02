import { customers, bookings, rooms } from "./test-data";
import Hotel from "../src/classes/Hotel";
import Booking from "../src/classes/Booking";
import Room from "../src/classes/Room";
import chai from "chai";
const expect = chai.expect;

describe('Hotel', () => {
    let hotel, allRooms, allBookings;

    beforeEach(() => {
        allRooms = [new Room(rooms[0]), new Room(rooms[1])];
        allBookings = [new Booking(bookings[0]), new Booking(bookings[1])];
        hotel = new Hotel(allRooms, allBookings);
    });

    it('should be a function', () => {
        expect(Hotel).to.be.a('function');
    });

    it('should be an instance of Hotel', () => {
        expect(hotel).to.be.an.instanceOf(Hotel);
    });
});