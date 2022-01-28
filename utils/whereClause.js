class WhereClause {
  constructor(base, bigQ) {
    this.base = base;
    this.bigQ = bigQ;
  }
  search() {
    const searchword = this.bigQ.search
      ? {
          name: {
            $regex: this.bigQ.search,
            $options: "i",
          },
        }
      : {};

    this.base = this.base.find({ ...searchword });
    return this;
  }

  filter() {
    const copyQ = { ...this.bigQ };

    delete copyQ["search"];
    delete copyQ["page"];
    delete copyQ["limit"];

    //convert copyQ to a string
    let stringCopy = JSON.stringify(copyQ);

    stringCopy = stringCopy.replace(/\b(gte|lte|gt|lt)\b/g, (m) => `$${m}`);

    const jsonCopy = JSON.parse(stringCopy);

    this.base = this.base.finf(jsonCopy);
    return this;
  }

  pager(resultperPage) {
    let currentPage = 1;
    if (this.bigQ.page) {
      currentPage = this.bigQ.page;
    }
    const skipVal = resultperPage * (currentPage - 1);
    this.base = this.base.limit(resultperPage).skip(skipVal);
    return this;
  }
}

module.exports = WhereClause;
