import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from "./components/Navbar.jsx";
import MarketCurrencies from "./components/MarketCurrencies.jsx";
import MarketStocks from "./components/MarketStocks.jsx";
import PortfolioCurrencies from "./components/PortfolioCurrencies.jsx";
import PortfolioStocks from "./components/PortfolioStocks.jsx";



import { styles } from "./styles.js";



const App = () => {

    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [balance, setBalance] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [stocksLoading, setStocksLoading] = useState(true);

    const [portfolio, setPortfolio] = useState({
        balance: 0,
        currencies: [],
        stocks: []
    });

    //  Pobieranie profilu po starcie aplikacji
    useEffect(() => {
        if (token) {
            fetchProfile();
            setIsLoggedIn(true);
        }
    }, [token]);

    //  Pobieranie profilu z backendu
    const fetchProfile = async () => {
        try {
            const { data } = await axios.get('/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setBalance(data.balance);
            setPortfolio(data.portfolio);
        } catch (err) {
            console.error("Błąd pobierania profilu:", err);
        }
    };

    //  Logowanie
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/login', { email, password });

            // zapisujemy token
            localStorage.setItem('token', data.token);
            setToken(data.token);

            setIsLoggedIn(true);

            // pobieramy aktualny profil
            await fetchProfile();

            alert('Zalogowano pomyślnie!');
        } catch (error) {
            alert(error.response?.data?.message || 'Błąd logowania');
        }
    };

    //  Rejestracja
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users', {
                username: email.split('@')[0],
                email,
                password
            });

            // zapisujemy token
            localStorage.setItem('token', data.token);
            setToken(data.token);

            setIsLoggedIn(true);

            // pobieramy aktualny profil
            await fetchProfile();

            alert('Konto stworzone i zalogowano!');
        } catch (error) {
            alert(error.response?.data?.message || 'Błąd rejestracji');
        }
    };

    //  Wylogowanie
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setBalance(0);
        setPortfolio({ balance: 0, currencies: [], stocks: [] });
    };

    //  Pobieranie walut
    useEffect(() => {
        if (!isLoggedIn) return;

        fetch("http://localhost:5000/api/market/rates")
            .then(res => res.json())
            .then(data => setCurrencies(data))
            .catch(err => console.error("Błąd pobierania walut:", err));
    }, [isLoggedIn]);

    //  Pobieranie akcji
    useEffect(() => {
        if (!isLoggedIn) return;

        setStocksLoading(true);

        fetch("http://localhost:5000/api/market/stocks")
            .then(res => res.json())
            .then(data => {
                setStocks(data);
                setStocksLoading(false);
            })
            .catch(err => {
                console.error("Błąd pobierania akcji:", err);
                setStocksLoading(false);
            });
    }, [isLoggedIn]);

    //  Pobieranie portfolio
    const fetchPortfolio = () => {
        fetch("http://localhost:5000/api/market/portfolio", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setPortfolio({
                    balance: data.balance,
                    currencies: Array.isArray(data.currencies) ? data.currencies : [],
                    stocks: Array.isArray(data.stocks) ? data.stocks : []
                });
            })
            .catch(err => console.error("Błąd pobierania portfolio:", err));
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchPortfolio();
        }
    }, [isLoggedIn]);

    //  Kupowanie akcji

    const handleBuyStock = (symbol) => {
        fetch("http://localhost:5000/api/market/buy-stock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ symbol })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Kupiono akcję:", data);
                setBalance(data.balance);
                fetchPortfolio(); // odświeżamy portfolio
            })
            .catch(err => console.error("Błąd kupowania akcji:", err));
    };

    //  sprzedawanie akcji

    const handleSellStock = (symbol) => {
        fetch("http://localhost:5000/api/market/sell-stock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ symbol })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Sprzedano akcję:", data);
                setBalance(data.balance);
                fetchPortfolio(); // odświeżamy portfolio
            })
            .catch(err => console.error("Błąd sprzedawania akcji:", err));
    };


    //  Kupowanie walut

    const handleBuyCurrency = (code) => {
        fetch("http://localhost:5000/api/market/buy-currency", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ code})
        })
            .then(res => res.json())
            .then(data => {
                console.log("Kupiono walutę:", data);
                setBalance(data.balance);
                fetchPortfolio(); // odświeżamy portfolio
            })
            .catch(err => console.error("Błąd kupowania waluty:", err));
    };

    //  Sprzedawanie walut

    const handleSellCurrency = (code, amount) => {
        fetch("http://localhost:5000/api/market/sell-currency", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ code, amount })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Sprzedano walutę:", data);
                setBalance(data.balance);
                fetchPortfolio();
            })
            .catch(err => console.error("Błąd sprzedawania waluty:", err));
    };




    return (
        <div style={styles.container}>

            <Navbar
                isLoggedIn={isLoggedIn}
                balance={balance}
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
                handleLogout={handleLogout}
            />
            {/* 2. SEKCJA GŁÓWNA (GRID) */}
            <main style={styles.grid}>

                {/* BLOK: WALUTY */}
                <MarketCurrencies
                    currencies={currencies}
                    handleBuyCurrency={handleBuyCurrency}
                />


                {/* BLOK: AKCJE */}

                <MarketStocks
                    stocks={stocks}
                    stocksLoading={stocksLoading}
                    handleBuyStock={handleBuyStock}
                />


                {/* BLOK: MOJE WALUTY */}
                {isLoggedIn ? (
                    <PortfolioCurrencies
                        currencies={portfolio.currencies}
                        handleBuyCurrency={handleBuyCurrency}
                        handleSellCurrency={handleSellCurrency}
                    />
                ) : (
                    <section style={styles.lockedCard}>Zaloguj się, aby zarządzać walutami</section>
                )}


                {/* BLOK: MOJE AKCJE */}
                {isLoggedIn ? (
                    <PortfolioStocks
                        stocks={portfolio.stocks}
                        handleSellStock={handleSellStock}
                    />
                ) : (
                    <section style={styles.lockedCard}>Zaloguj się, aby zarządzać akcjami</section>
                )}
            </main>
        </div>
    );
};
export default App;