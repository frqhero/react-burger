import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateOrderMutation, useGetIngredientsQuery } from '@/api/burgerApi';
import {
  getSelectedIngredient,
  selectIngredient,
} from '@/services/selectedIngredient/slice';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import styles from './app.module.css';

export const App = () => {
  const ingredientsQuery = useGetIngredientsQuery();
  const [createOrder, orderMutation] = useCreateOrderMutation();

  const dispatch = useDispatch();

  const [activeModal, setActiveModal] = useState(null);
  const selectedIngredient = useSelector(getSelectedIngredient);

  function closeModal() {
    setActiveModal(null);
  }

  function openIngredientModal(ingredient) {
    dispatch(selectIngredient(ingredient));
    setActiveModal('ingredient');
  }

  function openOrderModal() {
    setActiveModal('order');
    const payload = {
      ingredients: [
        '692889f16bf770001bfeb4cc',
        '692889f16bf770001bfeb4ce',
        '692889f16bf770001bfeb4cc',
      ],
    };
    createOrder(payload);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {ingredientsQuery.isLoading ? (
          <Preloader />
        ) : ingredientsQuery.error ? (
          <p>Не удалось загрузить ингредиенты.</p>
        ) : (
          <>
            <BurgerIngredients
              ingredients={ingredientsQuery.data}
              onIngredientClick={openIngredientModal}
            />
            <BurgerConstructor
              ingredients={ingredientsQuery.data}
              onOrderClick={openOrderModal}
            />
          </>
        )}
      </main>
      {activeModal === 'ingredient' && selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
      {activeModal === 'order' && (
        <Modal onClose={closeModal}>
          <OrderDetails orderMutation={orderMutation} />
        </Modal>
      )}
    </div>
  );
};
