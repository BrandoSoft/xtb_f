import { styles } from "../styles.js";

const MarketStocks = ({ stocks, stocksLoading, handleBuyStock }) => {
    return (
        <section style={styles.card}>
            <h3 style={styles.cardTitle}>GIEŁDA PAPIERÓW</h3>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>SPÓŁKA</th>
                    <th style={styles.th}>CENA</th>
                    <th style={styles.th}>AKCJA</th>
                </tr>
                </thead>

                <tbody>
                {stocksLoading ? (
                    <tr>
                        <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                            <div style={styles.spinner}></div>
                        </td>
                    </tr>
                ) : (
                    stocks.map(s => (
                        <tr key={s.symbol}>
                            <td style={styles.td}>{s.symbol}</td>
                            <td style={styles.td}>{s.price?.toFixed(2)}</td>
                            <td style={styles.td}>
                                <button
                                    style={styles.buyBtn}
                                    onClick={() => handleBuyStock(s.symbol)}
                                >
                                    KUP
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </section>
    );
};

export default MarketStocks;
