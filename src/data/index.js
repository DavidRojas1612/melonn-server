const NodeCache =  require('node-cache');

const melonnCache = new NodeCache();

class melonnDBcache {
  
  constructor(key) {
    this.key = key;
    if(!this.getValues()) {
      melonnCache.set(this.key, [])
    }
  }

  getValues() {
    return melonnCache.get(this.key);
  }

  save(value) {
    const prevState = this.getValues();
    melonnCache.set(this.key, [...prevState, value]);
  }

  getById(id) {
    const prevState = this.getValues();
    return prevState.find(order => order.id === id);
  }
}

module.exports = melonnDBcache;