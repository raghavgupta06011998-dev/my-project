export function createClock() {
  return {
    time: 0,
    tick() {
      this.time += 0.01
      return this.time
    }
  }
}
