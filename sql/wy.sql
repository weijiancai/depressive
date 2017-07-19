SELECT task_id from yw_jh where station_id='BJTJ' AND is_verify='1' and is_destroy='0' and receipts_class='GR' GROUP BY task_id having count(1) > 1;
-- 做过发运后，删除了，又要重新做发运，更改订单状态为发货确认
SELECT * from wm_op_order WHERE order_id='XSB000000220656';
update wm_op_order set wm_op_order.order_stat='finish_relay' WHERE order_id='XSB000000220656';

-- 用退货任务数量更新退货库存数量
-- 1. 更新正品
begin tran
update wm_op_return_stock set amount=amount+wm_op_pickup.pickup_amount from wm_op_task, wm_op_pickup WHERE
  wm_op_task.task_id=wm_op_pickup.task_id and wm_op_task.station_id=wm_op_return_stock.station_id and wm_op_pickup.product_id=wm_op_return_stock.product_id
  and wm_op_task.station_id='BJTJ' and receipt_id='XTB000000012089' AND wm_op_return_stock.stock_type='1' and wm_op_pickup.pickup_amount>0
commit
-- 2. 更新返修
begin tran
update wm_op_return_stock set amount=amount+wm_op_pickup.h_amount3 from wm_op_task, wm_op_pickup WHERE
  wm_op_task.task_id=wm_op_pickup.task_id and wm_op_task.station_id=wm_op_return_stock.station_id and wm_op_pickup.product_id=wm_op_return_stock.product_id
  and wm_op_task.station_id='BJTJ' and receipt_id='XTB000000012089' AND wm_op_return_stock.stock_type='2' and wm_op_pickup.h_amount3>0
commit
-- 3. 更新残品
begin tran
update wm_op_return_stock set amount=amount+wm_op_pickup.h_bad_amount from wm_op_task, wm_op_pickup WHERE
  wm_op_task.task_id=wm_op_pickup.task_id and wm_op_task.station_id=wm_op_return_stock.station_id and wm_op_pickup.product_id=wm_op_return_stock.product_id
and wm_op_task.station_id='BJTJ' and receipt_id='XTB000000012089' AND wm_op_return_stock.stock_type='0' and h_bad_amount>0
commit