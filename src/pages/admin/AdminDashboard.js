import React from "react";
import {Link} from "react-router-dom";
import "../../styles/adminDashboard.css";

function AdminDashboard(){
    const stats =[
        {
            title:"Total Products",
            value:128,
            color:"#2563eb",
            icon:"📦",
        },
        {
            title:"Total Orders",
            value:542,
            color:"#16a34a",
            icon:"🛒",
        },
        {
            title:"Pending Orders",
            value:32,
            color:"#f59e0b",
            icon:"⏳",
        },
        {
            title:"Cancelled Orders",
            value:12,
            color:"#dc2626",
            icon:"❌",
        }, 
    ];

    const recentOrders=[
        {
            id:"#ORD1021",
            customer:"Rahul",
            amount:"₹2,499",
            status:"Delivered",
        },
        {
            id:"#ORD1022",
            customer:"Asrith",
            amount:"₹299",
            status:"Pending",
        },
        {
            id:"#ORD1023",
            customer:"Kowshik",
            amount:"₹1,950",
            status:"Cancelled",
        },
        {
            id:"#ORD1024",
            customer:"Ganesh",
            amount:"₹750",
            status:"Delivered",
        },
    ];

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <h2 className="admin-logo">Admin</h2>

                <nav className="admin-menu">
                    <Link to="/admin" className="menu-link active">Dashboard</Link>

                    <Link to="/admin/products" className="menu-link">Products</Link>

                    <Link to="/admin/orders" className="menu-link">Orders</Link>

                    <Link to="/admin/categories" className="menu-link">Categories</Link>

                    <Link to="/admin/users" className="menu-link">Users</Link>

                </nav>
                    </aside>

                    <main className="admin-main">
                        <div className="admin-topbar">
                            <h1>Admin Dashboard</h1>

                            <div className="admin-profile">
                                <span>Admin</span>
                            </div>
                        </div>

                        <div className="stats-grid">
                            {stats.map((item,index) =>(
                                <div
                                className="stats-card"
                                key={index}
                                style={{borderLeft:`5px solid ${item.color}`}}
                                >
                                    <div className="stats-icon">{item.icon}</div>

                                    <div>
                                        <h3>{item.title}</h3>
                                        <h3>{item.value}</h3>
                                    </div>
                                    </div>
                            ))}
                        </div>

                        <div className="quick-actions">
                            <Link to="/admin/add-product" className="action-btn">Add Product</Link>

                            <Link to="/admin/orders" className="action-btn">View Orders</Link>

                            <Link to="/admin/users">Manage Users</Link>

                        </div>

                        <div className="orders-section">
                            <div className="section-header">
                                <h2>Recent Orders</h2>
                            </div>

                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentOrders.map((order,index)=>(
                                        <tr key={index}>
                                            <td>{order.id}</td>
                                            <td>{order.customer}</td>
                                            <td>{order.amount}</td>

                                            <td>
                                                <span
                                                    className={`status ${order.status.toLowerCase()}`}>
                                                        {order.status}
                                                    </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
        </div>
    );
}
export default AdminDashboard;