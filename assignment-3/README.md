## State Management API (Node Assignment 3)

Simple Express-based REST API to manage Indian state data (population, literacy rate, annual budget, GDP, etc.).

- **Backend deploy link**: [https://node-assignment-3-cmj0.onrender.com](https://node-assignment-3-cmj0.onrender.com)
- **Local base URL**: [http://localhost:3000](http://localhost:3000)

---

## Main Endpoints

All endpoints are available on both base URLs above.

- **GET `/states`**: Get list of all state names.
- **GET `/states/:id`**: Get full details of a state by numeric `id`.
- **GET `/states/highest-gdp`**: Get the state with the highest `gdp`.
- **POST `/states`**: Create a new state (uses `name`, `population`, `GDP` in body).
- **PUT `/states/:id`**: Replace/update a state (keeps original `id`).
- **PUT `/states/:id/annualbudget`**: Update only `annualBudget` of a state.
- **PUT `/states/:id/population`**: Update only `population` of a state.
- **PATCH `/states/:id/literacyrate`**: Partially update `literacyRate` of a state.
- **PATCH `/states/:id/gdp`**: Partially update `gdp` of a state.
- **PATCH `/states/:id`**: Partially update any fields of a state (body keys are merged).
- **DELETE `/states/:id`**: Delete a state by numeric `id`.
- **DELETE `/states/name/:statename`**: Delete a state by its `name` (case-insensitive).
- **DELETE `/states/low-literacy/:percentage`**: Delete all states with `literacyRate` below `percentage`.

---

## Example

Get the state with the highest GDP:

```bash
curl https://node-assignment-3-cmj0.onrender.com/states/highest-gdp
```
