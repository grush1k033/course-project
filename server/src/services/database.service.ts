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

  // pool = mysql.createPool({
  //   host: 'sql7.freesqldatabase.com',
  //   user: 'sql7746026',
  //   port: 3306,
  //   password: 'mhcSJCTcwA',
  //   database: 'sql7746026',
  // });
}
