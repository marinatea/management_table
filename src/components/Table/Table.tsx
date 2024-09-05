// import s from './Table.module.scss';

import { useEffect, useState } from "react";

interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
}

const Table = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    console.log({ name, username, email, phone });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>User List</div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => e.target.value}
      />{" "}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => e.target.value}
      />{" "}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => e.target.value}
      />{" "}
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => e.target.value}
      />{" "}
      <button>Submit</button>
      <ul>
        {users.map((user, i) => (
          <li key={i}>
            {user.name} - {user.username} - {user.email} - {user.phone}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Table;
