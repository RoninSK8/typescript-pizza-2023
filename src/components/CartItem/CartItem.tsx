import styles from './CartItem.module.css';
import { cartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

function CartItem({ id, name, image, price, count }: cartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const increase = () => {
		dispatch(cartActions.add(id));
	};
	const decrease = () => {
		dispatch(cartActions.remove(id));
	};
	const remove = () => {
		dispatch(cartActions.delete(id));
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
				<button className={styles['minus']} onClick={decrease}>
					<img src="/minus-icon.svg" alt="Уменьшить количество" />
				</button>
				<div className={styles['number']}>{count}</div>
				<button className={styles['plus']} onClick={increase}>
					<img src="/plus-icon.svg" alt="Увеличить количество" />
				</button>
				<button className={styles['remove']} onClick={remove}>
					<img src="/delete-icon.svg" alt="Удалить" />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
