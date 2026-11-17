import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { useGetIngredientsQuery } from '@/api/ingredientsApi';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { order } from '../../utils/order_data';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import styles from './app.module.css';

export const App = () => {
  const {
    isLoading: loading,
    error: apiError,
    data: apiIngredients,
  } = useGetIngredientsQuery();

  const [activeModal, setActiveModal] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  function closeModal() {
    setActiveModal(null);
  }

  function openIngredientModal(ingredient) {
    setSelectedIngredient(ingredient);
    setActiveModal('ingredient');
  }

  function openOrderModal() {
    setActiveModal('order');
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {loading ? (
          <Preloader />
        ) : apiError ? (
          <p>Не удалось загрузить ингредиенты.</p>
        ) : (
          <>
            <BurgerIngredients
              ingredients={apiIngredients}
              onIngredientClick={openIngredientModal}
            />
            <BurgerConstructor
              ingredients={apiIngredients}
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
          <OrderDetails order={order} />
        </Modal>
      )}
    </div>
  );
};
