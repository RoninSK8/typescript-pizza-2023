import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { MouseEvent } from 'react';

function ProductCard({
	id,
	price,
	rating,
	name,
	description,
	image,
}: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>();

	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(id));
	};

	return (
		<Link to={`/product/${id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div
					className={styles['head']}
					style={{ backgroundImage: `url('${image}')` }}
				>
					<div className={styles['price']}>
						{price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<div className={styles['rating']}>
						{rating}&nbsp;
						<img
							className={styles['icon']}
							src="/star-icon.svg"
							alt="Иконка звёздочки"
						/>
					</div>
					<button className={styles['add-to-cart']} onClick={add}>
						<img src="/cart-button-icon.svg" alt="Добавить в корзину" />
					</button>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{name}</div>
					<div className={styles['description']}>{description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
