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
}
