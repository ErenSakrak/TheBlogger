// services/userService.js

const userService = {
    login: async (userData) => {
      const { username, password } = userData;
  
      // Kullanıcı girişi için API çağrısı yapılabilir
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // Giriş başarılı
        return true;
      } else {
        // Giriş başarısız, hata durumunu kontrol et
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    },
  };
  
  export default userService;
  