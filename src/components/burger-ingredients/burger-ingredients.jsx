import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';

import { useGetIngredientsQuery } from '@/api/burgerApi';

import IngredientCard from '../ingredient-card/ingredient-card';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ onIngredientClick }) => {
  const ingredientsQuery = useGetIngredientsQuery();
  const ingredients = ingredientsQuery.data;

  const buns = ingredients.filter((element) => {
    return element.type === 'bun';
  });

  const sauces = ingredients.filter((element) => {
    return element.type === 'sauce';
  });

  const content = ingredients.filter((element) => {
    return element.type === 'main';
  });

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('bun');

  const handleOnScroll = () => {
    const containerTop = containerRef.current.getBoundingClientRect().top;

    const bunTop = bunRef.current.getBoundingClientRect().top;
    const sauceTop = sauceRef.current.getBoundingClientRect().top;
    const mainTop = mainRef.current.getBoundingClientRect().top;

    const values = {
      bun: Math.abs(bunTop - containerTop),
      sauce: Math.abs(sauceTop - containerTop),
      main: Math.abs(mainTop - containerTop),
    };

    let closest = 'bun';

    if (values.sauce < values.bun && values.sauce < values.main) {
      closest = 'sauce';
    } else if (values.main < values.bun && values.main < values.sauce) {
      closest = 'main';
    }

    setActiveTab(closest);
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <li>
            <Tab
              value="bun"
              active={activeTab === 'bun'}
              onClick={() => {
                /* TODO */
              }}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value="sauce"
              active={activeTab === 'sauce'}
              onClick={() => {
                /* TODO */
              }}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value="main"
              active={activeTab === 'main'}
              onClick={() => {
                /* TODO */
              }}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      <div
        className={`${styles.ingredients_container} custom-scroll`}
        ref={containerRef}
        onScroll={handleOnScroll}
      >
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunRef}>
          Булки
        </h2>
        <ul className={`${styles.ingredients_list} pl-4`}>
          {buns.map((item) => (
            <li key={item._id}>
              <IngredientCard item={item} onClick={() => onIngredientClick(item)} />
            </li>
          ))}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6" ref={sauceRef}>
          Соусы
        </h2>
        <ul className={`${styles.ingredients_list} pl-4`}>
          {sauces.map((item) => (
            <li key={item._id}>
              <IngredientCard item={item} onClick={() => onIngredientClick(item)} />
            </li>
          ))}
        </ul>

        <h2 className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>
          Начинки
        </h2>
        <ul className={`${styles.ingredients_list} pl-4`}>
          {content.map((item) => (
            <li key={item._id}>
              <IngredientCard item={item} onClick={() => onIngredientClick(item)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
