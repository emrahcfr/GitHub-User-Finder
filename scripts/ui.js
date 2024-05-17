
import { elements } from "./helper.js";

export class UI{
    constructor(){
        this.profile=elements.profile;
        this.clearBtn=elements.clearBtn;
        this.input=elements.searchInput;
        this.btnDark= elements.btnDarkLight;
        this.body=elements.body;
        this.title=elements.title;
        this.repoArea=elements.repos
        // olay izleyicileri
       this.btnDark.addEventListener("click", this.darkMode.bind(this))
        this.clearBtn.addEventListener("click",this.clearProfile.bind(this));
        
    }

    // Profil arayüzünü ekrana yazdırır/basar
    renderProfile(res){
        const created_at =new Date(res.created_at).toLocaleDateString()
        this.profile.innerHTML=`
        <div class="row border p-4 my-4 rounded-3">
        <div class="col-md-3">
            <img src="${res.avatar_url} " 
            class="img-fluid rounded shadow" 
            alt="">
            <a href="${res.html_url}" target="_blank" class="btn btn-primary w-100 mt-4">Go to Profile</a>
        </div>

        <div class="col-md-9 gap-3" id="profileButton">
            <span class="badge fs-6 mt-2 bg-primary">Public Repos: ${res.public_repos}</span>
            <span class="badge fs-6 mt-2 bg-secondary">Public Gists: ${res.public_gists}</span>
            <span class="badge fs-6 mt-2 bg-success">Followers:${res.followers} </span>
            <span class="badge fs-6 mt-2 bg-info">Followings: ${res.following}</span>

            <ul class="list-group mt-3">
                <li class="list-group-item">About: ${res.bio}</li>
                <li class="list-group-item">Company: ${res.company}</li>
                <li class="list-group-item">Website:${res.blog} </li>
                <li class="list-group-item">Location: ${res.location} </li>
                <li class="list-group-item">Create Account: ${created_at} </li>
            </ul>
        </div>
    </div>`;
    }
    //Uyarı mesajı oluşturma
    showAlert(message, className){
       const div= document.createElement("div");
       div.className=className;
       div.textContent= message;
       elements.warning.appendChild(div);
       //Uyarıyı ekrandan silme fonksiyonu. showAlert fonksiyonu çalıştıktan sonra 3 saniye sonra çalışır
      setTimeout(()=>{this.clearAlert()},3000)

    };
    // Uyarıyı ekrandan silme
    clearAlert(){
       const currentAlert= document.querySelector(".alert");
       if(currentAlert){
        currentAlert.remove()
       }
    };
    clearProfile(e){
        e.preventDefault();
        if(confirm("Want to Delete?")){
            this.profile.innerHTML="";
            this.input.value="";
            this.showAlert("All Datas Cleared", "alert alert-info");
            this.repoArea.innerHTML="";

        }

    };

    darkMode(){
        if(this.body.classList.contains("bg-dark")){
           this.body.className="bg-light text-bg-light";
           this.btnDark.className="btn btn-dark";
           this.btnDark.textContent="Dark Mode";
           this.title.className="text-dark";
        }else if(this.body.classList.contains("bg-light")){
            this.body.className="bg-dark text-bg-dark";
           this.btnDark.className="btn btn-light";
           this.btnDark.textContent="Light Mode";
           this.title.className="text-light";
        };
       
    };
    renderProjects(data){
// Projeler dizisindeki her bir eleman için kart oluştur ve ekrana bas
        data.forEach((repo) => {
            this.repoArea.innerHTML+=`<div class="border row p-3 mb-3">
            <div class="col-6">
              <a href="${repo.html_url}" target="_blank">${repo.name} </a>
            </div>
            <div class="col-6">
              <span class="badge bg-secondary"> Stars: ${repo.stargazers_count} </span>
              <span class="badge bg-primary"> Fork: ${repo.forks_count} </span>
              <span class="badge bg-success"> Watchers: ${repo.watchers} </span>
            </div>
          </div>`
        });

    }
};