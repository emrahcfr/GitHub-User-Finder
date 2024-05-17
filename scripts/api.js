export class Github{
    constructor(){
        this.client_id= "Ov23liV7MuXJPZotAjfr";
        this.client_secret="90a1cf6b6aa64bdd6d8a47c89815d0f9e3b7655d";
        this.per_page=10;
        this.sort="asc";
    
    }
    //* API'den kullanıcı bilgilerini alma
    async fetchUserData(username){
        //! parametre olarak gelen kullanıcı adına göre istek attık
       const profileRes= await fetch(`https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`

      );
      //kullanıcı repolarını almak için istek attık

      const repoRes = await fetch (`https://api.github.com/users/${username}/repos?client_id=${this.client_id}&client_secret=${this.client_secret}&per_page=${this.per_page}&sort=${this.sort}`

      );
      
      //api'den aldığımızı json yapısına çevirdik
       const data =await profileRes.json();
       const repos = await repoRes.json()
      
      // fonsiyonun çağrıldığı yere bilgileri gönderdim
       return {data, repos};
       

    }
}