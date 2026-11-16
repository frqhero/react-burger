import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients, onOrderClick }) => {
  console.log(ingredients);

  const bun = ingredients.find((el) => el.type === 'bun');

  const burgerFillings = ingredients.filter((el) => el.type !== 'bun');

  const price = ingredients.reduce((accumulator, current) => {
    return accumulator + current.price;
  }, 0);

  console.log(price);

  return (
    <section className={`${styles.burger_constructor}`}>
      <div className={`${styles.burger_components} ml-4`}>
        <div className={`pl-8`}>
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            type="top"
          />
        </div>
        <ul className={`${styles.fillings} custom-scroll`}>
          {burgerFillings.map((ingr) => (
            <li key={ingr._id} className={styles.burger_filling}>
              <DragIcon type="primary" className={styles.drag_icon} />
              <ConstructorElement
                price={ingr.price}
                text={ingr.name}
                thumbnail={ingr.image}
              />
            </li>
          ))}
        </ul>
        <div className={`pl-8 custom-scroll`}>
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            type="bottom"
          />
        </div>
      </div>
      <div className={`${styles.info}`}>
        <p className="text text_type_digits-medium mr-2">{price}</p>
        <CurrencyIcon type="primary" className={styles.currency_icon} />
        <Button extraClass="ml-10" size="large" type="primary" onClick={onOrderClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
