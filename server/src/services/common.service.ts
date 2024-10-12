import { log } from 'console';

export class CommonService {
  public tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  private keyValues<T>(dto: T): string[] {
    const keys: string = Object.keys(dto).toString();
    const values: string = Object.values(dto)
      .map((item) => `'${item}'`)
      .join(',');
    return [keys, values];
  }

  public getAll() {
    return `SELECT * FROM ${this.tableName}`;
  }

  public getShopByID(id: string) {
    return `SELECT * FROM ${this.tableName} WHERE id = ${id}`;
  }

  public create<T>(dto: T) {
    const [keys, values] = this.keyValues<T>(dto);
    console.log(`INSERT INTO ${this.tableName} (${keys}) VALUES (${values})`);
    return `INSERT INTO ${this.tableName} (${keys}) VALUES (${values})`;
  }

  public update<T>(dto: T, id: string) {
    const str = Object.entries(dto)
      .map((item) => [item[0], `'${item[1]}'`])
      .map((item) => item.join('='));
    return `UPDATE ${this.tableName} SET ${str} WHERE id = ${id}`;
  }

  public delete(id: string) {
    return `DELETE FROM ${this.tableName} WHERE id = ${id}`;
  }
}
