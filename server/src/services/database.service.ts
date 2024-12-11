import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  // pool = mysql.createPool({
  //   host: 'localhost',
  //   user: 'root',
  //   port: 3306,
  //   password: 'unypyrebe',
  //   database: 'storeautoparts',
  // });
  pool = mysql.createPool({
    host: 'sql.freedb.tech',
    user: 'freedb_grush1k',
    port: 3306,
    password: 'sCRdc9@r?Y5%#nc',
    database: 'freedb_storeautoparts',
  });

}
