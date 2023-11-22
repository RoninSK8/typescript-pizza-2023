import { InputHTMLAttributes, ReactNode } from 'react';

export interface HeaderProps extends InputHTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}
