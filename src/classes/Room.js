class Room {
  constructor(roomObject) {
    this.number = roomObject.number;
    this.type = roomObject.roomType;
    this.bed = roomObject.bedSize;
    this.numBeds = roomObject.numBeds;
    this.cost = roomObject.costPerNight;
  };
};

export default Room;