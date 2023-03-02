class Customer {
  constructor(customerObject, allRooms) {
    this.id = customerObject.id;
    this.name = customerObject.name;
    this.allRooms = allRooms;
    this.allCustomerBookings = [];
    this.filteredCustomerBookings = [];
    this.spent = 0;
    this.currentFilter;
    this.selectedDateBookings;
  };

  trackSpending() {
    this.spent = this.allCustomerBookings.reduce((acc, booking) => {
      return acc += this.allRooms.find(room => booking.roomNumber === room.number).cost;
    }, 0);
  };

  selectTypeFilter(filter) {
    this.allCustomerBookings = this.allCustomerBookings.filter(booking => `TBD`);
  };

  selectDate(date) {
    this.filteredCustomerBookings = this.allCustomerBookings.filter(booking => booking.date === date);
  };

  resetBookings(allBookings) {
    this.allCustomerBookings = allBookings.filter(booking => this.id === booking.userID);
  };

  saveBooking(room) {
    this.allCustomerBookings.push(room.getNewBooking(this.id, this.selectedDate, this.allRooms));
  };
};

export default Customer;