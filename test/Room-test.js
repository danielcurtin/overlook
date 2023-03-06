import { rooms } from './test-data';
import Room from '../src/classes/Room';
import chai from 'chai';
const expect = chai.expect;

describe('Room', () => {
  let room1, room2;

  beforeEach(() => {
    room1 = new Room(rooms[0]);
    room2 = new Room(rooms[1]);
  });

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', () => {
    expect(room1).to.be.an.instanceOf(Room);
    expect(room2).to.be.an.instanceOf(Room);
  });

  it('should have a number, a type, and a cost', () => {
    expect(room1.number).to.equal(1);
    expect(room1.type).to.equal('residential suite');
    expect(room1.cost).to.equal(358.4);

    expect(room2.number).to.equal(2);
    expect(room2.type).to.equal('suite');
    expect(room2.cost).to.equal(477.38);
  });
});