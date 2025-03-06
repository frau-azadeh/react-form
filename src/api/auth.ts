import axios from "axios";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const api = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    apikey: supabaseKey,
    "Content-Type": "application/json",
  },
});

// تابع لاگین کاربر
export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await api.get(`/login?email=eq.${email}&password_hash=eq.${password}`);
    if (data.length === 0) throw new Error("Invalid email or password");
    return data[0];
  } catch (error) {
    throw new Error("Login failed, please check your credentials.");
  }
};

export const registerUser = async (fullName: string, email: string, password: string) => {
    try {
      const { data } = await api.post("/login", {
        full_name: fullName,
        email,
        password_hash: password, // پسورد رو هش نمی‌کنیم، فقط برای تسته
      });
      return data;
    } catch (error) {
      throw new Error("Registration failed, please try again.");
    }
  };
  
