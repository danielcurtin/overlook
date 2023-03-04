class Hotel {
  constructor(allRooms, allBookings) {
    this.allRooms = allRooms;
    this.bookings = allBookings;
    this.filteredByDate = [];
    this.filteredByType = [];
    this.filteredBoth = [];
    this.selectedType;
    this.selectedDate;
  };

  getRoomOfBooking(bookingRoomNum) {
    return this.allRooms.find(room => room.number === bookingRoomNum);
  };

  selectType(filter) {
    this.selectedType = filter;
    
    !this.selectedDate ? this.filteredByType = this.bookings.filter(booking => {
      let room = this.allRooms.find(room => booking.roomNumber === room.number)
      return room ? room.type === filter ? true : false : false;
    }) : this.filterBoth();
  };

  selectDate(date) {
    this.selectedDate = date;

    !this.selectedType ? this.filteredByDate = this.bookings.filter(booking => booking.date === date) : this.filterBoth();
  };

  filterBoth() {
    this.filteredBoth = this.bookings.filter(booking => booking.date === this.selectedDate).filter(booking => this.allRooms.find(room => booking.roomNumber === room.number).type === this.selectedType);
  };

  resetDate() {
    this.selectedDate = undefined;
  };

  resetType() {
    this.selectedType = undefined;
  };
};

export default Hotel;