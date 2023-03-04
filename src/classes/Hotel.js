class Hotel {
  constructor(allRooms, allBookings) {
    this.allRooms = allRooms;
    this.allBookings = allBookings;
    this.filteredByDate = [];
    this.filteredByType = [];
    this.filteredBoth = [];
  };

  filterBookingsByType(filter) {
    !this.filteredBookingsDate.length ? 
    this.filteredBookingsType = this.allBookings.filter(booking => this.allRooms.find(room => booking.roomNumber === room.number) === filter) : 
    this.filteredBoth = this.filteredBookingsDate.filter(booking => this.allRooms.find(room => booking.roomNumber === room.number) === filter);
  };

  selectDateBookings(date) {
    !this.filteredBookingsType.length ?
    this.filteredBookingsDate = this.allBookings.filter(booking => booking.date === date) :
    this.filteredBoth = this.filteredBookingsType.filter(booking => booking.date === date);
  };

  getRoomOfBooking(bookingRoomNum) {
    return this.allRooms.find(room => room.number === bookingRoomNum);
  };
};

export default Hotel;