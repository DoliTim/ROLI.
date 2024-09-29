import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled Components
const Container = styled.div`
  padding: 40px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  color: #ff6600;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
`;

const UserCard = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: none;
  width: 80px;
  margin-right: 10px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #ff6600;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e65c00;
  }
`;

const StatsContainer = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 800px;
`;

const StatBox = styled.div`
  text-align: center;

  h4 {
    font-size: 18px;
    color: #ff6600;
  }

  p {
    font-size: 24px;
  }
`;

const SearchBar = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  font-size: 18px;
`;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokenUpdates, setTokenUpdates] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/users');
        setUsers(response.data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/stats');
        setUserCount(response.data.userCount);
        setTotalTokens(response.data.totalTokens);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchUsers();
    fetchStats();
  }, []);

  const handleTokenChange = (id, value) => {
    setTokenUpdates({ ...tokenUpdates, [id]: value });
  };

  const handleTokenUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/admin/user/${id}/tokens`, {
        amount: tokenUpdates[id],
      });
      alert(response.data.message);
      window.location.reload(); // Refresh the page after the update
    } catch (err) {
      console.error('Error updating tokens:', err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title>Admin Dashboard</Title>

      <StatsContainer>
        <StatBox>
          <h4>Total Users</h4>
          <p>{userCount}</p>
        </StatBox>
        <StatBox>
          <h4>Total Roli Tokens Distributed</h4>
          <p>{totalTokens}</p>
        </StatBox>
      </StatsContainer>

      <SearchBar
        type="text"
        placeholder="Search users by username or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h3>Manage Users</h3>
      <UserList>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id}>
              <div>
                <p>{user.username} ({user.email})</p>
                <p>Roli Tokens: {user.amount_of_roli_tokens}</p>
              </div>
              <div>
                <Input
                  type="number"
                  value={tokenUpdates[user.id] || ''}
                  onChange={(e) => handleTokenChange(user.id, e.target.value)}
                  placeholder="Update Tokens"
                />
                <Button onClick={() => handleTokenUpdate(user.id)}>Update</Button>
              </div>
            </UserCard>
          ))
        ) : (
          <p>No users found</p>
        )}
      </UserList>
    </Container>
  );
};

export default AdminPanel;
