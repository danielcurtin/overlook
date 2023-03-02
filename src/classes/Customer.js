class Customer {
  constructor(customerObject, hotel) {
    this.id = customerObject.id;
    this.name = customerObject.name;
    this.hotel = hotel;
    this.allCustomerBookings = [];
    this.filteredByDate = [];
    this.filteredByType = [];
    this.filteredBoth = [];
    this.spent = 0;
    this.selectedDate;
    this.selectedType;
  };

  trackSpending() {
    this.spent = this.allCustomerBookings.reduce((acc, booking) => {
      return acc += this.hotel.allRooms.find(room => booking.roomNumber === room.number).cost;
    }, 0);
  };

  selectType(filter) {
    this.selectedType = filter;

    !this.selectedDate ? this.filteredByType = this.allCustomerBookings.filter(booking => this.hotel.allRooms.find(room => booking.roomNumber === room.number).type === filter) : this.filterBoth();
  };

  selectDate(date) {
    this.selectedDate = date;

    !this.selectedType ? this.filteredByDate = this.allCustomerBookings.filter(booking => booking.date === date) : this.filterBoth();
  };

  filterBoth() {
    this.filteredBoth = this.allCustomerBookings.filter(booking => booking.date === this.selectedDate).filter(booking => this.hotel.allRooms.find(room => booking.roomNumber === room.number).type === this.selectedType);
  };

  resetBookings() {
    this.allCustomerBookings = this.hotel.allBookings.filter(booking => this.id === booking.userID);
  };

  resetDate() {
    this.selectedDate = undefined;
  };

  resetType() {
    this.selectedType = undefined;
  };

  saveBooking(room) {
    this.allCustomerBookings.push(room.getNewBooking(this.id, this.selectedDate));
  };
};

export default Customer;