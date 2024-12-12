import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {

  constructor(private config: ConfigService) {}

  pool = mysql.createPool({
    host: this.config.get('HOST'),
    user: this.config.get('USER'),
    port: this.config.get('PORT'),
    password: this.config.get('PASSWORD'),
    database: this.config.get('DATABASE'),
  });

}
