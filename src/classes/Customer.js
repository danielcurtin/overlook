import Hotel from "./Hotel";

class Customer {
  constructor(customerObject, allRooms, allBookings) {
    this.id = customerObject.id;
    this.name = customerObject.name;
    this.hotel = new Hotel(allRooms, this.getBookings(allBookings));
    this.spent = 0;
  };

  getBookings(allBookings) {
    return allBookings.filter(booking => this.id === booking.userID);
  };

  trackSpending() {
    this.spent = (this.hotel.bookings.reduce((acc, booking) => {
      return acc += this.hotel.allRooms.find(room => booking.roomNumber === room.number).cost;
    }, 0) * 100) / 100;
  };
};

export default Customer;