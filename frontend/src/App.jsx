import { useEffect, useState } from 'react';

function App() {
  const [donations, setDonations] = useState([]);
  const [donorName, setDonorName] = useState('');
  const [foodDetails, setFoodDetails] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');

  const fetchDonations = async () => {
    const res = await fetch('http://localhost:5000/api/donations');
    const data = await res.json();
    setDonations(data);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ donorName, foodDetails, pickupAddress }),
    });
    setDonorName('');
    setFoodDetails('');
    setPickupAddress('');
    fetchDonations();
  };

  const handleClaim = async (id) => {
    const homeName = prompt('Enter your Childcare or Elderly Home name:');
    if (!homeName) return;

    await fetch(`http://localhost:5000/api/donations/${id}/claim`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claimedBy: homeName }),
    });
    fetchDonations();
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', fontFamily: 'sans-serif', padding: '0 1rem' }}>
      <h1>Surplus Food Donation Portal</h1>

      <form onSubmit={handlePost} style={{ display: 'grid', gap: '10px', marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Donate Surplus Food (Hotels / Colleges)</h3>
        <input
          placeholder="Hotel or College Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
        />
        <input
          placeholder="Food Details & Quantity (e.g., 25 Meals - Rice & Dal)"
          value={foodDetails}
          onChange={(e) => setFoodDetails(e.target.value)}
          required
        />
        <input
          placeholder="Pickup Address & Contact Phone"
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: '10px', background: '#2e7d32', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Post Food Donation
        </button>
      </form>

      <h3>Available & Claimed Donations</h3>
      {donations.map((item) => (
        <div key={item._id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
          <h4>{item.foodDetails}</h4>
          <p><strong>From:</strong> {item.donorName}</p>
          <p><strong>Pickup:</strong> {item.pickupAddress}</p>
          <p>
            <strong>Status:</strong>{' '}
            {item.status === 'Available' ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>Available</span>
            ) : (
              <span style={{ color: 'gray' }}>Claimed by {item.claimedBy}</span>
            )}
          </p>

          {item.status === 'Available' && (
            <button onClick={() => handleClaim(item._id)} style={{ padding: '6px 12px', background: '#1565c0', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Claim for Care Home
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;