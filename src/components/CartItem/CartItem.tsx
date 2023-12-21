import styles from './CartItem.module.css';
import { cartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { MouseEvent } from 'react';

function CartItem({ id, name, image, price, count }: cartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const increase = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(id));
	};
	const decrease = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(id));
	};
	const remove = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(id));
	};

	return (
		<div className={styles['item']}>
			<div
				className={styles['image']}
				style={{ backgroundImage: `url('${image}')` }}
			></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{name}</div>
				<div className={styles['price']}>
					{price}&nbsp;
					<span className={styles['currency']}>₽</span>
				</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['button']} onClick={decrease}>
					<img src="/cart-button-icon.svg" alt="Уменьшить количество" />
				</button>
				<div>{count}</div>
				<button className={styles['button']} onClick={increase}>
					<img src="/cart-button-icon.svg" alt="Увеличить количество" />
				</button>
				<button className={styles['remove']} onClick={remove}>
					<img src="/cart-button-icon.svg" alt="Удалить" />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
