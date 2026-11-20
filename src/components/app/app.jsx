import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCreateOrderMutation, useGetIngredientsQuery } from '@/api/burgerApi';
import { clearConstructor } from '@/services/burgerConstructor/slice';
import {
  clearSelectedIngredient,
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
    dispatch(clearSelectedIngredient());
    if (activeModal === 'order') {
      dispatch(clearConstructor());
    }
    setActiveModal(null);
  }

  function openIngredientModal(ingredient) {
    dispatch(selectIngredient(ingredient));
    setActiveModal('ingredient');
  }

  function submitOrder(bun, ingredients) {
    setActiveModal('order');

    const ingredientIds = ingredients.map((ingredient) => ingredient._id);
    const payload = {
      ingredients: [bun._id, ...ingredientIds, bun._id],
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
            <BurgerIngredients onIngredientClick={openIngredientModal} />
            <BurgerConstructor submitOrder={submitOrder} />
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
