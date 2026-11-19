import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import {
  addIngredient,
  getBun,
  getIngredients,
  removeIngredient,
} from '@/services/burgerConstructor/slice';

import { ConstructorFilling } from '../constructor-filling/constructor-filling';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ onOrderClick }) => {
  const dispatch = useDispatch();

  const [{ isOver, draggedItem }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item) => dispatch(addIngredient(item)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      draggedItem: monitor.getItem(),
    }),
  });

  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);

  const price = [...(bun === null ? [] : [bun, bun]), ...ingredients].reduce(
    (accumulator, current) => {
      return accumulator + current.price;
    },
    0
  );

  return (
    <section className={`${styles.burger_constructor}`}>
      <div className={`${styles.burger_components} ml-4`} ref={dropTarget}>
        {bun === null ? (
          <div
            className={`${styles.placeholder} ${styles.top_bun} ml-8 ${isOver && draggedItem?.type === 'bun' ? styles.highlight : ''}`}
          >
            <p className="text text_type_main-default">Выберите булки</p>
          </div>
        ) : (
          <div className={`pl-8`}>
            <ConstructorElement
              isLocked
              price={bun.price}
              text={`${bun.name} (верх)`}
              thumbnail={bun.image}
              type="top"
            />
          </div>
        )}

        <ul className={`${styles.fillings} custom-scroll`}>
          {ingredients.length === 0 ? (
            <li>
              <div
                className={`${styles.placeholder} ${styles.empty_filling} ml-8 ${isOver && draggedItem?.type !== 'bun' ? styles.highlight : ''}`}
              >
                <p className="text text_type_main-default">Выберите начинку</p>
              </div>
            </li>
          ) : (
            ingredients.map((ingredient) => (
              <ConstructorFilling
                key={ingredient.uniqueId}
                ingredient={ingredient}
                onRemove={() => dispatch(removeIngredient(ingredient.uniqueId))}
              />
            ))
          )}
        </ul>

        {bun === null ? (
          <div
            className={`${styles.placeholder} ${styles.bottom_bun} ml-8 ${isOver && draggedItem?.type === 'bun' ? styles.highlight : ''}`}
          >
            <p className="text text_type_main-default">Выберите булки</p>
          </div>
        ) : (
          <div className={'pl-8'}>
            <ConstructorElement
              isLocked
              price={bun.price}
              text={`${bun.name} (низ)`}
              thumbnail={bun.image}
              type="bottom"
            />
          </div>
        )}
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
