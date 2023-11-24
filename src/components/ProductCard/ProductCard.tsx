import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

function ProductCard({
	id,
	price,
	rating,
	title,
	description,
	image,
}: ProductCardProps) {
	return (
		<Link to={'/'} className={styles['link']}>
			<div className={styles['card']} id={id}>
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
					<button className={styles['add-to-cart']}>
						<img src="/cart-button-icon.svg" alt="Добавить в корзину" />
					</button>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{title}</div>
					<div className={styles['description']}>{description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
