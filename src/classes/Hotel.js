import Booking from "./Booking";

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
    
    !this.selectedDate ? this.filteredByType = this.bookings.filter(booking => this.allRooms.find(room => booking.roomNumber === room.number).type === filter) : this.filterBoth();
  };

  selectDate(date) {
    this.selectedDate = date;

    !this.selectedType ? this.filteredByDate = this.bookings.filter(booking => booking.date === date) : this.filterBoth();
  };

  filterBoth() {
    this.filteredBoth = this.bookings.filter(booking => booking.date === this.selectedDate)
    .filter(booking => this.allRooms.find(room => booking.roomNumber === room.number).type === this.selectedType);
  };

  roomFilterType(type) {
    this.selectedType = type;

    !this.selectedDate ? this.filteredByType = this.allRooms.filter(room => room.type === type) : this.roomFilterBoth();
  };

  roomFilterDate(date) {
    this.selectedDate = date;

    !this.selectedType ? this.filteredByDate = this.allRooms.filter(room => !this.bookings.filter(booking => booking.date === date).some(booking => booking.roomNumber === room.number)) : this.roomFilterBoth();
  };

  roomFilterBoth() {
    this.filteredBoth = this.allRooms.filter(room => room.type === this.selectedType).filter(room => !this.bookings.filter(booking => booking.date === this.selectedDate).some(booking => booking.roomNumber === room.number));
  };

  reset(toReset) {
    this[toReset] = undefined;
  };

  saveBooking(newBooking) {
    this.bookings.unshift(new Booking(newBooking));
  };
};

export default Hotel;