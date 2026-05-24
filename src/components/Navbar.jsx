import { styles } from "../styles.js";


const Navbar = ({
                    isLoggedIn,
                    balance,
                    email,
                    password,
                    setEmail,
                    setPassword,
                    handleLogin,
                    handleRegister,
                    handleLogout
                }) => {
    return (
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
          <span style={{ marginRight: '20px' }}>
            Stan konta: <strong>{balance?.toFixed(2)} PLN</strong>
          </span>
                    <button onClick={handleLogout} style={styles.logoutBtn}>Wyloguj</button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
