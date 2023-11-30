import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		const getMenu = async () => {
			try {
				setIsloading(true);
				const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
				setProducts(data);
				setIsloading(false);
			} catch (e) {
				console.error(e);
				if (e instanceof AxiosError) {
					setError(e.message);
				}
				setIsloading(false);
				return;
			}
		};
		getMenu();
	}, []);

	return (
		<div>
			<div className={styles['head']}>
				<Header>Меню</Header>
				<Search placeholder="Введите блюдо или состав"></Search>
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && <MenuList products={products} />}
				{isLoading && <>Загружаем продукты ...</>}
			</div>
		</div>
	);
}

export default Menu;
