import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { fetchUsers, setFilter } from "../../redux/userSlice";
import { User } from "../../utils/types";
import s from "./UserTable.module.scss";
import FilterInput from "../FilterInput/FilterInput";

type UserAction = ReturnType<typeof setFilter>;

const UserTable: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, undefined, UserAction> =
    useDispatch();
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
    <div className={s.userTable}>
      <h1 className={s.userTable__title}>User Management</h1>
      <div className={s.userTable__filters}>
        <FilterInput
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFilterChange(e, "name")
          }
        />
        <FilterInput
          placeholder="Filter by username"
          value={filters.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFilterChange(e, "username")
          }
        />
        <FilterInput
          placeholder="Filter by email"
          value={filters.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFilterChange(e, "email")
          }
        />
        <FilterInput
          placeholder="Filter by phone"
          value={filters.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFilterChange(e, "phone")
          }
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className={s.userTable__table}>
          <thead className={s.userTable__tableHeader}>
            <tr>
              <th className={s.userTable__tableHeaderCell}>Name</th>
              <th className={s.userTable__tableHeaderCell}>Username</th>
              <th className={s.userTable__tableHeaderCell}>Email</th>
              <th className={s.userTable__tableHeaderCell}>Phone</th>
            </tr>
          </thead>
          <tbody className={s.userTable__tableBody}>
            {filteredUsers.map((user: User) => (
              <tr key={user.id} className={s.userTable__tableRow}>
                <td className={s.userTable__tableBodyCell}>{user.name}</td>
                <td className={s.userTable__tableBodyCell}>{user.username}</td>
                <td className={s.userTable__tableBodyCell}>{user.email}</td>
                <td className={s.userTable__tableBodyCell}>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
