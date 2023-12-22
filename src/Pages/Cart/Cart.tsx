import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { Product } from '../../interfaces/product.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';

const DELIVERY_FEE = 169;

function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);

	const getItem = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCartProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	const sumOfProducts = items
		.map((item) => {
			const product = cartProducts.find((p) => p.id === item.id);
			if (!product) {
				return 0;
			}
			return item.count * product.price;
		})
		.reduce((acc, i) => (acc += i), 0);

	const productsCount = items.reduce((acc, i) => acc + i.count, 0);

	return (
		<>
			<Header className={styles['header']}>Корзина</Header>
			{items.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) {
					return;
				}
				return <CartItem key={product.id} count={i.count} {...product} />;
			})}
			<div className={styles['line']}>
				<div
					className={styles['text']}
				>{`Общее число товаров: ${productsCount} на сумму`}</div>
				<div className={styles['price']}>
					{sumOfProducts}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Доставка</div>
				<div className={styles['price']}>
					{DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div className={styles['text']}>Итог</div>
				<div className={styles['price']}>
					{sumOfProducts + DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
		</>
	);
}

export default Cart;
