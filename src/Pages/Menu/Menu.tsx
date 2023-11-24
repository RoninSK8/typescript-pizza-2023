import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';

function Menu() {
	return (
		<div>
			<div className={styles['head']}>
				<Header>Меню</Header>
				<Search placeholder="Введите блюдо или состав"></Search>
			</div>
			<div>
				<ProductCard
					id={1}
					price={100}
					rating={4.4}
					title="pizza"
					description="description of a delicious pizza with pizza"
					image="/product-demo.png"
				></ProductCard>
			</div>
		</div>
	);
}

export default Menu;
