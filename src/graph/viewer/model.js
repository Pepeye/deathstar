export default class Viewer {
  constructor (data) {
    this.id = data.id
  }

  static async load (userid) {
    const data = {
      id: userid
    }

    return new Viewer(data)
  }
}
