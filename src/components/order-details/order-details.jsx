import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

export default function OrderDetails({ order }) {
  return (
    <div className={`${styles.order_info} mt-20 mb-15`}>
      <p className="text text_type_digits-large">{order.number}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`${styles.check_mark_wrapper} mt-15 mb-15`}>
        <CheckMarkIcon type="primary" className={styles.check_mark_icon} />
      </div>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
