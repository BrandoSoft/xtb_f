import { styles } from "../styles.js";

const PortfolioStocks = ({ stocks, handleSellStock }) => {
    return (
        <section style={styles.card}>
            <h3 style={styles.cardTitle}>MOJE AKCJE</h3>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>SYMBOL</th>
                    <th style={styles.th}>ILOŚĆ</th>
                    <th style={styles.th}>ŚREDNIA CENA</th>
                    <th style={styles.th}>AKCJA</th>
                </tr>
                </thead>

                <tbody>
                {stocks.length === 0 ? (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                            Brak posiadanych akcji
                        </td>
                    </tr>
                ) : (
                    stocks.map(stock => (
                        <tr key={stock.symbol}>
                            <td style={styles.td}>{stock.symbol}</td>
                            <td style={styles.td}>{stock.amount}</td>
                            <td style={styles.td}>{stock.avgPrice?.toFixed(2)}</td>
                            <td style={styles.td}>
                                <button
                                    className="sell-btn"
                                    onClick={() => handleSellStock(stock.symbol)}
                                >
                                    SPRZEDAJ
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

export default PortfolioStocks;
