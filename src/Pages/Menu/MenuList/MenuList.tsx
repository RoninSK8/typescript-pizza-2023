import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';

function MenuList({ products }: MenuListProps) {
	return products.map(({ id, name, price, ingredients, image, rating }) => (
		<ProductCard
			key={id}
			id={id}
			price={price}
			rating={rating}
			name={name}
			description={ingredients.join(', ')}
			image={image}
		></ProductCard>
	));
}

export default MenuList;
