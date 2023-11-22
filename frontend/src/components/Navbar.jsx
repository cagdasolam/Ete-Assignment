import React from 'react';
import { Layout, Menu } from 'antd';
import {
	HomeOutlined,
	AppstoreOutlined,
	ContainerOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';


const { Header } = Layout;

const Navbar = ({ currentPath, setCurrentPath, isLoggedIn, setLoggedIn }) => {

	const handleMenuClick = (e) => {
		setCurrentPath(e.key);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		setLoggedIn(false);
		window.location.href = '/login';
	};

	return (
		<Header>
			<div className="logo" />
			<Menu theme="dark" mode="horizontal" selectedKeys={[currentPath]} onClick={handleMenuClick}>
				<Menu.Item key="/home" icon={<HomeOutlined />}>
					<Link to="/home">Home</Link>
				</Menu.Item>
				<Menu.Item key="/companies" icon={<AppstoreOutlined />}>
					<Link to="/companies">Companies</Link>
				</Menu.Item>
				<Menu.Item key="/products" icon={<ContainerOutlined />}>
					<Link to={"/products"}>Products</Link>
				</Menu.Item>
				{
					isLoggedIn && (
						<Menu.Item key="/logout" onClick={handleLogout} icon={<UnorderedListOutlined />} style={{ marginLeft: 'auto' }}>
							Logout
						</Menu.Item>)
				}
			</Menu>
		</Header>
	);
};

export default Navbar;
