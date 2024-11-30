import { Injectable } from '@nestjs/common';
import { OrderDto } from 'src/Interfaces/interfaces';
import { CommonService } from 'src/services/common.service';
import { DatabaseService } from 'src/services/database.service';

@Injectable()
export class OrderService {

    constructor(private db: DatabaseService, private cm: CommonService) {}

    async createOrder(dto: OrderDto) {
        const order = await this.db.pool.query(this.cm.create(dto))
         
        return {id: order[0]["insertId"]};
    }

    async getOrders(userId: string) {
        return (await this.db.pool.query(`Select * from orders where UserId = ${userId}`))[0]
    }

    async updateOrderStatus(id: string, dto: {isConfirmed: boolean, UserId: string}) {
        await this.db.pool.query(`UPDATE orders SET isConfirmed = ${dto.isConfirmed ? 1 : 0} WHERE id = ${id} and UserId = ${dto.UserId}`);
        return (await this.db.pool.query(this.cm.getByID(id)))[0][0]
    }
}
