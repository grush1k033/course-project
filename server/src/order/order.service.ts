import { Injectable } from '@nestjs/common';
import { OrderAutopartDto, OrderDto } from 'src/Interfaces/interfaces';
import { CommonService } from 'src/services/common.service';
import { DatabaseService } from 'src/services/database.service';

@Injectable()
export class OrderService {

    constructor(private db: DatabaseService, private cm: CommonService) { }

    async createOrder(dto: OrderDto) {
        const order = await this.db.pool.query(this.cm.create(dto))

        return { id: order[0]["insertId"] };
    }

    async getOrders(userId: string) {
        return (await this.db.pool.query(`Select * from orders where UserId = ${userId}`))[0]
    }

    async updateOrderStatus(id: string) {
        await this.db.pool.query(`UPDATE orders SET isConfirmed = 1 WHERE id = ${id}`);
        return (await this.db.pool.query(this.cm.getByID(id)))[0][0]
    }

    async createOrderAutoparts(dto: OrderAutopartDto) {
        const cm = new CommonService('autoparts_orders');
        const res: { OrdersId: number, AutopartsID: number, count: number }[] = dto.Autoparts?.map((item) => ({ OrdersId: dto.OrdersId, AutopartsID: item.id, count: item.count }));

        res.forEach(async item => {
            await this.db.pool.query(cm.create(item));
        })

        return res;
    }

    async getOrdersAutoparts(id: string) {
        return (await this.db.pool.query(`
            SELECT b.OrdersId, 
                b.AutopartsId, 
                b.count,
                a.name, 
                a.description,  
                a.price, 
                a.image,
                a.discount,
                a.amount,
                a.favourites
            FROM autoparts_orders b 
            JOIN autoparts a ON b.AutopartsId = a.id 
            WHERE b.OrdersId = ${id};    
        `))[0];
    }

    async exportInCsv(id: string) {
        const jsonData: any[] = (await this.db.pool.query(`
            select
                a.OrdersId,
                a.count,
                c.name,
                c.description,
                c.price,
                c.discount,
                b.timeOfDelivery,
                b.total
            From orders b
                     left join
                 autoparts_orders a on b.id = a.OrdersId
                     left join
                 autoparts c on a.AutopartsId = c.id
            where b.UserId = ${id} and b.isConfirmed = 1;
        `))[0] as any[]
        return jsonData;
    }

    async deleteOrder(id: string) {
        await this.db.pool.query(`DELETE FROM autoparts_orders WHERE OrdersId = ${id}`);
        return (await this.db.pool.query(this.cm.delete(id)));
    }
}
