import { styles } from "../styles.js";

const MarketCurrencies = ({ currencies, handleBuyCurrency }) => {
    return (
        <section style={styles.card}>
            <h3 style={styles.cardTitle}>RYNEK WALUT (FOREX)</h3>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>WALUTA</th>
                    <th style={styles.th}>KUPNO (bid)</th>
                    <th style={styles.th}>SPRZEDAŻ (ask)</th>
                    <th style={styles.th}>AKCJA</th>
                </tr>
                </thead>

                <tbody>
                {currencies.map(c => (
                    <tr key={c.code}>
                        <td style={styles.td}>{c.code}</td>
                        <td style={styles.td}>{c.bid?.toFixed(4)}</td>
                        <td style={styles.td}>{c.ask?.toFixed(4)}</td>
                        <td style={styles.td}>
                            <button
                                style={styles.buyBtn}
                                onClick={() => handleBuyCurrency(c.code)}
                            >
                                KUP
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default MarketCurrencies;
