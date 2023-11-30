import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

function MenuList({ products }: MenuListProps) {
	return (
		<div className={styles.wrapper}>
			{products.map(({ id, name, price, ingredients, image, rating }) => (
				<ProductCard
					key={id}
					id={id}
					price={price}
					rating={rating}
					name={name}
					description={ingredients.join(', ')}
					image={image}
				></ProductCard>
			))}
		</div>
	);
}

export default MenuList;
