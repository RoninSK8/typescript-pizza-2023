import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { Product } from '../../interfaces/product.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';

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

	return (
		<>
			<Header className={styles['header']}>Корзина</Header>
			{items.map((i) => {
				const product = cartProducts.find((p) => p.id === i.id);
				if (!product) {
					return;
				}
				return <CartItem count={i.count} {...product} />;
			})}
		</>
	);
}

export default Cart;
