import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'unypyrebe',
    database: 'storeautoparts',
  });

  // pool2 = mysql.createPool({
  //   host: '192.168.100.56',
  //   user: 'root',
  //   port: 3306,
  //   password: 'unypyrebe',
  //   database: 'nameofdb',
  // });
}
