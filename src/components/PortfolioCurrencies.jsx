import { styles } from "../styles.js";

const PortfolioCurrencies = ({ currencies,handleSellCurrency  }) => {

    console.log(currencies)
    return (
        <section style={styles.card}>
            <h3 style={styles.cardTitle}>MOJE WALUTY</h3>

            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>WALUTA</th>
                    <th style={styles.th}>ILOŚĆ</th>
                    <th style={styles.th}>ŚREDNIA CENA</th>
                    <th style={styles.th}>AKCJA</th>

                </tr>
                </thead>

                <tbody>
                {currencies.length === 0 ? (
                    <tr>
                        <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                            Brak posiadanych walut
                        </td>
                    </tr>
                ) : (
                    currencies.map(cur => (
                        <tr key={cur.code}>
                            <td style={styles.td}>{cur.code}</td>
                            <td style={styles.td}>{cur.amount}</td>
                            <td style={styles.td}>{cur.avgPrice?.toFixed(4)}</td>
                            <td style={styles.td}>
                                <button
                                    style={styles.sellBtn}
                                    onClick={() => handleSellCurrency(cur.code)}
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

export default PortfolioCurrencies;
