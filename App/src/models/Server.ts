import { User, currentUser } from "./User";
// import AsyncStorage from '@react-native-async-storage/async-storage';

class Server {
  private url: string;

  constructor(url: string = "https://brief-oriole-causal.ngrok-free.app/") {
    this.url = url;
  }
  // api/me

  public async registerUser(
    nameArg: string,
    passwordArg: string,
    emailArg: string
  ) {
    try {
      console.log("fetching... ");
      const response = await fetch(this.url + "Account/Register", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: nameArg,
          password: passwordArg,
          email: emailArg,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  // en put metode til at opdatere user data

  public async getUserInfo(): Promise<User> {
    console.log("fetch this");
    const response = await fetch(`${this.url}AppUser/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + currentUser.token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("respons:", data);

    currentUser.email = data.email;
    currentUser.fullName = data.fullName;
    currentUser.height = data.height;
    currentUser.gender = data.gender;
    currentUser.weight = data.currentWeight;
    currentUser.targetWeight = data.targetWeight;
    currentUser.activity = data.activityLevel;
    currentUser.difficulty = data.difficultyLevel;
    currentUser.calories = data.dailyCalories;
    currentUser.proteins = data.dailyProtein;
    currentUser.carbs = data.dailyCarbs;
    currentUser.fats = data.dailyFat;
    currentUser.water = data.currentWater;
    currentUser.age = data.age;

    console.log("updated current user with: ", currentUser);
    return currentUser;
  }

  public async loginUser(nameArg: string, passwordArg: string) {
    try {
      console.log("logging in with url: ", this.url + "Account/Login");
      const response = await fetch(this.url + "Account/Login", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: nameArg,
          password: passwordArg,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      currentUser.token = await response.text();
      if (currentUser.token === "") {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  public async getUser(): Promise<void> {
    await fetch(this.url + `GetUser`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("getUser fucked up :(");
      })
      .then((data) => {
        console.debug(data);
      });
  }
}

export default new Server();
