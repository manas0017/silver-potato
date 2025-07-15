import React, { useState } from 'react';

const App = () => {
  const [showMap, setShowMap] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedCanteen, setSelectedCanteen] = useState(null);

  const canteens = [
    { name: 'Main Canteen', icon: '🏠', menu: ['Rice & Dal', 'Paneer Butter Masala', 'Chapati', 'Buttermilk'] },
    { name: 'North Mess', icon: '🍛', menu: ['Rajma Rice', 'Mixed Veg Curry', 'Roti', 'Curd'] },
    { name: 'South Mess', icon: '🍱', menu: ['Sambhar & Rice', 'Vegetable Kurma', 'Parotta', 'Payasam'] },
    { name: 'Juice Center', icon: '🥤', menu: ['Orange Juice', 'Mango Shake', 'Banana Shake'] },
    { name: 'Non-Veg Corner', icon: '🍗', menu: ['Chicken Curry', 'Egg Masala', 'Fried Rice'] },
    { name: 'Bakery', icon: '🥐', menu: ['Puffs', 'Donuts', 'Chocolate Cake'] },
    { name: 'Evening Snacks', icon: '🌇', menu: ['Samosa', 'Pav Bhaji', 'Tea', 'Coffee'] },
    { name: 'Fast Food Hub', icon: '🍔', menu: ['Burger', 'Fries', 'Noodles'] },
    { name: 'Healthy Bites', icon: '🥗', menu: ['Sprout Salad', 'Boiled Eggs', 'Green Tea'] }
  ];

const departments = [
    { name: 'KJ COLLEGE GATE', icon: '🧪', map: 'https://maps.app.goo.gl/fEXZyDV9BexkNCdf8' },
    { name: 'TRINITY Jr COLLEGE', icon: '⚙', map: 'https://g.co/kgs/TqKjAT5' },
    { name: 'TRINITY COLLEGE OF ACADEMY', icon: '💻', map: 'https://g.co/kgs/E7dPoGQ' },
    { name: 'TRINITY COLLEGE OF ENGINEERING AND RESEARCH', icon: '📡', map: 'https://g.co/kgs/E7dPoGQ' },
    { name: 'TRINITY COLLEGE OF ENGINEERING AND MANAGEMENT', icon: '📐', map: 'https://g.co/kgs/tFxuumF' },
    { name: 'KJ EDUCATIONAL INSTITUTE', icon: '🔌', map: 'https://g.co/kgs/zksRRaq' },
    { name: 'TRINITY COLLEGE OF PHARMACY', icon: '📊', map: 'https://g.co/kgs/Uhq5h3B' },
    { name: 'TRINITY POLYTECHNIC PUNE', icon: '🏢', map: 'https://g.co/kgs/oMDyBVn' }
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botMessage = { text: data.reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [
        ...prev,
        { text: 'Something went wrong.', sender: 'bot' }
      ]);
    }

    setInput('');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>🎓 <span style={{ marginLeft: 10, fontWeight: 'bold' }}>Campus Assistant</span></div>
        <div style={styles.headerRight}>Your friendly campus helper</div>
      </header>

      <section style={styles.card}>
        <h2 style={styles.cardTitle}>🟣 Chat with Assistant</h2>
        <div style={{ ...styles.chatBox, flexDirection: 'column', overflowY: 'auto' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? '#d0f0c0' : '#eee',
                padding: '8px 12px',
                margin: '4px 0',
                borderRadius: 8,
                maxWidth: '80%'
              }}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.chatInputRow}>
          <input
            style={styles.chatInput}
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button style={styles.button} onClick={sendMessage}>Send</button>
        </div>
      </section>

      {/* Canteen Dropdown */}
      <section style={{ ...styles.card, backgroundColor: '#f1faf1' }}>
        <div style={styles.sectionRow}>
          <h3>🍽️ Today's Canteen Menu</h3>
          <select
            style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            value={selectedCanteen || ''}
            onChange={(e) => setSelectedCanteen(e.target.value)}
          >
            <option value="" disabled>Select a canteen</option>
            {canteens.map((canteen, index) => (
              <option key={index} value={index}>{canteen.name}</option>
            ))}
          </select>
        </div>
        {selectedCanteen !== null && (
          <div style={styles.expandedBox}>
            <h4>{canteens[selectedCanteen].icon} {canteens[selectedCanteen].name}</h4>
            {canteens[selectedCanteen].menu.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </div>
        )}
      </section>

      {/* Department Locations Grid */}
      <section style={{ ...styles.card, backgroundColor: '#fff7e6' }}>
        <div style={styles.sectionRow}>
          <h3>📍 Department Locations</h3>
          <button
            style={{ ...styles.button, ...styles.mapButton }}
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? 'Hide Locations' : 'Show Locations'}
          </button>
        </div>

        {showMap && (
          <div style={styles.gridBox}>
            {departments.map((dept, index) => (
              <div key={index} style={styles.mapCard}>
                <h4>{dept.icon} {dept.name}</h4>
                <iframe
                  title={dept.name}
                  src={dept.map}
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={styles.quickActions}>
        <h3 style={{ marginBottom: 15 }}>Quick Actions</h3>
        <div style={styles.grid}>
          <button style={styles.quickCard} onClick={() => alert('Library Hours clicked')}>📚<br />Library Hours</button>
          <button style={styles.quickCard} onClick={() => alert('Bus Schedule clicked')}>🚌<br />Bus Schedule</button>
          <button style={styles.quickCard} onClick={() => alert('Events clicked')}>📅<br />Events</button>
          <button style={styles.quickCard} onClick={() => alert('Help clicked')}>ℹ️<br />Help</button>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f4f8ff',
    minHeight: '100vh',
    padding: 20,
    fontFamily: 'sans-serif'
  },
  header: {
    background: 'linear-gradient(to right, #5ca3f5, #c194f5)',
    padding: '20px 30px',
    borderRadius: '12px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  headerLeft: {
    fontSize: 20,
    display: 'flex',
    alignItems: 'center'
  },
  headerRight: {
    fontSize: 14,
    opacity: 0.8
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    marginBottom: 20
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10
  },
  chatBox: {
    border: '2px dashed #c2d1e0',
    borderRadius: 10,
    height: 300,
    padding: 10,
    display: 'flex',
    gap: 8
  },
  chatInputRow: {
    display: 'flex',
    marginTop: 10,
    gap: 8
  },
  chatInput: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: '1px solid #ccc'
  },
  sectionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  },
  mapButton: {
    backgroundColor: '#2196F3'
  },
  expandedBox: {
    marginTop: 15,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
  },
  quickActions: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 15
  },
  quickCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    textAlign: 'center',
    borderRadius: 10,
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
    fontSize: 14,
    fontWeight: '500'
  },
  gridBox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
    marginTop: 20
  },
  mapCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    padding: 10
  }
};

export default App;