export default class ListVote {
  constructor() {}

  getWinner(list) {
    var vote = {};
    list.forEach((element) => {
      if (vote[element]) {
        vote[element]++;
      } else {
        vote[element] = 1;
      }
    });

    var result = Object.entries(vote).reduce(
      (prev, curr) => {
        return curr[1] > prev[1] ? curr : prev;
      },
      ["", 0]
    );

    return result[0];
  }

  getAllNonWinners(list) {
    var winner = this.getWinner(list);
    return list.filter((value) => {
      return value != winner;
    });
  }
}
