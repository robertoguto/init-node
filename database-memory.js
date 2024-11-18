import { randomUUID } from 'node:crypto';

export class DatabaseMemory {
  #videos = new Map();

  list(querySearch) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0];
        const data = videoArray[1];

        return {id, ...data};
      })
      .filter(video => {
          if (querySearch) {
            return video.title.includes(querySearch);
          }

          return true
      });
  }

  create(video) {
    const videoID = randomUUID();
    this.#videos.set(videoID, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
