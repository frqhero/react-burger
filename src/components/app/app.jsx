import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { API_URL } from '@/utils/constants';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { order } from '../../utils/order_data';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import styles from './app.module.css';

export const App = () => {
  const [apiIngredients, setApiIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [activeModal, setActiveModal] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  console.log(apiIngredients);

  const apiDomain = API_URL;
  const urlPath = '/api/ingredients';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiDomain + urlPath);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setApiIngredients(data.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setApiError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
