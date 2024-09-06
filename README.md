This code implements a user management table with filtering capabilities using React and Redux Toolkit.

### DEMO:

https://management-table-five.vercel.app/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Component Setup:

- UserTable is a React functional component that connects to Redux state via useDispatch and useSelector.
It fetches user data when the component mounts using fetchUsers thunk and updates the Redux store with the fetched data.

- FilterInput component is a straightforward and reusable input field designed for filtering purposes. The component provides a set of FilterInput components for filtering users by name, username, email, and phone.
Filters are applied locally to the list of users before rendering them in the table.

### Redux Slice:

- userSlice manages the user data and filter states.
- It uses createAsyncThunk to handle async data fetching.
- It updates the Redux state based on the status of the data fetching and any errors.

### Store Configuration:

- configureStore is used to set up the Redux store with the userSlice reducer.
- RootState and AppDispatch types are defined for TypeScript support.

Challenges:

Performance:
Filtering users is done on the client side. For large datasets, this approach might impact performance. Implementing server-side filtering could improve performance.

Loading State:
The loading state is indicated by a simple message. A more sophisticated loading indicator might improve user experience.
