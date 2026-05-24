export const styles = {
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
    spinner: {
        width: '28px',
        height: '28px',
        border: '4px solid #30363d',
        borderTopColor: '#1f6feb',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        margin: '0 auto'
    },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
    th: { textAlign: 'left', color: '#8b949e', fontSize: '12px', borderBottom: '1px solid #30363d', paddingBottom: '10px' },
td: { padding: '12px 0', borderBottom: '1px solid #21262d', fontSize: '14px' },
buyBtn: { backgroundColor: '#1f6feb', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
sellBtn: { backgroundColor: '#da3633', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
};
