import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [balance, setBalance] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setIsLoggedIn(true);
            setBalance(data.balance);
            alert('Zalogowano pomyślnie!');
        } catch (error) {
            alert(error.response?.data?.message || 'Błąd logowania');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users', {
                username: email.split('@')[0],
                email,
                password
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setIsLoggedIn(true);
            setBalance(data.balance);
            alert('Konto stworzone i zalogowano!');
        } catch (error) {
            alert(error.response?.data?.message || 'Błąd rejestracji');
        }
    };

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setIsLoggedIn(true);
            setBalance(user.balance);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setBalance(0);
    };

    return (
        <div style={styles.container}>
            {/* 1. GÓRNY PASEK (NAVBAR) */}
            <header style={styles.navbar}>
                <div style={styles.logo}>XTB CLONE</div>
                {!isLoggedIn ? (
                    <div style={styles.loginForm}>
                        <input
                            type="email"
                            placeholder="login/mail"
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="hasło"
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin} style={styles.loginBtn}>Zaloguj</button>
                        <button onClick={handleRegister} style={styles.registerBtn}>Zarejestruj</button>
                    </div>
                ) : (
                    <div style={styles.userInfo}>
                        <span style={{ marginRight: '20px' }}>Stan konta: <strong>{balance.toFixed(2)} PLN</strong></span>
                        <button onClick={handleLogout} style={styles.logoutBtn}>Wyloguj</button>
                    </div>
                )}
            </header>

            {/* 2. SEKCJA GŁÓWNA (GRID) */}
            <main style={styles.grid}>

                {/* BLOK: WALUTY */}
                <section style={styles.card}>
                    <h3 style={styles.cardTitle}>RYNEK WALUT (FOREX)</h3>
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>WALUTA</th>
                            <th style={styles.th}>KURS</th>
                            <th style={styles.th}>AKCJA</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={styles.td}>Dolar (USD/PLN)</td>
                            <td style={styles.td}>4.02</td>
                            <td style={styles.td}><button style={styles.buyBtn}>KUP</button></td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Euro (EUR/PLN)</td>
                            <td style={styles.td}>4.35</td>
                            <td style={styles.td}><button style={styles.buyBtn}>KUP</button></td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                {/* BLOK: AKCJE */}
                <section style={styles.card}>
                    <h3 style={styles.cardTitle}>GIEŁDA PAPIERÓW</h3>
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th}>SPOŁKA</th>
                            <th style={styles.th}>CENA</th>
                            <th style={styles.th}>AKCJA</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={styles.td}>Apple (AAPL)</td>
                            <td style={styles.td}>175.00</td>
                            <td style={styles.td}><button style={styles.buyBtn}>KUP</button></td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Microsoft (MSFT)</td>
                            <td style={styles.td}>420.00</td>
                            <td style={styles.td}><button style={styles.buyBtn}>KUP</button></td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                {/* BLOK: MOJE WALUTY */}
                {isLoggedIn ? (
                    <section style={styles.card}>
                        <h3 style={styles.cardTitle}>MOJE WALUTY</h3>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th style={styles.th}>WALUTA</th>
                                <th style={styles.th}>ILOŚĆ</th>
                                <th style={styles.th}>WARTOŚĆ</th>
                                <th style={styles.th}>AKCJA</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style={styles.td}>Dolar</td>
                                <td style={styles.td}>100</td>
                                <td style={styles.td}>402.00</td>
                                <td style={styles.td}><button style={styles.sellBtn}>SPRZEDAJ</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                ) : (
                    <section style={styles.lockedCard}>Zaloguj się, aby zarządzać walutami</section>
                )}

                {/* BLOK: MOJE AKCJE */}
                {isLoggedIn ? (
                    <section style={styles.card}>
                        <h3 style={styles.cardTitle}>MOJE AKCJE</h3>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th style={styles.th}>SPOŁKA</th>
                                <th style={styles.th}>ILOŚĆ</th>
                                <th style={styles.th}>WARTOŚĆ</th>
                                <th style={styles.th}>AKCJA</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style={styles.td}>Apple</td>
                                <td style={styles.td}>5</td>
                                <td style={styles.td}>875.00</td>
                                <td style={styles.td}><button style={styles.sellBtn}>SPRZEDAJ</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                ) : (
                    <section style={styles.lockedCard}>Zaloguj się, aby zarządzać akcjami</section>
                )}
            </main>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: '20px',
        backgroundColor: '#0d1117',
        color: '#c9d1d9',
        minHeight: '100vh'
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#161b22',
        borderBottom: '1px solid #30363d',
        borderRadius: '8px',
        marginBottom: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
    },
    logo: { fontSize: '24px', fontWeight: 'bold', color: '#58a6ff', letterSpacing: '2px' },
    loginForm: { display: 'flex', gap: '12px' },
    input: {
        padding: '8px 12px',
        backgroundColor: '#0d1117',
        border: '1px solid #30363d',
        borderRadius: '6px',
        color: 'white',
        outline: 'none'
    },
    loginBtn: {
        padding: '8px 20px',
        cursor: 'pointer',
        backgroundColor: '#238636',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold'
    },
    registerBtn: {
        padding: '8px 20px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        color: '#c9d1d9',
        border: '1px solid #30363d',
        borderRadius: '6px'
    },
    logoutBtn: { padding: '5px 12px', backgroundColor: '#da3633', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    card: {
        backgroundColor: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '10px',
        padding: '20px',
        minHeight: '250px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
    },
    cardTitle: { color: '#58a6ff', margin: '0 0 15px 0', fontSize: '18px' },
    lockedCard: {
        backgroundColor: 'rgba(22, 27, 34, 0.6)',
        border: '1px dashed #484f58',
        borderRadius: '10px',
        padding: '20px',
        minHeight: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8b949e',
        fontStyle: 'italic'
    },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
    th: { textAlign: 'left', color: '#8b949e', fontSize: '12px', borderBottom: '1px solid #30363d', paddingBottom: '10px' },
    td: { padding: '12px 0', borderBottom: '1px solid #21262d', fontSize: '14px' },
    buyBtn: { backgroundColor: '#1f6feb', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
    sellBtn: { backgroundColor: '#da3633', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }
};

export default App;