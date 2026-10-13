import { Tab } from '@krgaa/react-developer-burger-ui-components';

import IngredientCard from '../ingredient-card/ingredient-card';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const buns = ingredients.filter((element) => {
    return element.type === 'bun';
  });

  const sauces = ingredients.filter((element) => {
    return element.type === 'sauce';
  });

  const content = ingredients.filter((element) => {
    return element.type === 'main';
  });

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={`${styles.ingredients_container} custom-scroll`}>
        <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
        <ul className={`${styles.ingredients_list} pl-4`}>
          {buns.map((item) => (
            <li key={item._id}>
              <IngredientCard price={item.price} name={item.name} image={item.image} />
            </li>
          ))}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={`${styles.ingredients_list} pl-4`}>
          {sauces.map((item) => (
            <li key={item._id}>
              <IngredientCard price={item.price} name={item.name} image={item.image} />
            </li>
          ))}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={`${styles.ingredients_list} pl-4`}>
          {content.map((item) => (
            <li key={item._id}>
              <IngredientCard price={item.price} name={item.name} image={item.image} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
