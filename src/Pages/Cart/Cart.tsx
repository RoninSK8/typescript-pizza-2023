import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { Product } from '../../interfaces/product.interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_FEE = 169;

function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);

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

	const checkout = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				products: items,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		dispatch(cartActions.clearCart());
		navigate('/success');
	};

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
				<div className={styles['text']}>Стоимость товаров</div>
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
				<div className={styles['text']}>
					Итог <span className={styles['total-count']}>{productsCount}</span>
				</div>
				<div className={styles['price']}>
					{sumOfProducts + DELIVERY_FEE}&nbsp;<span>₽</span>
				</div>
			</div>
			<div className={styles['checkout']}>
				<Button appearence="big" onClick={checkout}>
					Оформить
				</Button>
			</div>
		</>
	);
}

export default Cart;
