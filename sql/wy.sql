SELECT task_id from yw_jh where station_id='BJTJ' AND is_verify='1' and is_destroy='0' and receipts_class='GR' GROUP BY task_id having count(1) > 1;
-- 做过发运后，删除了，又要重新做发运，更改订单状态为发货确认
SELECT * from wm_op_order WHERE order_id='XSB000000220656';
update wm_op_order set wm_op_order.order_stat='finish_relay' WHERE order_id='XSB000000220656';