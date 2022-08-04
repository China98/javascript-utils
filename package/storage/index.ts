

interface CreateStorageOption {
  prefix: string;
  storage: Storage;
  timeout?: number;
}

class WebStorage {
  private prefix: string;
  private storage: Storage;
  private timeout?: number = 0;  

  constructor(opt: CreateStorageOption) {
    this.prefix = opt.prefix
    this.storage = opt.storage
    this.timeout = opt.timeout;
  }

  getKey = (key: string): string => {
    return `${this.prefix.toLocaleUpperCase}_${key}`
  }

  set = (key: string, value: unknown, timeout?:number) => {
    const now = new Date().getTime();

    const data = {
       value,
       time: now,
       lost: timeout || this.timeout ? now + ((timeout || this.timeout || 0) * 1000) : null,  
    }

    this.storage.setItem(this.getKey(key), JSON.stringify(data))
  }

  get = (key: string) => {
    const val = this.storage.getItem(this.getKey(key))

    if(!val) return null;
    
    try {
      const data = JSON.parse(val);

      const { lost, value } = data; 
      
      if(!lost || lost >= new Date().getTime()) {
        return value
      }

      this.remove(this.getKey(key))


    } catch(e) {
        return null;
    }
  }

  remove = (key: string) => {
    this.storage.removeItem(key);
  }

  size = (): number => this.storage.length; 

  clear = () => {
    this.storage.clear()
  }
}

const createStorage = (option: CreateStorageOption) => {
  return new WebStorage(option);  
}