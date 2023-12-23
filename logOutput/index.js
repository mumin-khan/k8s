function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }
  
  // Example: Generate a random string of length 10
  const randomString = generateRandomString(10);
  console.log(randomString)
    setInterval(() => {
       console.log(randomString, new Date(Date.now()).toISOString()) 
    }, 5000);
  