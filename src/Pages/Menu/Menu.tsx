import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const getMenu = async () => {
		try {
			const res = await fetch(`${PREFIX}/products`);
			if (!res.ok) {
				return;
			}
			const data = (await res.json()) as Product[];
			setProducts(data);
		} catch (e) {
			console.error(e);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<div>
			<div className={styles['head']}>
				<Header>Меню</Header>
				<Search placeholder="Введите блюдо или состав"></Search>
			</div>
			<div>
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
		</div>
	);
}

export default Menu;
