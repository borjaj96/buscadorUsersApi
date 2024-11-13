window.addEventListener("load", () => {

    let input = document.querySelector(".search__input");
    let btn = document.querySelector(".search__btn");
    let container = document.querySelector(".main__users");

    const users_url = "https://reqres.in/api/users";
 
    let getUsers = () => {
        fetch(users_url)
            //OBTENGO LOS DATOS DE LA API EN JSON
            .then(response => response.json())
            //CAPTURO LA RESPUESTA
            .then(response => {
                
                let users = response.data;
                
                //RECORRO LOS USUARIOS DE LA API Y LOS VOY PINTANDO EN SU SITIO
                users.forEach(user => {
                    container.innerHTML += `
                        <article class="users__user">
                            <div class="user__container-img">
                                <img class="user__img" src="${user.avatar}" alt="avatar">
                            </div>

                            <div class="user__content">
                                <p class="user__name">${user.first_name} ${user.last_name}</p>
                                <p class="user__email">${user.email}</p>
                            </div>
                        </article>
                    `;
                });


            })
            .catch(error => console.log(error));
    }



    


    let searchUsers = (search) => {
        let users = document.querySelectorAll(".users__user");

        users.forEach(user => {

            let userInfo = user.innerText.toLowerCase();

            if(userInfo.includes(search.toLowerCase()) || search.trim() == ""){
                user.classList.remove("hidden");
            }else{
                user.classList.add("hidden");
            }
        });

    }

    //LISTAR USUARIOS
    getUsers();

    //BUSCAR USUARIOS
    input.addEventListener("input",() => {
        searchUsers(input.value);
    });

    btn.addEventListener("click",(e) => {
        e.preventDefault();
        searchUsers(input.value);
    });
});