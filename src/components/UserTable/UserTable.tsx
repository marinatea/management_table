import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchUsers, setFilter } from "../../redux/userSlice";
import { RootState } from "../../redux/store";
import { AnyAction } from "redux";
import s from './UserTable.module.scss';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const UserTable: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { users, filters, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof filters
  ) => {
    dispatch(setFilter({ field, value: e.target.value }));
  };

  const filteredUsers = users.filter(
    (user: User) =>
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.phone.toLowerCase().includes(filters.phone.toLowerCase())
  );

  return (
    <div className={s.container}>
      <h1>User Management</h1>
      <div className={s.container__wrapperInput}>
        <input
          type="text"
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => handleFilterChange(e, "name")}
        />
        <input
          type="text"
          placeholder="Filter by username"
          value={filters.username}
          onChange={(e) => handleFilterChange(e, "username")}
        />
        <input
          type="text"
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e) => handleFilterChange(e, "email")}
        />
        <input
          type="text"
          placeholder="Filter by phone"
          value={filters.phone}
          onChange={(e) => handleFilterChange(e, "phone")}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className={s.users}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: User) => (
              <tr key={user.id}>
                <td  className={s.users__body}>{user.name}</td>
                <td  className={s.users__body}>{user.username}</td>
                <td  className={s.users__body}>{user.email}</td>
                <td  className={s.users__body}>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
