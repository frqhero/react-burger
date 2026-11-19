import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { reorderIngredients } from '@/services/burgerConstructor/slice';

import styles from './constructor-filling.module.css';

export const ConstructorFilling = ({ ingredient, onRemove }) => {
  const { uniqueId, price, name, image } = ingredient;

  const [{ isDragging }, dragRef] = useDrag({
    type: 'filling',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: 'filling',
    hover: (item) =>
      dispatch(reorderIngredients({ draggedId: item.uniqueId, targetId: uniqueId })),
  });

  return (
    <li
      className={`${styles.burger_filling} ${isDragging ? styles.invisible : ''}`}
      ref={(node) => dropTarget(dragRef(node))}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        price={price}
        text={name}
        thumbnail={image}
        handleClose={onRemove}
      />
    </li>
  );
};
