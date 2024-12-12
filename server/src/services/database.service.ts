import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {

  constructor(private config: ConfigService) {}

  pool = mysql.createPool({
    host: this.config.get('DB_HOST'),
    user: this.config.get('DB_USER'),
    port: this.config.get('DB_PORT'),
    password: this.config.get('DB_PASSWORD'),
    database: this.config.get('DB_DATABASE'),
  });

}
