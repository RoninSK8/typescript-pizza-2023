import { ChangeEvent, useEffect, useState } from 'react';
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
	const [filter, setFilter] = useState<string>();

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	useEffect(() => {
		const getMenu = async (name?: string) => {
			try {
				setIsloading(true);
				const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
					params: {
						name,
					},
				});
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
		getMenu(filter);
	}, [filter]);

	return (
		<div>
			<div className={styles['head']}>
				<Header>Меню</Header>
				<Search
					placeholder="Введите блюдо или состав"
					onChange={updateFilter}
				></Search>
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && <>Загружаем продукты ...</>}
				{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
			</div>
		</div>
	);
}

export default Menu;
