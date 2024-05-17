import { Github } from "./scripts/api.js";
import { elements } from "./scripts/helper.js";
import { UI } from "./scripts/ui.js";
//Github Class'ının örneğini aldık (Miras Alma)
const github=new Github();
// UI class'ın örneğini aldık
const uı= new UI();
github.fetchUserData();
const getInput = (e) => {
    e.preventDefault();
    const value = elements.searchInput.value; // trim to remove any leading/trailing spaces

    if (value == "") {
        uı.showAlert("Fill Out the Form Field!", "alert alert-warning");
        return;
    }

    if (value) {
        github.fetchUserData(value).then((res) => {
            // eğer kullanıcı bulunamadıysa
            if (res.message === "Not Found") {
              uı.showAlert(
                "User Not Found", "alert alert-danger"
              );
            } else {
              // kullanıcı bulunduysa
              uı.showAlert("User Found", "alert alert-success");
              uı.renderProfile(res.data);
              
              uı.renderProjects(res.repos);
            }
          })
          .catch((err) => console.log(err));
        return;
      }
    };
//! Olay izleyicileri
elements.searchBtn.addEventListener("click", getInput);