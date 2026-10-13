import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './ingredient-card.module.css';

function IngredientCard({ name, price, image }) {
  return (
    <div className={styles.card}>
      <Counter count={1} size="default" />
      <img src={image} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles['tall-text']} text text_type_main-default`}>{name}</p>
    </div>
  );
}

export default IngredientCard;
