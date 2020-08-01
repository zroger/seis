interface CachedRoom {
  roomId: string
  playerID: string
  credentials: string
  updated: number
}

export default class RoomHistory {
  constructor(readonly key: string) {};

  load(): CachedRoom[] {
    try {
      const item = localStorage.getItem(this.key)
      if (item === null) {
        return [];
      }
      return JSON.parse(item) as CachedRoom[];
    } catch (err) {
      return [];
    }
  }

  save(rooms: CachedRoom[]) {
    // Only store the 3 most recent rooms.
    rooms.sort((a, b) => a.updated - b.updated)
    localStorage.setItem(this.key, JSON.stringify(rooms[-3]));
  }

  find(id: string): CachedRoom | undefined {
    return this.load().find(room => room.roomId === id);
  }

  update(room: Omit<CachedRoom, 'updated'>) {
    const rooms = this.load().filter(r => r.roomId !== room.roomId);
    rooms.push({...room, updated: new Date().getTime()})
    this.save(rooms)
  }

  remove(id: string) {
    const rooms = this.load().filter(r => r.roomId !== id);
    this.save(rooms)
  }
}
