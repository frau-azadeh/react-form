import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";


function App() {
  const [users, setUsers] = useState<{ id: number; email: string }[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("login").select("*");
      if (error) console.error("Error fetching login:", error);
      else setUsers(data || []);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <ul className="list-disc pl-5">
        {users.length > 0 ? (
          users.map((login) => (
            <li key={login.id} className="text-lg">
              {login.email}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </ul>
    </div>
  );
}

export default App;

