class Customer {
  constructor(customerObject, allRooms, allBookings) {
    this.id = customerObject.id;
    this.name = customerObject.name;
    this.allRooms = allRooms;
    this.bookings = allBookings.filter(booking => this.id === booking.userID);
    this.spent = 0;
    this.currentFilter;
    this.selectedDate;
  };

  trackSpending() {
    this.spent = this.bookings.reduce((acc, booking) => {
      return acc += this.allRooms.find(room => booking.roomNumber === room.number).cost;
    }, 0);
  };

  selectTypeFilter(filter) {
    this.currentFilter = filter;
  };

  selectDate(date) {
    this.selectedDate = date;
  };

  saveBooking(room) {
    this.bookings.push(room.getNewBooking(this.id, this.selectedDate));
  };
};

export default Customer;